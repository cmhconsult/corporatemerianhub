# Corporate Meridian Hub - FOURTH Version (Sleek)

This ZIP is the FOURTH site update you confirmed - the sleek one with Manrope + Fraunces, navy #0A2342, gold #E3B341, mobile bottom nav, and all contacts clickable.

## What is inside

- `index.html` + `styles.css` + `app.js` + `assets/` = STATIC version for GitHub Pages. Upload these directly. No build step. This is what you push to GitHub.
- `react-source/` = EXACT React source of the fourth version (App.tsx + index.css + assets). Use this if you want to run the React version in VS Code with Vite. It has the same content, plus a fallback so forms still work on GitHub (they save locally and open your email app).

## Contacts - all clickable, no errors

- Company email: corporatemeridianhub@gmail.com -> mailto:corporatemeridianhub@gmail.com
- Founder email (Experts page): ayegbokasulaiman@gmail.com -> mailto:ayegbokasulaiman@gmail.com
- Phone: 0813 539 4061 -> tel:+2348135394061
- WhatsApp: https://wa.me/2348135394061
- Location: Lagos, Nigeria
- Top header has NO email on mobile, email is in header on desktop (xl) as in the fourth version, and in footer + contact page. No email in the top marquee.

## Fonts and colours - fourth version exact

- Headings: Fraunces (Georgia fallback)
- Body: Manrope (NOT Plus Jakarta Sans)
- Navy: #0A2342, Deep: #071A33, Soft: #122F57, Gold: #E3B341, Paper: #F6F7F9

## Push to GitHub (easiest, no VS Code terminal)

1. Unzip this file. You will see index.html, styles.css, app.js, assets/, react-source/.
2. Go to github.com, create a new repo named `corporate-meridian-hub`, Public, do NOT add README.
3. Click "uploading an existing file" / Add file > Upload files.
4. Drag ONLY the static files: index.html, styles.css, app.js, and the whole assets/ folder. Do NOT upload the ZIP itself, and do NOT upload react-source/ to GitHub Pages (it is for VS Code only).
5. Commit changes.
6. Settings > Pages > Deploy from a branch > Branch: main, Folder: / (root) > Save. Wait 1-2 mins.
7. Your live link: https://YOUR-USERNAME.github.io/corporate-meridian-hub/

## Forms on GitHub Pages

GitHub Pages cannot run a database. So in the static version, forms:
- Save a copy in the browser (localStorage)
- Open your email app to corporatemeridianhub@gmail.com with all details filled in, so no message is lost
- Booking wizard is 3 steps: Your details > Institution & Service > Date & Message
- Waitlist and Contact work the same way.

In the original artifact, forms saved to a database. On GitHub they use email - that is the only change needed for GitHub.

## Run the React version in VS Code (optional)

```
cd react-source
npm install
npm run dev
```

To build for production:
```
npm run build
```
Then upload the `dist/` folder contents to GitHub Pages or Vercel.

## Pages in this ZIP

Home, About, Services (6 service pages), Industries (Education + Finance/Sales/Marketing coming soon with waitlist), Experts, Insights (3 full articles), Contact, Book a Consultation (3-step wizard), Diagnostic quiz, How it works, Org chart demo, FAQ.

## Check before you share

- Header: CORPORATE MERIDIAN, HUB • CONSULTING
- Hero: Smarter Structure. Stronger Institutions.
- Marquee: Structure that moves institutions forward • Smarter Structure • Stronger Institutions • Clarity • Accountability • Efficiency
- Bottom nav on mobile: Home, Services, Industries, Insights, Book
- All email links open email app, phone opens dialer, WhatsApp opens chat.
