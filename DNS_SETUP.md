# DNS Setup Guide

Instructions for configuring the `tech.antkdi.com` subdomain to point to Vercel.

---

## Prerequisites

- Access to the DNS management panel for `antkdi.com`
- Vercel project already created (see [VERCEL_SETUP.md](./VERCEL_SETUP.md))

## Step 1: Log In to Your Domain Registrar

Go to the DNS management panel for `antkdi.com` at your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare, Google Domains, etc.).

## Step 2: Add CNAME Record

Add the following DNS record:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **CNAME** | `tech` | `cname.vercel-dns.com` | Automatic / 300 |

- **Type:** CNAME
- **Name / Host:** `tech` (this creates the `tech.antkdi.com` subdomain)
- **Value / Points to:** `cname.vercel-dns.com`
- **TTL:** Use automatic or set to 300 seconds (5 minutes)

## Step 3: (Optional) A Records for Root Domain

If you also want `antkdi.com` (root domain) to point to Vercel, add these A records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 300 |

> **Note:** The CNAME record for `tech` is sufficient for `tech.antkdi.com`. A records are only needed if you want the root domain on Vercel too.

## Step 4: Verify DNS Configuration

After adding the records, verify propagation:

```bash
# Check CNAME record
dig tech.antkdi.com CNAME

# Check if it resolves
nslookup tech.antkdi.com

# Alternative: use an online tool
# https://dnschecker.org/#CNAME/tech.antkdi.com
```

## Step 5: Verify in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Look for `tech.antkdi.com` — it should show a green checkmark once DNS propagates
4. Vercel will automatically provision a free SSL certificate

## DNS Propagation Time

- **Typical:** 5 minutes to 2 hours
- **Maximum:** 24-48 hours (rare)
- Propagation depends on your registrar and ISP DNS caching

## Registrar-Specific Instructions

### Namecheap

1. Go to **Domain List** → click **Manage** on `antkdi.com`
2. Click **Advanced DNS** tab
3. Click **Add New Record**
4. Select **CNAME Record**, Host: `tech`, Value: `cname.vercel-dns.com`

### Cloudflare

1. Go to the `antkdi.com` zone
2. Click **DNS** → **Records** → **Add Record**
3. Type: CNAME, Name: `tech`, Target: `cname.vercel-dns.com`
4. Toggle proxy to **DNS only** (gray cloud) for Vercel compatibility

### GoDaddy

1. Go to **My Products** → click **DNS** for `antkdi.com`
2. Click **Add** under DNS Records
3. Type: CNAME, Name: `tech`, Value: `cname.vercel-dns.com`, TTL: 600

### Google Domains

1. Go to **DNS** settings for `antkdi.com`
2. Under **Custom Records**, click **Manage custom records**
3. Add: Host: `tech`, Type: CNAME, Data: `cname.vercel-dns.com`

## Troubleshooting

### "DNS not configured" in Vercel

- Double-check the CNAME value is exactly `cname.vercel-dns.com` (no trailing dot in most registrars)
- Wait up to 48 hours for full propagation
- If using Cloudflare, ensure the proxy is set to **DNS only** (gray cloud)

### SSL Certificate Not Provisioning

- Vercel auto-provisions SSL once DNS is verified
- If it takes more than 1 hour after DNS verification, try removing and re-adding the domain in Vercel

### Conflicting Records

- Remove any existing A, AAAA, or CNAME records for the `tech` subdomain before adding the new CNAME
- Only one CNAME record can exist per subdomain
