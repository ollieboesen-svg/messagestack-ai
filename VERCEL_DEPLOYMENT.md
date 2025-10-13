# Deploy MessageStack to Vercel

## Quick Deployment Steps

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Navigate to project directory:**
```bash
cd messagestack-ai
```

3. **Deploy to Vercel:**
```bash
vercel
```

4. **Follow the prompts:**
   - Login to your Vercel account
   - Link to existing project or create new one
   - Accept default settings

5. **Deploy to production:**
```bash
vercel --prod
```

6. **Add custom domain (messagestack.ai):**
   - Go to your project settings on vercel.com
   - Click "Domains"
   - Add "messagestack.ai"
   - Follow DNS configuration instructions

### Option 2: Deploy via Vercel Dashboard

1. **Go to:** https://vercel.com/new

2. **Import Git Repository:**
   - Connect your GitHub/GitLab/Bitbucket account
   - Select the messagestack-ai repository

3. **Configure Project:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

5. **Add Custom Domain:**
   - Go to Project Settings > Domains
   - Add "messagestack.ai"
   - Configure DNS records as instructed

## DNS Configuration for messagestack.ai

Add these records to your domain registrar:

**For apex domain (messagestack.ai):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Environment Variables (if needed)

No environment variables are currently required for this deployment.

## Troubleshooting

If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure Node.js version is 18 or higher
3. Verify all dependencies are in package.json

## Success!

Once deployed, your site will be live at:
- Your Vercel URL: `your-project.vercel.app`
- Custom domain: `messagestack.ai` (after DNS propagation)
