# SanlamAllianz Customer Portal

A customer-facing web portal for SanlamAllianz Life Insurance Rwanda. Policyholders can sign in, view policies, track claims, manage payments, and contact support.

This is a frontend demo. Data is mocked locally until a backend API is connected.

## What is included

- Landing, login, and registration with National ID + OTP
- Dashboard with policy and claim summaries
- Policies, claims, payments, services, notifications, profile, FAQ, and feedback
- Light and dark theme
- WhatsApp link for customer support

## Requirements

- Node.js 18 or newer
- npm

## Setup

1. Clone the repository and open the project folder.

2. Copy the environment file:

   ```bash
   copy .env.example .env
   ```

   On macOS or Linux:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Demo login

- National ID: `1199680011973101`
- OTP: any 6 digits

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Base URL for API requests. Defaults to `/api`. |
| `VITE_WHATSAPP_NUMBER` | Support WhatsApp number without `+` or spaces. |

See `.env.example` for sample values.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run the app locally |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  components/   UI and layout
  pages/        Route screens
  data/         Mock data and FAQ content
  stores/       Auth state
  lib/          API client and helpers
```

## Notes

- Personal details on the profile page are read-only by design.
- Claim and payment flows use sample data from `src/data/mock.js`.
- When a real API is ready, point `VITE_API_URL` to it and replace mock calls in the app.

## License

Private — SanlamAllianz internal use unless stated otherwise.
