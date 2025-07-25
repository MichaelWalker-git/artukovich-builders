# Google Domain Hosting Guide for Artukovich Builders Website

## Overview
You have a professional HTML website for Artukovich Builders and a domain purchased from Google. This guide covers the best hosting options and how to connect your domain.

## Phone Number Updated
✅ **Completed**: Updated all instances of phone number to (714) 504-4013 throughout the website.

## Hosting Options for Your Static HTML Site

### Option 1: GitHub Pages (Recommended - Free)
**Best for**: Simple, reliable, free hosting with good performance

**Steps:**
1. Create a GitHub account at github.com
2. Create a new repository named `artukovich-builders-website`
3. Upload all your website files (index.html, css/, js/, img/, etc.)
4. Go to repository Settings > Pages
5. Select "Deploy from a branch" and choose "main" branch
6. Your site will be available at `https://yourusername.github.io/artukovich-builders-website`

**Domain Connection:**
- In GitHub Pages settings, add your custom domain
- In Google Domains DNS settings, create a CNAME record pointing to `yourusername.github.io`

### Option 2: Netlify (Recommended - Free tier available)
**Best for**: Easy deployment, automatic SSL, form handling

**Steps:**
1. Sign up at netlify.com
2. Drag and drop your website folder to deploy
3. Or connect to a GitHub repository for automatic deployments
4. Get instant SSL certificate and CDN

**Domain Connection:**
- In Netlify dashboard, add your custom domain
- Follow Netlify's DNS instructions for Google Domains

### Option 3: Vercel (Free tier available)
**Best for**: Fast global CDN, automatic SSL

**Steps:**
1. Sign up at vercel.com
2. Import your project (can connect to GitHub)
3. Automatic deployment and SSL

**Domain Connection:**
- Add custom domain in Vercel dashboard
- Update DNS settings in Google Domains

### Option 4: Google Cloud Storage (Google's hosting)
**Best for**: Integration with Google services, pay-as-you-use

**Steps:**
1. Go to Google Cloud Console
2. Create a new bucket with your domain name
3. Upload website files
4. Configure bucket for website hosting
5. Set up load balancer for SSL

### Option 5: Traditional Web Hosting
**Best for**: Full control, additional features

**Popular providers:**
- **SiteGround**: Excellent for business sites, around $15/month
- **Bluehost**: WordPress friendly, around $10/month  
- **HostGator**: Budget-friendly, around $8/month
- **A2 Hosting**: Fast performance, around $12/month

## Current Domain Setup (Google Domains)

### If you have Google Domains:
1. Log into your Google Domains account
2. Go to DNS settings for your domain
3. You'll need to update DNS records based on your chosen hosting provider

### If domain transferred to Squarespace:
Google Domains was sold to Squarespace. If your domain transferred:
1. Log into Squarespace domain management
2. Access DNS settings
3. Follow the same DNS configuration steps

## Recommended DNS Configuration

### For most hosting providers, you'll need:
```
Type: A
Name: @
Value: [Your hosting provider's IP address]

Type: CNAME  
Name: www
Value: [Your hosting provider's address]
```

### For GitHub Pages specifically:
```
Type: A
Name: @
Values: 
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

## SSL Certificate
All recommended hosting providers offer free SSL certificates (https). This is crucial for:
- SEO rankings
- Customer trust
- Security

## Email Setup
Don't forget to set up professional email addresses:
- info@yourdomain.com
- bill@yourdomain.com

**Options:**
- Google Workspace ($6/month per user)
- Microsoft 365 ($6/month per user)  
- Zoho Mail (free tier available)

## Performance Optimization Already in Place
Your website already includes:
- ✅ Optimized images with lazy loading
- ✅ Minified CSS and JavaScript  
- ✅ SEO meta tags
- ✅ Schema markup for better search results
- ✅ Mobile-responsive design

## Next Steps Recommendation

**For immediate deployment (recommended):**
1. **Use Netlify** (easiest and most reliable)
   - Sign up at netlify.com
   - Drag and drop your website folder
   - Add your custom domain in settings
   - Update DNS in Google Domains/Squarespace

2. **Set up professional email**
   - Google Workspace with your domain
   - Update contact forms to use the new email

3. **Test thoroughly**
   - Check all pages load correctly
   - Test contact form functionality
   - Verify all images display properly
   - Test on mobile devices

## Support Resources
- **Netlify Docs**: docs.netlify.com
- **Google Domains Help**: support.google.com/domains
- **GitHub Pages Docs**: docs.github.com/pages

## Files Ready for Upload
Your current website structure:
```
/
├── index.html (✅ Phone number updated)
├── css/
│   └── style.css
├── js/
│   └── app.js
├── img/
│   ├── Various portfolio images
│   └── logos and icons
├── favicon.ico
├── robots.txt
└── site.webmanifest
```

All files are production-ready and can be uploaded to any hosting provider immediately.
