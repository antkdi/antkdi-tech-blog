# Vercel Deployment Guide

Step-by-step guide to deploy Kevin's Tech Blog on Vercel with the custom domain `tech.antkdi.com`.

---

## Step 1: Sign Up / Sign In to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

## Step 2: Import the Repository

1. From the Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find `antkdi/antkdi-blog` in the repository list
3. Click **"Import"**

## Step 3: Configure Project Settings

Vercel will auto-detect the Next.js framework. Verify these settings:

| Setting | Value |
|---------|-------|
| Framework Preset | **Next.js** |
| Root Directory | `./ ` (default) |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto-detected) |
| Install Command | `npm install` |
| Node.js Version | **22.x** |

No environment variables are required for the initial deployment.

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (typically 1-2 minutes)
3. Vercel will provide a preview URL like `antkdi-blog-xxxxx.vercel.app`
4. Verify the site loads correctly at the preview URL

## Step 5: Configure Custom Domain

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings** → **Domains**
3. Enter `tech.antkdi.com` and click **"Add"**
4. Vercel will display the DNS records you need to configure

## Step 6: Configure DNS

Follow the instructions in [DNS_SETUP.md](./DNS_SETUP.md) to point `tech.antkdi.com` to Vercel.

After adding DNS records:

1. Return to Vercel **Settings** → **Domains**
2. Wait for the **"Valid Configuration"** checkmark to appear
3. Vercel automatically provisions an SSL certificate

## Step 7: Verify Deployment

Once DNS propagates and SSL is provisioned:

1. Visit [https://tech.antkdi.com](https://tech.antkdi.com)
2. Verify the site loads with HTTPS
3. Test navigation: home page, blog listing, individual posts
4. Test dark/light mode toggle
5. Test search and tag filtering
6. Check mobile responsiveness

## Automatic Deployments

After the initial setup, Vercel automatically deploys:

- **Production:** Every push to the `main` branch
- **Preview:** Every pull request gets a unique preview URL

## Troubleshooting

### Build Fails

```bash
# Test the build locally first
npm run build
```

Check the Vercel build logs under **Deployments** → select deployment → **"Building"** logs.

### Domain Not Resolving

- DNS propagation can take up to 24-48 hours
- Verify DNS records with: `dig tech.antkdi.com CNAME`
- Check Vercel domain status in **Settings** → **Domains**

### 404 on Page Refresh

This is handled automatically by Vercel's Next.js integration. If you see 404s, ensure the `next.config.ts` does not have `output: "export"` set (Vercel uses server-side rendering).

---

## Post-Deployment Checklist

- [ ] Site loads at `tech.antkdi.com`
- [ ] SSL certificate is active (HTTPS)
- [ ] All pages render correctly
- [ ] Dark/light mode works
- [ ] Search functionality works
- [ ] Blog posts display correctly
- [ ] Mobile layout is responsive
- [ ] Auto-deploy on push to `main` works
