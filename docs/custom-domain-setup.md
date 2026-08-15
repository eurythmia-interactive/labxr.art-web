# Custom Domain Setup Guide

This guide walks you through setting up a custom domain for your LabXR.art website deployed on Cloudflare Pages.

## Prerequisites

- A Cloudflare account with your domain added
- Domain registrar access (or domain already on Cloudflare)
- Cloudflare Pages project deployed

## Step 1: Add Custom Domain in Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** > **Pages**
3. Select your project (`labxr-art-web`)
4. Click on **Custom domains** tab
5. Click **Set up a custom domain**
6. Enter your domain: `labxr.art`
7. Click **Continue**

## Step 2: Configure DNS Records

Cloudflare will automatically add the necessary DNS records if your domain is already on Cloudflare. If not, you'll need to add these records manually at your domain registrar:

### Required DNS Records

| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| CNAME | `labxr.art` | `labxr-art-web.pages.dev` | Proxied (orange cloud) |
| CNAME | `www.labxr.art` | `labxr-art-web.pages.dev` | Proxied (orange cloud) |

### How to Add DNS Records

**If domain is on Cloudflare:**
1. Go to **Websites** > Select your domain
2. Navigate to **DNS** > **Records**
3. Click **Add record**
4. Add the CNAME records as shown above
5. Ensure proxy status is **Proxied** (orange cloud enabled)

**If domain is at another registrar:**
1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS management for your domain
3. Add the CNAME records as shown above
4. Wait for DNS propagation (can take up to 48 hours)

## Step 3: Configure SSL/TLS

Cloudflare automatically provisions SSL certificates for custom domains. To ensure proper configuration:

1. Go to **SSL/TLS** > **Edge Certificates**
2. Ensure **Always Use HTTPS** is enabled
3. Set **Minimum TLS Version** to **TLS 1.2** (recommended)
4. Enable **Automatic HTTPS Rewrites**

### SSL/TLS Encryption Mode

Set the encryption mode based on your origin server:

- **Full (Strict)**: Recommended if your origin has a valid SSL certificate
- **Full**: If your origin has a self-signed certificate
- **Flexible**: Only if your origin doesn't support HTTPS (not recommended)

For Cloudflare Pages, use **Full (Strict)**.

## Step 4: Configure Redirect Rules

To ensure consistent URLs and proper SEO, set up redirect rules:

### www to non-www Redirect

1. Go to **Rules** > **Page Rules**
2. Click **Create Page Rule**
3. Enter: `www.labxr.art/*`
4. Add setting: **Forwarding URL**
5. Enter: `https://labxr.art/$1`
6. Set status code: **301 - Permanent Redirect**
7. Click **Save and Deploy**

### HTTP to HTTPS Redirect

This is usually automatic with Cloudflare's "Always Use HTTPS" setting, but you can verify:

1. Go to **SSL/TLS** > **Edge Certificates**
2. Ensure **Always Use HTTPS** is enabled

## Step 5: Configure Security Headers

Add security headers to improve your site's security posture:

1. Go to **Rules** > **Transform Rules** > **Modify Response Header**
2. Click **Create transform rule**
3. Add the following headers:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |

## Step 6: Configure Caching

Optimize caching for better performance:

1. Go to **Caching** > **Configuration**
2. Set **Browser Cache TTL** to **1 month** for static assets
3. Enable **Always Online** for resilience

### Cache Rules for Static Assets

Create a page rule for static assets:

1. Go to **Rules** > **Page Rules**
2. Click **Create Page Rule**
3. Enter: `labxr.art/_astro/*`
4. Add settings:
   - **Cache Level**: Cache Everything
   - **Edge Cache TTL**: 1 month
   - **Browser Cache TTL**: 1 month
5. Click **Save and Deploy**

## Step 7: Verify Setup

After configuring everything, verify your setup:

### DNS Propagation Check

