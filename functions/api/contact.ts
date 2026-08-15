import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.enum(['Agency', 'Brand', 'Producer', 'Other']),
  budget: z.enum(['<$10K', '$10K-$30K', '$30K-$50K', '>$50K', 'Not sure']),
  message: z.string().min(20),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 3;

  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
}

export const onRequestPost: PagesFunction = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Too many requests. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const body = await context.request.json();
    const validation = formSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid form data',
          errors: validation.error.errors,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const data = validation.data;

    if (data.website) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Form submitted successfully',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const turnstileSecret = context.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && data.turnstileToken) {
      const isValid = await verifyTurnstile(data.turnstileToken, turnstileSecret);
      if (!isValid) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'CAPTCHA verification failed',
          }),
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }
    }

    const webhookUrl = context.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookPayload = {
        content: `**New Contact Form Submission**\n\n**Name:** ${data.name}\n**Email:** ${data.email}\n**Company:** ${data.company}\n**Role:** ${data.role}\n**Budget:** ${data.budget}\n**Message:** ${data.message}`,
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing your request',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};
