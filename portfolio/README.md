# shamsheerfatma.tech — Full Stack Portfolio

AI Automation Portfolio — Next.js 14, MongoDB, Resend, Vercel

## Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes (built-in)
- **Database**: MongoDB Atlas (via Mongoose)
- **Auth**: NextAuth.js (credentials)
- **Email**: Resend
- **Hosting**: Vercel (free tier)

## Project Structure
```
app/
  page.tsx              ← Homepage (all sections)
  layout.tsx            ← Root layout + fonts
  globals.css           ← Global styles
  api/
    contact/            ← Contact form + email
    newsletter/         ← Newsletter signup
    projects/           ← Projects CRUD
    blog/               ← Blog CRUD
    auth/               ← NextAuth
  blog/                 ← Public blog pages
  projects/             ← Public project pages
  admin/                ← Protected admin panel
components/             ← All UI components
lib/
  mongodb.ts            ← DB connection
  models/               ← Mongoose schemas
```

## Setup Guide

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. MongoDB Atlas (Free)
1. Go to mongodb.com/atlas → Create free account
2. Create a free M0 cluster
3. Create a database user (username + password)
4. Whitelist IP: 0.0.0.0/0 (allow all — required for Vercel)
5. Get connection string → paste in MONGODB_URI

### 4. Resend (Free Email)
1. Go to resend.com → Create free account
2. Add & verify your domain (shamsheerfatma.tech)
3. Create API key → paste in RESEND_API_KEY

### 5. Run Locally
```bash
npm run dev
# Open http://localhost:3000
# Admin: http://localhost:3000/admin/login
```

### 6. Deploy to Vercel (Free)
```bash
# Push to GitHub first
git add .
git commit -m "Initial commit"
git push origin main

# Then:
# 1. Go to vercel.com → Import GitHub repo
# 2. Add all .env.local variables in Vercel dashboard
# 3. Deploy!
```

### 7. Connect Custom Domain
1. Vercel dashboard → Settings → Domains → Add `shamsheerfatma.tech`
2. In .tech domain DNS panel, add the records Vercel shows you
3. Wait 10–30 mins → Done!

## Admin Panel
- URL: `yourdomain.tech/admin`
- Login with ADMIN_EMAIL + ADMIN_PASSWORD from .env
- Manage: Projects, Blog Posts, View Leads

## Customisation Checklist
- [ ] Replace "Shamsheer Fatma" with your name throughout
- [ ] Update stats in Hero component
- [ ] Replace testimonials with real ones
- [ ] Add your real photo in About component
- [ ] Update contact links (WhatsApp, LinkedIn, email)
- [ ] Add your first project via Admin panel
- [ ] Write your first blog post via Admin panel
- [ ] Upload a resume.pdf to /public folder
