# Aura Lumina - Modest Fashion & Beauty

A beautiful Next.js 14 website for modest fashion, abayas, and women's beauty. Built with TypeScript and TailwindCSS.

![Aura Lumina](public/images/og-image.svg)

## ✨ Features

- **Modern Design**: Soft, elegant color palette (beige, rose, gold, soft black)
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Full metadata support with OpenGraph and Twitter cards
- **Dynamic Blog**: Blog with dynamic routes and article templates
- **Beautiful UI**: Rounded corners, shadows, modern typography (Inter & Playfair Display)

## 📁 Project Structure

```
aura-lumina/
├── app/
│   ├── layout.tsx          # Global layout with metadata
│   ├── page.tsx            # Homepage
│   ├── blog/
│   │   ├── page.tsx        # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx    # Dynamic blog article page
│   ├── lookbooks/
│   │   └── page.tsx        # Lookbooks/Abayas page
│   └── beauty/
│       └── page.tsx        # Beauty tips page
├── components/
│   ├── Navbar.tsx          # Responsive navigation
│   ├── Footer.tsx          # Footer with newsletter & links
│   └── ui/
│       ├── Button.tsx      # Reusable button component
│       ├── Card.tsx        # Card & ProductCard components
│       └── SectionHeader.tsx
├── lib/
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Site configuration
├── public/
│   └── images/             # Placeholder SVG images
├── styles/
│   └── globals.css         # Global styles & Tailwind
└── ...config files
```

## 🏠 Homepage Sections

1. **Hero Section** - Eye-catching modest fashion theme with animated elements
2. **Featured Abaya Styles** - Product grid with hover effects
3. **Featured Beauty Tips** - Beauty article cards with categories
4. **Shop the Look** - Affiliate-ready complete outfit sets
5. **Latest Blog Posts** - Recent blog articles
6. **Newsletter CTA** - Email subscription section

## 🎨 Design System

### Colors
- **Beige**: Primary backgrounds
- **Rose**: Accent highlights
- **Gold**: Call-to-action & branding
- **Soft Black**: Text & elegant contrast

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new)
   - Name it `Aura-Lumina` (or your preferred name)
   - Leave it empty (no README, .gitignore, or license)

3. **Add files and push**:
   ```bash
   git add .
   git commit -m "Initial commit - Aura Lumina"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Aura-Lumina.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New** → **Project**
3. Import your `Aura-Lumina` repository
4. Vercel auto-detects Next.js — keep the default settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
5. Click **Deploy**

Your site will be live in a few minutes. Vercel provides:
- Automatic HTTPS
- Global CDN
- Preview deployments for every push
- Custom domain support (e.g. `auralumina.com`)

### Environment Variables

If you add `.env` variables later (e.g. analytics, API keys), add them in:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

## 📝 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Main landing page with all sections |
| Blog | `/blog` | Blog listing with categories |
| Blog Article | `/blog/[slug]` | Dynamic article pages |
| Lookbooks | `/lookbooks` | Abaya collections & products |
| Beauty | `/beauty` | Beauty tips & tutorials |

## 🔧 Configuration

### Tailwind CSS
Custom color palette and fonts are configured in `tailwind.config.ts`

### Next.js
Configuration in `next.config.mjs` with image optimization settings

### Metadata
SEO metadata is configured in `app/layout.tsx`

## 📄 License

## 📬 Contact API (CRM + n8n / Strapi)

The contact page has two main flows: **product orders** (clients) and **shop partner** applications. Both submit to:

- **`POST /api/contact`** – JSON body with `formType`: `"order"` | `"partner"` | `"general"`.

Payloads are validated and returned as structured JSON (ready for n8n or Strapi). Optional env vars forward submissions to n8n webhooks for WhatsApp or other automation:

- `N8N_WEBHOOK_URL_ORDER` – product order submissions
- `N8N_WEBHOOK_URL_PARTNER` – partner applications  
- `N8N_WEBHOOK_URL_GENERAL` – general inquiries

See `.env.example`. You can then in n8n trigger WhatsApp messages, or POST the same payload to Strapi (or any CRM).

---

This project is for demonstration purposes.

---

Made with ❤️ for the modest fashion community

