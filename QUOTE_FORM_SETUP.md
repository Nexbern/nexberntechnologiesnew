# Quote Form Email Setup

## Overview
The service details page now includes a quote request form that sends emails to `syedzaidhasanh@gmail.com`.

## Features
- ✅ Modal form that opens when clicking "Get A Quote" button
- ✅ All required fields as specified:
  - Select Service (dropdown)
  - Full Name
  - Email Address
  - Phone Number
  - Company Name (optional)
  - Project Type (dropdown)
  - Budget Range (dropdown)
  - Timeline (dropdown)
  - Project Description (textarea)
- ✅ Form validation
- ✅ Email sent to syedzaidhasanh@gmail.com
- ✅ Beautiful, responsive modal design
- ✅ Success/error message feedback

## Email Configuration Setup

To enable email sending, you need to configure Gmail credentials:

### Step 1: Create a `.env.local` file
Copy the `.env.local.example` file to `.env.local`:
```bash
cp .env.local.example .env.local
```

### Step 2: Set up Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to: https://myaccount.google.com/apppasswords
4. Create a new App Password for "Mail"
5. Copy the generated 16-character password

### Step 3: Update `.env.local`
Edit the `.env.local` file with your credentials:
```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

### Step 4: Restart the Development Server
After updating the `.env.local` file, restart your Next.js server:
```bash
npm run dev
```

## Testing the Form

1. Navigate to any service details page (e.g., `/service-details/web-development`)
2. Click the "Get A Quote" button in the sidebar
3. Fill out the form with test data
4. Click "Submit Quote Request"
5. Check the email inbox at syedzaidhasanh@gmail.com

## Email Format

The email will include:
- **Service Details**: Selected service, project type, budget, timeline
- **Client Information**: Name, email, phone, company (if provided)
- **Project Description**: Custom message from the client
- **Timestamp**: When the quote was submitted

## Troubleshooting

### Email not sending?
- Verify your `.env.local` file exists and has correct credentials
- Make sure you're using an App Password, not your regular Gmail password
- Check that 2-Factor Authentication is enabled on your Google account
- Restart the development server after changing `.env.local`

### Form not opening?
- Check browser console for JavaScript errors
- Ensure the dev server is running without errors

### Form validation errors?
- All fields marked with * are required
- Email must be in valid format
- Phone number should include country code

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── send-quote/
│   │       └── route.ts          # API endpoint for sending emails
│   ├── service-details/
│   │   └── [slug]/
│   │       └── page.tsx           # Service details page with form
│   └── globals.css                # Modal animations
└── .env.local.example             # Environment variables template
```

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- App Passwords are safer than using your main Gmail password
- Consider using a dedicated email service (SendGrid, Mailgun) for production