Use tools like [DNS Checker](https://dnschecker.org) to verify DNS propagation:

```bash
# Check DNS records
dig labxr.art CNAME
dig www.labxr.art CNAME

# Check SSL certificate
curl -I https://labxr.art
```

### SSL Certificate Verification

1. Visit `https://labxr.art`
2. Click the padlock icon in your browser
3. Verify the certificate is valid and issued by Cloudflare

### Redirect Verification

Test that redirects work correctly:

```bash
# Test www to non-www redirect
curl -I http://www.labxr.art
# Should return 301 redirect to https://labxr.art

# Test HTTP to HTTPS redirect
curl -I http://labxr.art
# Should return 301 redirect to https://labxr.art
```

## Step 8: Update Environment Variables

Update your Cloudflare Pages environment variables to reflect the custom domain:

1. Go to **Workers & Pages** > **Pages** > Your project
2. Navigate to **Settings** > **Environment variables**
3. Update `PUBLIC_SITE_URL` to `https://labxr.art`
4. Redeploy your site

## Step 9: Configure R2 Custom Domain (Optional)

If you want to serve R2 assets from a custom subdomain (e.g., `cdn.labxr.art`):

1. Go to **R2** > Your bucket (`labxr-assets`)
2. Click **Settings** > **Custom domains**
3. Click **Add custom domain**
4. Enter: `cdn.labxr.art`
5. Follow the DNS configuration steps
6. Update `PUBLIC_CDN_URL` environment variable to `https://cdn.labxr.art`

## Troubleshooting

### Domain Not Resolving

- **Issue**: Domain not resolving after DNS changes
- **Solution**: Wait up to 48 hours for DNS propagation. Use `dig` or online tools to check status.

### SSL Certificate Not Provisioning

- **Issue**: SSL certificate not issued
- **Solution**: 
  1. Verify DNS records are correct and proxied
  2. Check that domain is active in Cloudflare
  3. Wait up to 24 hours for certificate provisioning
  4. Contact Cloudflare support if issue persists

### Redirect Loop

- **Issue**: Browser shows "Too many redirects" error
- **Solution**:
  1. Check SSL/TLS encryption mode matches your origin
  2. Ensure "Always Use HTTPS" is enabled
  3. Verify page rules don't conflict

### Mixed Content Warnings

- **Issue**: Browser shows mixed content warnings
- **Solution**:
  1. Enable "Automatic HTTPS Rewrites" in SSL/TLS settings
  2. Update all hardcoded `http://` URLs to `https://` in your code

## Security Best Practices

1. **Enable HSTS**: Use `Strict-Transport-Security` header with long max-age
2. **Use Secure Cookies**: If using cookies, set `Secure` and `HttpOnly` flags
3. **Enable WAF**: Consider enabling Cloudflare WAF for additional protection
4. **Monitor Security Events**: Check **Security** > **Events** regularly
5. **Keep DNS Records Proxied**: Always use orange cloud for security benefits

## Performance Optimization

1. **Enable Argo Smart Routing**: Reduces latency by 30%+ (paid feature)
2. **Use Cloudflare CDN**: All assets are automatically cached at edge locations
3. **Optimize Images**: Use WebP format and responsive images
4. **Minimize JavaScript**: Code-split and lazy-load non-critical JS
5. **Enable Brotli Compression**: Automatic with Cloudflare

## Monitoring

Set up monitoring to track your site's health:

1. **Cloudflare Analytics**: Go to **Analytics & Logs** > **Overview**
2. **Uptime Monitoring**: Use tools like UptimeRobot or Pingdom
3. **Performance Monitoring**: Use Lighthouse CI or WebPageTest
4. **Error Tracking**: Integrate Sentry or similar service

## Next Steps

After setting up your custom domain:

1. Update your marketing materials with the new domain
2. Set up email forwarding (e.g., `hello@labxr.art`)
3. Configure Google Search Console for SEO monitoring
4. Set up analytics (Plausible is already configured)
5. Test all forms and interactive features

## Support

If you encounter issues:

- **Cloudflare Documentation**: [Custom Domain Setup](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- **Cloudflare Community**: [Community Forum](https://community.cloudflare.com)
- **Cloudflare Support**: [Support Portal](https://support.cloudflare.com)

---

**Last Updated**: 2026-08-15  
**Status**: Ready for human execution
