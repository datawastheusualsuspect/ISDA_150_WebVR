# GitHub Deployment Checklist

Use this checklist to ensure everything is ready before deploying.

## Pre-Deployment Setup

### Code Preparation
- [ ] All 7 scenes are working locally (`npm run serve`)
- [ ] Images are loading correctly
- [ ] Questionnaire appears on each scene
- [ ] No console errors in browser
- [ ] VR mode works (if testing with headset)

### File Updates
- [ ] Updated `package.json` line 5: GitHub username
- [ ] Updated `package.json` line 20: Your name
- [ ] Updated `README.md` line 7: GitHub username
- [ ] All files are saved

### Git Setup
- [ ] Git is initialized in project directory
- [ ] `.gitignore` file exists
- [ ] No sensitive files will be committed

## Deployment Steps

### Create Repository
- [ ] GitHub account created
- [ ] New repository created (name: WebVR-AFrame)
- [ ] Repository set to Public
- [ ] Repository URL copied

### Push Code
- [ ] Ran `git init`
- [ ] Ran `git add .`
- [ ] Ran `git commit -m "Initial commit"`
- [ ] Ran `git remote add origin [your-repo-url]`
- [ ] Ran `git branch -M main`
- [ ] Ran `git push -u origin main`
- [ ] Code appears on GitHub repository

### Enable GitHub Pages
- [ ] Went to Settings → Pages
- [ ] Selected branch: main
- [ ] Selected folder: / (root)
- [ ] Clicked Save
- [ ] Waited 1-2 minutes

## Post-Deployment Verification

### Site Access
- [ ] Site is accessible at `https://YOUR_USERNAME.github.io/WebVR-AFrame/`
- [ ] Page loads without 404 errors
- [ ] Images display correctly
- [ ] Text is readable

### Functionality Testing
- [ ] Can click on interactive elements
- [ ] Scene transitions work
- [ ] Questionnaire appears
- [ ] Can answer survey questions
- [ ] Color transitions work as expected
- [ ] Lighting changes appropriately

### Browser Compatibility
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

### VR Testing (Optional)
- [ ] VR mode activates in compatible browser
- [ ] Can interact with VR controllers
- [ ] Headset tracking works

## Documentation

### README & Guides
- [ ] README.md is complete and accurate
- [ ] QUICK_START.md is clear
- [ ] GITHUB_SETUP.md is helpful
- [ ] DEPLOYMENT.md covers troubleshooting
- [ ] LICENSE file is present

### Metadata
- [ ] package.json has correct info
- [ ] .gitignore is configured
- [ ] GitHub Actions workflow is in place

## Sharing & Promotion

### Share Your Demo
- [ ] Tested live URL works
- [ ] Shared link with team/friends
- [ ] Added to portfolio (if applicable)
- [ ] Shared on social media (optional)

### Collect Feedback
- [ ] Users can access the experience
- [ ] Questionnaire responses are being collected
- [ ] Responses appear in browser console

## Maintenance

### Regular Updates
- [ ] Know how to make changes locally
- [ ] Know how to push updates to GitHub
- [ ] Understand auto-deployment process
- [ ] Can monitor GitHub Actions

### Monitoring
- [ ] Checked GitHub Pages status
- [ ] Viewed deployment logs if needed
- [ ] Monitored for any errors

## Troubleshooting Completed

- [ ] Site loads correctly
- [ ] No 404 errors
- [ ] Images display
- [ ] Interactions work
- [ ] No console errors
- [ ] VR functionality confirmed (if applicable)

## Final Sign-Off

- [ ] All items checked
- [ ] Site is live and working
- [ ] Ready to share with others
- [ ] Documentation is complete

---

## Notes

Use this space to record any issues encountered or special configurations:

```
[Your notes here]
```

---

## Quick Reference

**Live Site URL:**
```
https://YOUR_USERNAME.github.io/WebVR-AFrame/
```

**Repository URL:**
```
https://github.com/YOUR_USERNAME/WebVR-AFrame
```

**Local Development:**
```bash
npm run serve
npm run open
```

**Update & Deploy:**
```bash
git add .
git commit -m "Your message"
git push origin main
```

---

**Deployment Date:** ________________

**Deployed By:** ________________

**Status:** ✅ Live & Working
