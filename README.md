# Corporate Meridian Hub - Website

Plain HTML / CSS / JS. No build step. No backend. Works in VS Code and on GitHub Pages.

## Files
- index.html - all pages (Home, About, Services + 6 service pages, Industries + 4 industry pages, Experts, Insights + 3 articles, Contact, Book)
- styles.css - navy #0A2342 + gold #E3B341, mobile-first
- app.js - hash router, diagnostic quiz, booking form (opens email app)
- assets/ - logo.jpg + 7 photos

## Contacts (already linked)
- Company email: corporatemeridianhub@gmail.com - mailto:
- Personal / Founder email: ayegbokasulaiman@gmail.com - mailto: (Experts page)
- Phone / WhatsApp: 08135394061 - tel:+2348135394061 and https://wa.me/2348135394061
- Top header has NO email, on purpose.

## How to run in VS Code
1. Open this folder in VS Code.
2. Right-click index.html - Open with Live Server, OR just double-click index.html.
3. Clicking any service / industry / article opens its dedicated page.

## How to push to GitHub
git init
git add .
git commit -m "Corporate Meridian Hub website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main

## How to publish free with GitHub Pages
1. On GitHub, go to Repo - Settings - Pages
2. Source: Deploy from a branch - Branch: main - Folder: / (root) - Save
3. Your site will be at https://YOUR-USERNAME.github.io/YOUR-REPO/

## Booking form
Static hosting cannot send email by itself. This form opens the visitor's email app addressed to corporatemeridianhub@gmail.com with all details pre-filled, and shows a success message. For automatic emails later, connect Formspree / Netlify Forms.

## To edit
- Change text in index.html
- Change colours in styles.css (search #0A2342, #E3B341)
- Replace photos in assets/ with same filenames


## Premium design in this version
- Fonts: Fraunces (serif headings) + Plus Jakarta Sans (body) via Google Fonts - same as preview
- Glass cards, hero with floating Free Discovery Call card, gold marquee, dark services section, hover lift, animated diagnostic progress
- If fonts look plain offline, check internet - Google Fonts needs internet. In VS Code with Live Server it will load.
