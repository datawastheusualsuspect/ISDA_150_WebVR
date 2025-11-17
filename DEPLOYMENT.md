# GitHub Pages Deployment Guide

This guide will help you deploy the Benevolence VR Experience to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your machine
- Repository created on GitHub

## Step 1: Initialize Git (if not already done)

```bash
cd WebVR-AFrame
git init
git add .
git commit -m "Initial commit: Benevolence VR Experience"
```

## Step 2: Add Remote Repository

Replace `yourusername` with your GitHub username and `repository-name` with your repo name:

```bash
git remote add origin https://github.com/yourusername/repository-name.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under "Source", select:
   - Branch: **main** (or **master** if that's your default)
   - Folder: **/ (root)**
5. Click **Save**

GitHub will automatically deploy your site. This may take a few minutes.

## Step 4: Access Your Live Site

Your site will be available at:
```
https://yourusername.github.io/repository-name/
```

## Automatic Deployment with GitHub Actions

The `.github/workflows/deploy.yml` file is already configured for automatic deployment. Every time you push to the main branch, GitHub Actions will:

1. Check out your code
2. Install dependencies
3. Deploy to GitHub Pages

No additional setup needed! Just push your changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Troubleshooting

### Site not showing up
- Wait 5-10 minutes for GitHub Pages to build and deploy
- Check the "Actions" tab in your repository to see deployment status
- Verify Pages is enabled in Settings

### Images not loading
- Ensure all image paths are relative (e.g., `Images/Scene_1.png`)
- Check that the `Images/` directory is committed to git

### CORS errors
- This shouldn't happen with static files on GitHub Pages
- If you see CORS errors, check browser console for more details

### Custom domain
- To use a custom domain, add it to the `cname` field in `.github/workflows/deploy.yml`
- Then configure DNS settings with your domain provider

## Local Testing Before Deployment

Test your site locally before pushing:

```bash
npm install
npm run serve
npm run open
```

Visit `http://localhost:8080` to verify everything works.

## Updating Your Site

To make changes and update your live site:

1. Make your changes locally
2. Test with `npm run serve`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. GitHub Pages will automatically redeploy (usually within 1-2 minutes)

## Performance Tips

- Images are already optimized
- A-Frame is loaded from CDN for faster load times
- Static files serve quickly on GitHub Pages
- Consider using GitHub's built-in analytics to track visits

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [A-Frame Documentation](https://aframe.io/docs/)
- [WebXR Documentation](https://www.w3.org/TR/webxr/)
