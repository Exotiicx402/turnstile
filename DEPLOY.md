# Deploy Turnstile to Vercel

## Quick Deploy (2 minutes)

### Step 1: Push to GitHub (if not already done)

```bash
# If you haven't pushed to GitHub yet:
# 1. Create new repo at github.com/new (name: turnstile)
# 2. Then:

git remote add origin https://github.com/YOUR_USERNAME/turnstile.git
git branch -M main  
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to **vercel.com** and sign up (use GitHub)
2. Click **"Add New"** → **"Project"**
3. Import your **turnstile** repo from GitHub
4. Vercel auto-detects Vite/React - no config needed!
5. Click **"Deploy"**

Done! Your site will be live in ~60 seconds.

### Step 3: Add Environment Variable

After deployment:

1. Go to your project in Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Add:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-api-url.railway.app/api`
   - Click **"Save"**

4. Go to **"Deployments"** → Click the latest → **"Redeploy"**

### Step 4: Update Backend CORS

In Railway (your backend), update environment variable:
```
FRONTEND_URL=https://your-app.vercel.app
```

Then redeploy backend.

---

## Your Live URLs

After deployment, you'll have:

### Frontend (Vercel)
```
https://turnstile-YOUR_USERNAME.vercel.app
```

Pages:
- `/` - Landing page
- `/docs` - Documentation  
- `/v1` - Explorer
- `/v1/browse` - Browse services
- `/v1/service/:id` - Service details

### Backend (Railway)
```
https://turnstile-api-production.up.railway.app
```

---

## Testing Production

```bash
# Test backend
curl https://your-api-url.railway.app/health
curl https://your-api-url.railway.app/api/services

# Open frontend
open https://your-app.vercel.app/v1
```

---

## Auto-Deploy Setup

Both Vercel and Railway auto-deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel and Railway will automatically rebuild and deploy!
```

---

## Custom Domain (Optional)

### For Frontend (Vercel):
1. Go to project **Settings** → **Domains**
2. Add your domain (e.g., `turnstile.xyz`)
3. Update DNS records as instructed
4. Done!

### For Backend (Railway):
1. Go to project **Settings** → **Networking**
2. Add custom domain
3. Update DNS
4. Update `VITE_API_BASE_URL` in Vercel

---

## Troubleshooting

### "API calls failing"
1. Check `VITE_API_BASE_URL` in Vercel env vars
2. Check `FRONTEND_URL` in Railway env vars  
3. Make sure both end with no trailing slash
4. Redeploy both after changing env vars

### "No services showing"
1. Make sure backend is deployed and running
2. Check Railway logs for errors
3. Run seed command in Railway to add test data
4. Test backend directly: `curl https://api-url/api/services`

### "Build failing on Vercel"
1. Check build logs in Vercel
2. Run `npm run build` locally to test
3. Make sure all dependencies are in `package.json`
4. Check TypeScript errors

---

## Costs

### Vercel
- ✅ **Free** forever for personal projects
- Unlimited bandwidth
- Automatic HTTPS
- Global CDN

### Railway  
- ✅ **$5/month** free credit
- Enough for development/testing
- Scales as you grow
- Pay only for what you use

### Total: **FREE** for development! 🎉

---

## Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Deploy frontend to Vercel
3. ✅ Connect them with env vars
4. ✅ Test everything works
5. 🚀 Share your live site!

Your Turnstile marketplace will be live at:
**https://your-app.vercel.app**
