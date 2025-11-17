# 🚀 Quick Start - Deploy to GitHub Pages in 5 Minutes

## Step 1: Create Repository (1 min)
```
1. Go to github.com/new
2. Name: WebVR-AFrame
3. Public
4. Create repository
```

## Step 2: Push Code (2 min)
```bash
cd /Users/chrisyu/Projects/ISDA150/WebVR-AFrame
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/WebVR-AFrame.git
git branch -M main
git push -u origin main
```

## Step 3: Enable Pages (1 min)
```
1. GitHub → Settings → Pages
2. Source: main branch, / (root)
3. Save
```

## Step 4: Wait & Visit (1 min)
```
Wait 1-2 minutes, then visit:
https://YOUR_USERNAME.github.io/WebVR-AFrame/
```

## ✅ Done!

Your VR experience is now live! 🎉

---

## 📝 Before Pushing

Update in `package.json`:
- Line 5: Replace `yourusername` with your GitHub username
- Line 20: Replace `Your Name` with your name

Update in `README.md`:
- Line 7: Replace `yourusername` with your GitHub username

---

## 🔄 Making Updates

```bash
# Make changes locally
git add .
git commit -m "Your message"
git push origin main
# Site updates automatically!
```

---

## 📚 Need Help?

- **Quick setup?** → Read `GITHUB_SETUP.md`
- **Detailed guide?** → Read `DEPLOYMENT.md`
- **Full summary?** → Read `GITHUB_DEPLOYMENT_SUMMARY.md`

---

**That's it! Your demo is live! 🌟**
