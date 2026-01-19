Fitness Booking Platform

Production-ready full-stack fitness booking system with advanced backend business logic, role-based access control, real-time capacity management, and payment integration.

This project was built as a real-world portfolio application to demonstrate backend and full-stack engineering skills beyond basic CRUD systems.

🌍 Live demo:
https://fitness-app-frontend-rose.vercel.app

⚠️ Note: Backend runs on free-tier infrastructure.
Initial requests may take up to ~1 minute while the server wakes up.

⸻

🧠 Project Overview

The platform models a real group fitness business:
	•	Users can purchase tickets and book class sessions
	•	Sessions have limited capacity and waiting lists
	•	Tickets have validity windows and usage limits
	•	Admins manage sessions, users, tickets, and view analytics
	•	Payments are handled via Stripe with webhook verification

The system is backend-first: the frontend acts as a thin client on top of a robust API.

⸻

🚀 Core Features

👤 Authentication & Authorization
	•	JWT authentication (access + refresh tokens)
	•	Secure password hashing
	•	Token rotation & invalidation
	•	Role-based access control (User / Admin)
	•	Admin-only API endpoints

⸻

🎟 Ticket System
	•	Paid ticket plans (Stripe integration)
	•	Limited-entry and unlimited tickets
	•	Validity windows (valid_from / valid_until)
	•	Automatic ticket activation after payment webhook
	•	Admin ticket assignment and manual adjustments

⸻

📅 Session & Booking Management
	•	Class sessions with capacity limits
	•	Real-time booking counters
	•	Automatic waiting list when sessions are full
	•	Cancellation cutoff before session start
	•	Booking state machine (active, waiting, canceled)
	•	Soft deletes for sessions and bookings

⸻

🛠 Admin Dashboard (Backend-heavy)
	•	User management with ticket status filters
	•	Session creation, capacity updates, and cancellation
	•	Booking overview with advanced filtering
	•	Ticket management and per-user ticket history
	•	Revenue and usage analytics

⸻

📊 Analytics & Statistics
	•	Aggregated KPIs:
	•	total users
	•	active tickets
	•	active bookings
	•	revenue
	•	Daily user registrations
	•	Revenue by day
	•	Bookings by weekday
	•	Most popular classes by booking volume

⸻

🧪 Testing
	•	Pytest-based test suite
	•	Isolated PostgreSQL test database
	•	Transaction rollback per test
	•	Authentication & token lifecycle tests
	•	Booking flow and capacity validation tests
	•	Admin authorization tests

⸻

🧱 Tech Stack

Backend
	•	FastAPI
	•	PostgreSQL
	•	SQLAlchemy
	•	Alembic
	•	JWT (access & refresh tokens)
	•	Stripe API
	•	Pytest

Frontend
	•	Next.js (App Router)
	•	TypeScript
	•	Tailwind CSS
	•	Recharts
	•	next-intl (i18n)

Deployment
	•	Backend: Render
	•	Frontend: Vercel
	•	Database: PostgreSQL

⸻

🔐 Security Highlights
	•	Secure password hashing
	•	JWT expiration & refresh logic
	•	Token reuse prevention
	•	Stripe webhook signature verification
	•	Admin-only route enforcement

⸻

🧠 Design Decisions
	•	Soft deletes (is_active) instead of hard deletes for data integrity
	•	Explicit booking state machine instead of boolean flags
	•	Stripe webhooks used as the single source of truth for payments
	•	Clear separation between user-facing and admin APIs
	•	Backend-first architecture with frontend as a thin client

⸻

🗺️ Future Improvements
	•	Email notifications for bookings and cancellations
	•	Background task processing (e.g. Celery)
	•	Audit logs for admin actions
	•	Pagination for admin lists
	•	Docker & docker-compose setup

⸻

👤 Author

Built as a real-world portfolio project to demonstrate backend and full-stack engineering skills, production thinking, and domain-driven API design.