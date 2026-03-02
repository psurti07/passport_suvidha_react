#HOME page

#1200x1200px image for Hero page
#1200x1200px image for second img in home page

__________________

#SERVICE page

#remaining image
__________________

#ABOUT page

#1400x800 image ABOUT page






__________________

# Social Media
__________________

facebook
https://www.facebook.com/profile.php?id=61576865822872

instagram
https://www.instagram.com/passport_suvidha/

twitter
https://x.com/pass_suvidha

pintrest
https://www.pinterest.com/passportsuvidha/_profile/

linedin
https://www.linkedin.com/company/107625710/admin/dashboard/

youtube
https://www.youtube.com/@PassportSuvidha

# Passport Suvidha

A comprehensive online platform for managing passport applications, tracking statuses, and providing support for customers.

# Passport Suvidha API Integration

This document outlines the integration with the Passport Suvidha external API system.

## External API Integration

This application integrates with an external API for OTP verification. Current implementation includes:

- OTP Send: `POST /otp/send`
- OTP Verify: `POST /otp/verify`

Future integration points (currently using mock data):
- Customer Creation
- Additional Information
- Service Selection

## Environment Configuration

To connect to the external API, set the following environment variables in `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.passport-suvidha.example.com
```

## API Endpoints

### OTP Send API

**Request:**
```json
{
  "mobile_number": "9876543223",
  "purpose": "registration"
}
```

### OTP Verify API

**Request:**
```json
{
  "mobile_number": "9054429641",
  "otp": "5548",
  "purpose": "registration"
}
```

## Development

The application uses axios for API communication:
- `axiosClient.ts` - For client-side API calls
- `axiosServer.ts` - For server-side API calls in Next.js API routes

## Getting Started

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Troubleshooting

If you encounter issues with the external API connection, check:
1. Environment variables are set correctly
2. The external API is accessible from your development environment
3. Any required API keys or credentials are valid