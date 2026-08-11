# DNS Plan

## Domain Configuration

### Root Domain

- **Domain:** `labxr.art`
- **DNS Record Type:** CNAME
- **Target:** `labxr-web.pages.dev`
- **Proxy Status:** Proxied (orange cloud)
- **TTL:** Auto (Cloudflare managed)

### WWW Subdomain

- **Domain:** `www.labxr.art`
- **DNS Record Type:** CNAME
- **Target:** `labxr-web.pages.dev`
- **Proxy Status:** Proxied (orange cloud)
- **Strategy:** Redirect to root domain (non-www)
- **Redirect Method:** Configured via `public/_redirects`

### CDN Subdomain

- **Domain:** `cdn.labxr.art`
- **DNS Record Type:** CNAME
- **Target:** `<bucket-name>.r2.cloudflarestorage.com`
- **Proxy Status:** Proxied (orange cloud)
- **Purpose:** Serve media assets from R2 bucket

### Future API Subdomain

- **Domain:** `api.labxr.art`
- **DNS Record Type:** CNAME
- **Target:** `<worker-name>.workers.dev`
- **Proxy Status:** Proxied (orange cloud)
- **Purpose:** Future API endpoints (Workers)
- **Status:** Not configured in Phase 1

### Future Preview Subdomain Strategy

- **Pattern:** `preview-<branch>.labxr.art` (optional)
- **Strategy:** Use Cloudflare Pages default preview URLs instead
- **Default Pattern:** `<commit-hash>.labxr-web.pages.dev`
- **Recommendation:** Stick with Pages default preview URLs

## DNS Records Summary

| Type  | Name  | Target                              | Proxy   | Priority |
| ----- | ----- | ----------------------------------- | ------- | -------- |
| CNAME | `@`   | `labxr-web.pages.dev`               | Proxied | —        |
| CNAME | `www` | `labxr-web.pages.dev`               | Proxied | —        |
| CNAME | `cdn` | `<bucket>.r2.cloudflarestorage.com` | Proxied | —        |
| CNAME | `api` | `<worker>.workers.dev`              | Proxied | Future   |

## SSL/TLS Configuration

### Encryption Mode

- **Mode:** Full (strict)
- **Reason:** Cloudflare Pages and R2 support HTTPS
- **Benefit:** End-to-end encryption

### HTTPS Settings

- **Always Use HTTPS:** Enabled
- **Automatic HTTPS Rewrites:** Enabled
- **Minimum TLS Version:** 1.2 (recommended)
- **TLS 1.3:** Enabled (default)

### SSL/TLS Certificates

- **Type:** Universal SSL (Cloudflare managed)
- **Coverage:** Root domain and all subdomains
- **Renewal:** Automatic
- **Cost:** Free (included with Cloudflare)

## DNS Propagation

### Expected Propagation Time

- **Cloudflare DNS:** Immediate (within seconds)
- **Global propagation:** 5 minutes to 24 hours
- **Typical case:** 15-30 minutes for most regions

### Checking Propagation

```bash
# Check root domain
dig labxr.art +short

# Check WWW
dig www.labxr.art +short

# Check CDN
dig cdn.labxr.art +short

# Check from specific DNS server
dig labxr.art @8.8.8.8 +short
```

### Propagation Warning

**Important:** DNS changes can take up to 24 hours to fully propagate globally.

**Mitigation:**

- Test locally before deploying
- Use Cloudflare DNS (faster propagation)
- Monitor with online DNS checkers
- Inform stakeholders of potential delay

## DNS Security

### DNSSEC

- **Status:** Enable if supported by registrar
- **Benefit:** Prevents DNS spoofing attacks
- **Configuration:** Via domain registrar

### Cloudflare Security Features

- **DDoS Protection:** Automatic (included)
- **DNS Firewall:** Optional (paid feature)
- **Rate Limiting:** Configure per subdomain
- **Bot Management:** Optional (paid feature)

