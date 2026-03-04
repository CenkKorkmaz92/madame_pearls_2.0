# EmailJS Setup Guide for Madame Pearls

## Quick Setup (5 Minutes)

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month included)

### 2. Add Email Service
1. In EmailJS Dashboard → **Email Services**
2. Click **Add New Service**
3. Choose your email provider (e.g., Gmail, Outlook)
4. Follow the connection steps
5. **Copy the Service ID** (e.g., `service_xyz123`)

### 3. Create Email Template
1. Go to **Email Templates** → **Create New Template**
2. Use this template structure:

```
Subject: New Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Favorites Selected: {{favorites_count}}
{{favorites_list}}
```

3. **Copy the Template ID** (e.g., `template_abc456`)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Scroll to **API Keys** section
3. **Copy your Public Key** (e.g., `abc123xyz456`)

### 5. Update Configuration
Open `src/app/email.service.ts` and replace:

```typescript
private readonly SERVICE_ID = 'service_xyz123';     // Your Service ID
private readonly TEMPLATE_ID = 'template_abc456';   // Your Template ID
private readonly PUBLIC_KEY = 'abc123xyz456';       // Your Public Key
```

### 6. Test Contact Form
1. Run: `npm start`
2. Navigate to the contact section
3. Fill out the form and submit
4. Check your configured email inbox

## Benefits ✅
- ✅ No PHP server needed
- ✅ Better spam protection
- ✅ GDPR compliant
- ✅ 200 free emails/month
- ✅ Professional email delivery

## Troubleshooting
- **Not receiving emails?** → Check spam folder & verify EmailJS service connection
- **"Invalid public key"?** → Make sure you copied the full key from EmailJS dashboard
- **Template not found?** → Verify Template ID matches exactly

## Optional: Add reCAPTCHA
For extra spam protection, visit [EmailJS reCAPTCHA setup](https://www.emailjs.com/docs/user-guide/adding-captcha-verification/)
