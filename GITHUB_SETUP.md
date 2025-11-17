# Quick GitHub Setup Guide

Get your Benevolence VR Experience live on GitHub Pages in 5 minutes!

## 🚀 Quick Setup

### 1. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it: `WebVR-AFrame` (or your preferred name)
3. Choose **Public** (so it's accessible to everyone)
4. Click **Create repository**

### 2. Initialize Git & Push Code

In your terminal, from the project directory:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Benevolence VR Experience"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/WebVR-AFrame.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **Save**

### 4. Access Your Live Site

Wait 1-2 minutes, then visit:
```
https://YOUR_USERNAME.github.io/WebVR-AFrame/
```

✅ **Done!** Your VR experience is now live!

## 📝 Customization

### Update package.json

Replace these placeholders in `package.json`:
- `yourusername` → your GitHub username
- `Your Name` → your name

### Update README.md

Replace `yourusername` in the README with your actual GitHub username.

## 🔄 Making Updates

After you make changes:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

GitHub Pages will automatically redeploy within 1-2 minutes.

## 📊 Share Your Project

- **Direct link**: `https://YOUR_USERNAME.github.io/WebVR-AFrame/`
- **GitHub link**: `https://github.com/YOUR_USERNAME/WebVR-AFrame`
- Add to your portfolio or resume!

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Site not loading | Wait 5-10 minutes, then refresh. Check GitHub Actions tab for errors. |
| Images not showing | Ensure paths are relative: `Images/Scene_1.png` |
| VR not working | Use Chrome/Edge with WebXR support and a compatible headset |
| 404 errors | Check that all files are committed to git |

## 📚 Next Steps

- Share your live demo with others
- Collect user feedback via the built-in questionnaire
- Monitor GitHub Analytics to see visitor stats
- Consider adding a custom domain (optional)

## 🎓 Learning Resources

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [A-Frame Documentation](https://aframe.io/docs/)
- [WebXR Specification](https://www.w3.org/TR/webxr/)

---

**Questions?** Check `DEPLOYMENT.md` for more detailed instructions.
