# Deployment Guide - Vercel Free Tier

This guide explains how to deploy the Victorian Maths Tutor application to Vercel's free tier.

---

## Why Vercel Free Tier?

Since your repository is **public**, you can use Vercel's generous free tier at zero cost!

### Free Tier Includes:
- ✅ 100GB bandwidth/month
- ✅ Unlimited projects & deployments
- ✅ Automatic HTTPS & Global CDN
- ✅ Serverless functions with 10-second timeout
- ✅ Built specifically for Next.js (best performance)
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests
- ✅ Zero configuration needed

**Cost**: $0/month (stays free as long as repo is public)

---

## Deployment Steps

### 1. Sign Up / Log In to Vercel

Go to https://vercel.com and sign up with your GitHub account.

### 2. Import Your Repository

1. Click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Select `red-mangy/victorian-maths-tutor`
4. Click **"Import"**

### 3. Configure Project Settings

Vercel will auto-detect that it's a Next.js project. Just verify:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: (leave default)
- **Install Command**: `npm install`

### 4. Add Environment Variables

Click on **"Environment Variables"** and add the following:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

**Where to find these values:**
- **Supabase keys**: Go to your Supabase project → Settings → API
- **Anthropic API key**: Go to https://console.anthropic.com/settings/keys

### 5. Deploy!

Click **"Deploy"** and Vercel will:
1. Install dependencies
2. Build your Next.js app
3. Deploy to production
4. Provide you with a live URL (e.g., `victorian-maths-tutor.vercel.app`)

Deployment typically takes 2-3 minutes.

---

## Post-Deployment Setup

### 1. Set Up Supabase Database

Follow the instructions in `supabase/README.md` to:
1. Update the database constraint (for Year 10A support)
2. Load curriculum data (94 topics)

### 2. Test Your Deployment

1. Visit your Vercel URL
2. Sign up as a test student
3. Select a topic and start a learning session
4. Verify LLM questions are generated correctly
5. Test the chat tutor feature

### 3. Configure Custom Domain (Optional)

1. Go to your Vercel project → Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

---

## Automatic Deployments

Once connected, Vercel automatically:
- ✅ Deploys every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Runs build checks before deploying
- ✅ Provides deployment logs for debugging

**No CI/CD configuration needed!**

---

## Monitoring & Optimization

### View Analytics
- Go to your Vercel project → Analytics
- Monitor page views, visitor count, and performance

### View Logs
- Go to your Vercel project → Deployments → [Latest] → Logs
- Debug serverless function errors
- Monitor API route performance

### Optimize for Free Tier

To stay within the 100GB bandwidth limit:
1. **Optimize images**: Use Next.js Image component
2. **Cache static assets**: Vercel does this automatically
3. **Rate limit LLM calls**: Prevent abuse (already implemented)
4. **Monitor usage**: Check Vercel dashboard regularly

---

## Cost Projections

### Free Tier Limits:
- **Bandwidth**: 100GB/month
- **Serverless Function Execution**: 100GB-hours
- **Build Time**: 6000 minutes/month

### Expected Usage (Student Learning Platform):
- **Average page size**: ~500KB
- **Estimated users**: 200-500 students/month can stay comfortably within free tier
- **LLM API calls**: Handled by Anthropic (separate billing)

### If You Exceed Free Tier:
- Vercel will notify you before charging
- Upgrade to Pro plan: $20/month for 1TB bandwidth
- For a free student platform, 100GB/month is typically sufficient

---

## Troubleshooting

### Build Fails
- Check Vercel deployment logs
- Ensure all environment variables are set
- Verify `package.json` dependencies are correct

### Serverless Function Timeout
- Free tier: 10-second timeout (usually sufficient for LLM calls)
- If Claude API is slow, consider:
  - Using `claude-haiku` for faster responses
  - Implementing client-side loading states

### Supabase Connection Issues
- Verify environment variables are correct
- Check Supabase connection string format
- Ensure Row Level Security policies are configured

---

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Supabase + Vercel Guide**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

---

## Next Steps

1. ✅ Deploy to Vercel (follow steps above)
2. ✅ Set up Supabase database
3. ✅ Test the application thoroughly
4. ✅ Share with students and gather feedback
5. ✅ Monitor usage and performance

Your Victorian Maths Tutor is ready to help students learn! 🎉
