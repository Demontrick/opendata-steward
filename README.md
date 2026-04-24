# OpenData Steward

![CI](https://github.com/Demontrick/opendata-steward/actions/workflows/ci.yml/badge.svg)

A full-stack data stewardship platform inspired by enterprise life sciences workflows (Veeva Systems style), designed to help data stewards review, clean, and validate large-scale healthcare records efficiently.

---

## 🧠 Problem Statement

In life sciences organizations, data stewards manage thousands of healthcare and pharmaceutical records daily. These records often contain:

- Duplicate entries  
- Missing specialty information  
- Inconsistent country or address data  
- Unverified healthcare provider records  

Manual review is slow and error-prone.

**OpenData Steward solves this by providing a fast, structured review workflow UI with quality-first prioritization.**

---

## 🚀 Key Features

### Frontend (React + TypeScript)
- Records sorted by **data quality score (lowest first)**
- Filter by status (pending, approved, rejected, needs_review)
- Approve / Reject / Flag for Review actions
- Optimistic UI updates using React Query
- QualityBadge with color-coded scoring:
  - 🔴 0–40: LOW
  - 🟠 41–70: MEDIUM
  - 🟢 71–100: HIGH
- Fully tested with Vitest

---

### Backend (FastAPI + PostgreSQL + SQLAlchemy)
- REST API for record management
- Status workflow:
  - pending → approved / rejected / needs_review
- Filtering support via query parameters
- Seeded mock life sciences dataset
- SQLite for dev, PostgreSQL ready for production

---

## 📊 Data Model

```ts
interface StewardRecord {
  id: string;
  company_name: string;
  country: string;
  specialty: string;
  data_quality_score: number;
  flag_reason: string;
  status: "pending" | "approved" | "rejected" | "needs_review";
  duplicate_of: string | null;
  last_updated: string;
}
🔌 API Endpoints
Get Records
GET /api/records?status=pending
Approve Record
POST /api/records/{id}/approve
Reject Record
POST /api/records/{id}/reject
Mark for Review
POST /api/records/{id}/review
🧪 Testing
Frontend (Vitest)
QualityBadge component tests
RecordCard rendering + interaction tests
npx vitest run
Backend (pytest)
API endpoint tests
Status update verification
Filtering validation
python -m pytest
⚙️ Tech Stack
Frontend
React 19
TypeScript
Vite
TanStack React Query
Vitest
Backend
FastAPI
SQLAlchemy
PostgreSQL / SQLite
pytest
🧠 Architecture Notes
Backend is a stateless REST API
Frontend uses React Query for caching and mutations
Optimistic UI updates for fast stewardship workflow
Records sorted by quality score (lowest first = highest priority)
📦 Setup
Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Frontend
cd frontend
npm install
npm run dev
🧾 CI Pipeline

GitHub Actions runs:

Frontend tests (Vitest)
Backend tests (pytest)

On every push and pull request.

🎯 Purpose

This project simulates a real-world data stewardship system used in life sciences organizations like Veeva Systems, focusing on:

Data quality control
Record validation workflows
Human-in-the-loop decision systems
🏁 Status

✔ Backend complete
✔ Frontend complete
✔ Tests passing
✔ CI configured
✔ Production-ready structure

👤 Built By

A full-stack engineering project demonstrating:

Clean architecture
Testing discipline
API design
Real-world workflow thinking