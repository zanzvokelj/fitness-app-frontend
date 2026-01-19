Fitness Booking Platform – Backend-First Production System

A production-ready, backend-first fitness booking platform built to model real-world group fitness operations, including payments, capacity management, admin tooling, and an AI-powered assistant constrained by real schedule data.

This project was built as a portfolio-grade system, focused on business logic, system design, and production thinking, not just CRUD functionality.

🌍 Live Demo
https://fitness-app-frontend-rose.vercel.app

⚠️ Backend runs on free-tier infrastructure. Initial requests may take ~1 minute while the server wakes up.

⸻

🧠 System Philosophy

This platform models how real fitness businesses operate:
	•	Capacity-limited group classes
	•	Ticket-based access with validity windows
	•	Waiting lists and cancellation rules
	•	Admin-only management tools
	•	Payments as a source of truth
	•	AI assistance constrained by real data

The system is backend-first.
The frontend acts as a thin client on top of a robust API.

⸻

🚀 Core Capabilities

🔐 Authentication & Security
	•	JWT authentication (access & refresh tokens)
	•	Token rotation & invalidation
	•	Secure password hashing
	•	Brute-force protection on authentication endpoints
	•	Centralized error handling for consistent API responses
	•	Role-based access control (User / Admin)

⸻

🎟 Ticket & Payment System
	•	Paid ticket plans via Stripe
	•	Limited-entry and unlimited tickets
	•	Validity windows (valid_from / valid_until)
	•	Stripe webhooks as the single source of truth
	•	Admin ticket assignment and overrides

⸻

📅 Session & Booking Engine
	•	Group sessions with strict capacity limits
	•	Real-time booking counters
	•	Automatic waiting list management
	•	Cancellation cutoff enforcement
	•	Explicit booking state machine:
	•	active
	•	waiting
	•	canceled
	•	Soft deletes (is_active) for data integrity

⸻

🤖 AI Fitness Assistant
	•	Conversational assistant integrated into the dashboard
	•	Stateless backend with frontend-managed chat history
	•	Uses only real schedule data from the database
	•	Prevents hallucinated workouts, prices, or time slots
	•	Center-aware design (can be enabled per fitness center)
	•	Cost-efficient and predictable usage model

⸻

🛠 Admin Dashboard
	•	User management with ticket filters
	•	Session creation and capacity adjustments
	•	Booking oversight with advanced filtering
	•	Ticket lifecycle management
	•	Revenue and usage analytics

⸻

📊 Analytics
	•	Total users
	•	Active tickets
	•	Active bookings
	•	Revenue metrics
	•	Daily registrations
	•	Bookings per weekday
	•	Most popular classes

⸻

✉️ Notifications
	•	Email notifications for bookings and cancellations
	•	Disabled in production due to free-tier infrastructure limits

⸻

🧪 Testing Strategy
	•	Pytest-based test suite
	•	Isolated PostgreSQL test database
	•	Transaction rollback per test
	•	Authentication & token lifecycle tests
	•	Booking flow and capacity validation
	•	Admin authorization tests

⸻

🧱 Tech Stack

Backend
	•	FastAPI
	•	PostgreSQL
	•	SQLAlchemy
	•	Alembic
	•	JWT (access & refresh)
	•	Stripe API
	•	OpenAI API
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

🧠 Design Decisions
	•	Backend-first architecture
	•	Explicit state machines instead of boolean flags
	•	Soft deletes for auditability
	•	Webhooks over synchronous payment confirmation
	•	AI constrained by database truth, not free text generation
	•	Stateless AI backend for scalability and cost control

⸻

🗺️ Planned Improvements
	•	Background task processing (async workers)
	•	Email queue with retries
	•	Observability (metrics, tracing, structured logs)
	•	Per-center admin roles (multi-tenant admin access)
	•	Audit logs for admin actions
	•	Pagination for admin dashboards
	•	Docker & docker-compose setup

⸻

👤 Author

Built as a real-world portfolio project to demonstrate backend engineering depth, production readiness, and domain-driven system design.