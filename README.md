Fitness Booking Platform

Production-ready full-stack fitness booking system with advanced backend business logic, role-based access control, real-time capacity management, payment integration, and an AI-powered fitness assistant.

This project was built as a real-world portfolio application to demonstrate backend and full-stack engineering skills beyond basic CRUD systems.

🌍 Live demo:
https://fitness-app-frontend-rose.vercel.app

⚠️ Note: Backend runs on free-tier infrastructure.
Initial requests may take up to ~1 minute while the server wakes up.

⸻

🧠 Project Overview

The platform models a real group fitness business:
	•	Users purchase tickets and book group class sessions
	•	Sessions have limited capacity and automatic waiting lists
	•	Tickets have validity windows and usage limits
	•	Admins manage users, sessions, tickets, and analytics
	•	Payments are handled via Stripe with webhook verification
	•	An AI fitness assistant helps users choose suitable group classes based on the real schedule

The system is backend-first: the frontend acts as a thin client on top of a robust API.

⸻

🚀 Core Features

👤 Authentication & Authorization
	•	JWT authentication (access + refresh tokens)
	•	Secure password hashing
	•	Token rotation & invalidation
	•	Brute-force protection on authentication endpoints
	•	Centralized error handling for consistent API responses
	•	Role-based access control (User / Admin)
	•	Admin-only API endpoints

⸻

🎟 Ticket System
	•	Paid ticket plans (Stripe integration)
	•	Limited-entry and unlimited tickets
	•	Validity windows (valid_from / valid_until)
	•	Automatic ticket activation via Stripe webhooks
	•	Admin ticket assignment and manual adjustments

⸻

📅 Session & Booking Management
	•	Group class sessions with capacity limits
	•	Real-time booking counters
	•	Automatic waiting list when sessions are full
	•	Cancellation cutoff before session start
	•	Explicit booking state machine (active, waiting, canceled)
	•	Soft deletes for sessions and bookings (is_active)

⸻

🤖 AI Fitness Assistant
	•	Conversational AI assistant integrated into the dashboard
	•	Stateless backend with frontend-managed chat context
	•	Uses real schedule data from the database
	•	Advises only on available group classes and real time slots
	•	Prevents hallucinated workouts, schedules, or prices
	•	Center-aware: can be enabled per fitness center
	•	Designed for low cost and predictable usage

⸻

🛠 Admin Dashboard (Backend-heavy)
	•	User management with ticket status filters
	•	Session creation, capacity updates, and cancellation
	•	Booking overview with advanced filtering
	•	Ticket management and per-user ticket history
	•	Revenue and usage analytics

⸻

📊 Analytics & Statistics

Aggregated KPIs:
	•	Total users
	•	Active tickets
	•	Active bookings
	•	Revenue
	•	Daily user registrations
	•	Revenue by day
	•	Bookings by weekday
	•	Most popular classes by booking volume

⸻

✉️ Notifications
	•	Email notifications for bookings and cancellations
	•	Currently disabled in production due to free-tier infrastructure limitations

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
	•	OpenAI API (AI assistant)

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
	•	Brute-force protection on sensitive endpoints
	•	Stripe webhook signature verification
	•	Centralized error handling
	•	Admin-only route enforcement

⸻

🧠 Design Decisions
	•	Soft deletes instead of hard deletes for data integrity
	•	Explicit booking state machine instead of boolean flags
	•	Stripe webhooks as the single source of truth for payments
	•	Backend-first architecture with frontend as a thin client
	•	AI assistant constrained by real database data to prevent hallucinations
	•	Stateless AI backend for predictable cost and scalability

⸻

🗺️ Future Improvements
	•	Background task processing (e.g. Celery / Redis)
	•	Email service provider integration
	•	Audit logs for admin actions
	•	Pagination for admin lists
	•	Docker & docker-compose setup

⸻

👤 Author

Built as a real-world portfolio project to demonstrate backend and full-stack engineering skills, production thinking, and domain-driven API design.