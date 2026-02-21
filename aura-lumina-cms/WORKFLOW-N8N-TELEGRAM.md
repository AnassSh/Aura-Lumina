# Workflow: Form → Payload CMS → n8n → Telegram

This guide explains how to set up the automation:

**Customer/Partner → Website Form → n8n → Payload CMS (create order/partner) + Telegram notification**

---

## Flow Overview

1. User fills the contact form on the website (order or partnership).
2. Website `POST /api/contact` forwards the payload to n8n webhooks.
3. n8n receives the webhook and:
   - **Creates** an Order or Partner document in Payload CMS via REST API.
   - **Sends** a Telegram notification with the details.

---

## Prerequisites

- [ ] Payload CMS running with **PostgreSQL** and **Orders** + **Partners** collections
- [ ] n8n (cloud or self-hosted) with public webhook URLs
- [ ] Telegram bot created via [@BotFather](https://t.me/botfather)
- [ ] Main website env: `N8N_WEBHOOK_URL_ORDER`, `N8N_WEBHOOK_URL_PARTNER` set

---

## 1. Payload CMS – Create API Key

1. Open Payload Admin → **Users** → your user
2. Go to **API Keys** and create a new key (e.g. `n8n-integration`)
3. Copy the key – you’ll add it in n8n

---

## 2. Website – Environment Variables

In the **main Aura-Lumina** project (not the CMS):

```env
N8N_WEBHOOK_URL_ORDER=https://your-n8n.com/webhook/order
N8N_WEBHOOK_URL_PARTNER=https://your-n8n.com/webhook/partner
N8N_WEBHOOK_URL_GENERAL=https://your-n8n.com/webhook/general
```

---

## 3. n8n – Workflow for Orders

Create a workflow:

1. **Webhook** node  
   - HTTP Method: POST  
   - Path: `order`  
   - Respond: Immediately  
   - Body content: JSON  

2. **HTTP Request** node (create in Payload)  
   - Method: POST  
   - URL: `https://your-cms-url.com/api/orders`  
   - Authentication: Header Auth  
   - Header name: `Authorization`  
   - Header value: `Bearer YOUR_PAYLOAD_API_KEY`  
   - Body: JSON, map fields from webhook:
     ```json
     {
       "formType": "{{ $json.formType }}",
       "firstName": "{{ $json.firstName }}",
       "lastName": "{{ $json.lastName }}",
       "email": "{{ $json.email }}",
       "phone": "{{ $json.phone }}",
       "productName": "{{ $json.productName }}",
       "productPrice": "{{ $json.productPrice }}",
       "selectedSize": "{{ $json.selectedSize }}",
       "quantity": "{{ $json.quantity }}",
       "message": "{{ $json.message }}",
       "submittedAt": "{{ $json.submittedAt }}"
     }
     ```

3. **Telegram** node  
   - Send a message with order summary, e.g.:  
     `New order from {{ $json.firstName }} {{ $json.lastName }} – {{ $json.productName }} ({{ $json.selectedSize }})`

---

## 4. n8n – Workflow for Partners

Same structure but:

1. **Webhook** path: `partner`  
2. **HTTP Request** URL: `https://your-cms-url.com/api/partners`  
3. **Telegram** message with shop name, city, contact, etc.

---

## 5. CORS

Ensure Payload `cors` in `payload.config.ts` includes your website domain and n8n URL if needed.

---

## Reminders & Free Hosting

- **Free PostgreSQL**: [Neon](https://neon.tech), [Supabase](https://supabase.com), or Vercel Postgres (free tier).
- **Free n8n**: [n8n cloud](https://n8n.io) has a free tier; or self-host (Docker, Railway, etc.).
- **Telegram**: Free; create a bot via @BotFather and add it to a group/channel for notifications.
- **After schema changes**: Run `npm run payload generate:types` in `aura-lumina-cms/` to update `payload-types.ts`.
