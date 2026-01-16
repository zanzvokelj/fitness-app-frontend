This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Fitness Booking Platform

Production-ready full-stack fitness booking system with payments, session capacity management, waiting lists, and admin dashboards.

Live demo: https://fitness-app-frontend-rose.vercel.app

⸻

🚀 Features

👤 Authentication & Authorization
	•	JWT authentication with access & refresh tokens
	•	Secure token rotation and refresh token invalidation
	•	Role-based access control (User / Admin)
	•	Protected routes and admin-only endpoints

⸻

🎟 Ticket System
	•	Paid ticket plans with Stripe integration
	•	Limited and unlimited entry tickets
	•	Validity windows (valid_from / valid_until)
	•	Automatic ticket activation after successful payment
	•	Admin ticket assignment and manual adjustments

⸻

📅 Session & Booking Management
	•	Class sessions with capacity limits
	•	Real-time booking counts
	•	Automatic waiting list when sessions are full
	•	Cancellation cutoff logic before session start
	•	Status-based bookings (active, waiting)
	•	Soft-deleted sessions instead of hard deletes

⸻

🛠 Admin Dashboard
	•	User management with ticket status filters
	•	Session creation, capacity updates, and cancellation
	•	Booking overview with advanced filtering
	•	Ticket management and history per user
	•	Revenue and usage analytics
	•	KPI dashboard with charts:
	•	User registrations
	•	Revenue trends
	•	Bookings by weekday
	•	Most popular classes

⸻

📊 Analytics & Statistics
	•	Aggregated KPIs (users, active tickets, bookings, revenue)
	•	Daily user registrations
	•	Revenue by day
	•	Bookings by weekday
	•	Popular classes by booking volume

⸻

🧪 Testing
	•	Pytest-based integration tests
	•	Isolated PostgreSQL test database
	•	Transaction rollback per test
	•	Authentication and token lifecycle tests
	•	Admin privilege escalation tests
	•	Booking flow setup fixtures

⸻

🧱 Tech Stack

Backend
	•	FastAPI
	•	PostgreSQL
	•	SQLAlchemy
	•	Stripe API
	•	JWT (access & refresh tokens)
	•	Pytest

Frontend
	•	Next.js (App Router)
	•	TypeScript
	•	Recharts
	•	Tailwind CSS
	•	next-intl (i18n)

Deployment
	•	Backend: Render
	•	Frontend: Vercel
	•	Database: PostgreSQL