## Subdomain Strategy

### Current Subdomains

1. **Root (`labxr.art`)** — Main website
2. **WWW (`www.labxr.art`)** — Redirects to root
3. **CDN (`cdn.labxr.art`)** — Media assets

### Future Subdomains (Not in Phase 1)

1. **API (`api.labxr.art`)** — Worker endpoints
2. **Admin (`admin.labxr.art`)** — CMS or admin panel
3. **Staging (`staging.labxr.art`)** — Pre-production testing

### Subdomain Naming Conventions

- Use lowercase
- Use hyphens for multi-word subdomains
- Keep names descriptive and short
- Avoid numbers unless necessary

## DNS Management

### Via Cloudflare Dashboard

1. Go to Cloudflare Dashboard
2. Select domain: `labxr.art`
3. Navigate to DNS → Records
4. Add/edit/delete records
5. Changes propagate immediately

### Via Wrangler CLI (Limited)

```bash
# Not recommended for DNS management
# Use Cloudflare Dashboard or API
```

### Via Cloudflare API

```bash
# List DNS records
curl -X GET "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json"

# Create DNS record
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "CNAME",
    "name": "cdn",
    "content": "<bucket>.r2.cloudflarestorage.com",
    "proxied": true
  }'
```

## Troubleshooting

### DNS Not Resolving

1. Check DNS record in Cloudflare Dashboard
2. Verify proxy status (orange cloud)
3. Check TTL (should be Auto)
4. Wait for propagation (up to 24 hours)
5. Clear browser cache
6. Try different DNS server: `dig @8.8.8.8 labxr.art`

### SSL Certificate Errors

1. Verify SSL/TLS mode is Full (strict)
2. Check "Always Use HTTPS" is enabled
3. Wait for certificate issuance (up to 24 hours)
4. Clear browser cache
5. Check Cloudflare Dashboard → SSL/TLS → Edge Certificates

### WWW Redirect Not Working

1. Verify WWW DNS record exists
2. Check `public/_redirects` file
3. Rebuild and redeploy
4. Clear browser cache
5. Test with curl: `curl -I https://www.labxr.art`

### CDN Assets Not Loading

1. Verify CDN DNS record exists
2. Check R2 bucket public access is enabled
3. Verify custom domain is configured in R2
4. Check CORS policy in R2 settings
5. Test direct R2 URL: `https://<bucket>.r2.cloudflarestorage.com/`

## Human Confirmation Required

Before proceeding:

- [ ] Domain `labxr.art` is registered and accessible
- [ ] Domain is added to Cloudflare (or ready to add)
- [ ] DNS records can be modified
- [ ] SSL/TLS certificates can be issued
- [ ] Custom domain setup should happen now (or later)

## Manual Dashboard Steps

1. Add domain to Cloudflare (if not already added)
2. Update nameservers at domain registrar
3. Wait for domain activation
4. Create DNS records (root, www, cdn)
5. Configure SSL/TLS settings
6. Attach custom domain to Pages project
7. Attach custom domain to R2 bucket
8. Verify DNS propagation
9. Test HTTPS access

## Cost Considerations

### Cloudflare DNS

- **DNS hosting:** Free (included)
- **Universal SSL:** Free (included)
- **DDoS protection:** Free (included)
- **DNSSEC:** Free (if supported by registrar)

### Domain Registration

- **Cost:** Varies by registrar (~$10-50/year for .art TLD)
- **Renewal:** Annual
- **Privacy:** Optional (recommended)

## Related Documentation

- `docs/cloudflare-setup.md` — Full Cloudflare setup guide
- `infra/cloudflare/pages-plan.md` — Pages configuration
- `infra/cloudflare/r2-plan.md` — R2 bucket configuration
- `infra/cloudflare/cors-policy.md` — CORS configuration

---

**Last updated:** 2026-08-11
