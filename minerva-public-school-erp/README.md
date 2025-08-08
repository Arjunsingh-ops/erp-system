# Minerva Public School ERP

A full-stack School ERP scaffold with a Node.js + Express + Prisma backend and a Vite + React + Tailwind CSS frontend.

## Features
- Authentication (JWT) with a default admin user (seed)
- Students CRUD (basic list and create)
- Attendance and Fees minimal endpoints (scaffolded)
- React frontend with Login and Student List pages
- Prisma with SQLite for easy local development

## Project Structure
- `backend/`: Express API, Prisma ORM
- `frontend/`: Vite + React + Tailwind CSS

## Prerequisites
- Node.js 18+
- npm 9+
- VS Code (recommended)

## Quick Start (VS Code)

1. Open the folder in VS Code: `File -> Open Folder...` and select `minerva-public-school-erp`.

2. Backend setup:
   - Copy `backend/.env.example` to `backend/.env` and adjust if needed.
   - Install deps:
     ```bash
     cd backend
     npm install
     ```
   - Generate Prisma client and create DB with migration:
     ```bash
     npm run prisma:generate
     npm run prisma:migrate
     ```
   - Seed sample data (admin user and students):
     ```bash
     npm run seed
     ```
   - Start the API:
     ```bash
     npm run dev
     # API runs on http://localhost:4000 by default
     ```

3. Frontend setup (in a new terminal):
   - Install deps:
     ```bash
     cd frontend
     npm install
     ```
   - (Optional) Create `.env` in `frontend/` to customize API URL:
     ```bash
     echo "VITE_API_URL=http://localhost:4000" > .env
     ```
   - Start the app:
     ```bash
     npm run dev
     # App runs on http://localhost:5173
     ```

4. Login credentials (after seeding):
   - Email: `admin@minerva.local`
   - Password: `admin123`

## API Overview
- `POST /api/auth/login` – Login with email/password
- `GET /api/students` – List students (requires JWT)
- `POST /api/students` – Create student (requires JWT)
- `GET /api/attendance` – List attendance (requires JWT)
- `POST /api/attendance` – Create/mark attendance (requires JWT)
- `GET /api/fees` – List fees (requires JWT)
- `POST /api/fees/pay` – Mark fee as paid (requires JWT)

## Notes
- This is a scaffold to help you start quickly. Extend models, validations, role-based access control, and UI as needed.
- SQLite is used for simplicity. For production, switch to PostgreSQL or MySQL by updating `DATABASE_URL` and Prisma datasource.