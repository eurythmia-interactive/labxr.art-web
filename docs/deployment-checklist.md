# Deployment Checklist

This checklist ensures all requirements are met before deploying LabXR Web to production.

## Pre-Deployment

### Repository

- [ ] All code committed to Git
- [ ] No secrets in code or configuration files
- [ ] `.gitignore` is properly configured
- [ ] `.env` is not committed (only `.env.example`)
- [ ] README.md is up to date
- [ ] All documentation is current

### Code Quality

- [ ] `npm run check` passes (TypeScript)
- [ ] `npm run lint` passes (ESLint)
- [ ] `npm run format:check` passes (Prettier)
- [ ] `npm run build` succeeds
- [ ] No console errors in development
- [ ] No console warnings in development

### Testing

- [ ] All pages tested locally
- [ ] Health check route works (`/dev/health`)
- [ ] Responsive design verified (mobile, tablet, desktop)
- [ ] Cross-browser testing completed
- [ ] Accessibility audit passed
- [ ] Performance audit passed (Lighthouse)

### Environment Variables

- [ ] `.env.example` is complete
- [ ] All required variables documented
- [ ] Variables configured in Cloudflare Pages dashboard
- [ ] No secrets in version control

## Cloudflare Pages Setup

### Project Configuration

- [ ] Cloudflare Pages project created
- [ ] GitHub repository connected
- [ ] Production branch set to `main`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Node.js version: 20+

### Custom Domain

- [ ] Primary domain configured: `labxr.art`
- [ ] WWW redirect configured: `www.labxr.art` → `labxr.art`
- [ ] DNS records created and propagated
- [ ] SSL/TLS certificate issued
- [ ] HTTPS enforced

### Environment Variables

- [ ] `PUBLIC_SITE_URL` set to `https://labxr.art`
- [ ] `PUBLIC_ENVIRONMENT` set to `production`
- [ ] `PUBLIC_CDN_URL` set to `https://cdn.labxr.art`
- [ ] `PUBLIC_R2_BUCKET_NAME` set to `labxr-assets`
- [ ] All other required variables configured

### Headers and Redirects

- [ ] `public/_headers` file present
- [ ] Security headers configured
- [ ] Cache headers configured for assets
- [ ] `public/_redirects` file present
- [ ] WWW redirect configured

## Cloudflare R2 Setup

### Bucket Configuration

- [ ] R2 bucket created: `labxr-assets`
- [ ] Bucket is private (not publicly accessible)
- [ ] CORS policy configured
- [ ] Allowed origins: `https://labxr.art`, `https://www.labxr.art`

### CDN Subdomain

- [ ] Custom domain configured: `cdn.labxr.art`
- [ ] DNS record created and propagated
- [ ] SSL/TLS certificate issued
- [ ] CDN caching enabled

### Asset Structure

- [ ] Folder structure created: `videos/`, `images/`, etc.
- [ ] Test assets uploaded
- [ ] Cache headers configured per asset type
- [ ] Assets accessible via CDN

## Cloudflare Workers Setup (Future)

### Worker Configuration

- [ ] Worker created: `labxr-forms`
- [ ] Worker route configured: `api.labxr.art/*`
- [ ] Environment variables set
- [ ] Secrets configured (Turnstile, Discord webhook)

### Contact Form

- [ ] Worker handles POST requests
- [ ] Turnstile validation implemented
- [ ] Discord webhook integration working
- [ ] Rate limiting configured
- [ ] Error handling implemented

## Post-Deployment

### Verification

- [ ] Production site loads: `https://labxr.art`
- [ ] All pages accessible
- [ ] Health check route works
- [ ] Assets load from CDN
- [ ] Forms submit successfully (when implemented)
- [ ] No console errors in production
- [ ] No 404 errors in logs

### Monitoring

- [ ] Cloudflare Analytics enabled
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring configured

### Documentation

- [ ] Deployment process documented
- [ ] Rollback procedure documented
- [ ] Incident response plan created
- [ ] Team trained on deployment process

## Rollback Procedure

If deployment fails:

1. **Identify the issue**
   - Check Cloudflare Pages deployment logs
   - Review error messages
   - Check Cloudflare Worker logs (if applicable)

2. **Rollback to previous version**
   - Go to Cloudflare Pages dashboard
   - Select previous successful deployment
   - Click "Rollback to this deployment"

3. **Verify rollback**
   - Test production site
   - Confirm issue is resolved
   - Check logs for errors

4. **Fix and redeploy**
   - Fix the issue in code
   - Test locally
   - Create new deployment

## Deployment Commands

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Cloudflare Pages

- Automatic deployment on push to `main`
- Preview deployments for pull requests
- Manual rollback via dashboard

### Cloudflare Workers (Future)

```bash
# Deploy worker
wrangler deploy

# Tail worker logs
wrangler tail
```

## Troubleshooting

### Build Fails

- Check build logs in Cloudflare Pages dashboard
- Verify all dependencies are in `package.json`
- Ensure Node.js version is compatible
- Check for TypeScript errors

### Site Not Loading

- Verify DNS propagation
- Check Cloudflare Pages deployment status
- Review deployment logs
- Confirm custom domain configuration

### Assets Not Loading

- Check R2 bucket permissions
- Verify CDN subdomain configuration
- Review CORS policy
- Check asset paths in code

### Forms Not Submitting (Future)

- Check Worker logs
- Verify Turnstile configuration
- Review Discord webhook URL
- Check rate limiting settings

## Success Criteria

Deployment is successful when:

- [ ] Production site loads without errors
- [ ] All pages are accessible
- [ ] Assets load from CDN
- [ ] Performance metrics meet targets
- [ ] No console errors
- [ ] Forms work correctly (when implemented)
- [ ] Team can access and manage deployment

## Notes

- Keep this checklist updated as the project evolves
- Document any deviations from the checklist
- Review and improve the deployment process regularly

---

**Last updated:** 2026-08-11
