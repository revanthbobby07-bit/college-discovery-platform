# College Discovery Platform

A full-stack, responsive web application for discovering, comparing, and predicting college admissions across top engineering and technology institutes in India. Built with Next.js 16 (App Router), TypeScript, TailwindCSS, and Prisma 8 connected to a PostgreSQL database.

---

## Key Features

1. **College Search, Filtering & Pagination (`/colleges`)**
   - Live search by college name.
   - Filter by location, min/max annual fees, and minimum rating.
   - Server-side database pagination (`page`, `limit`, `total`, `totalPages`).
   - Cards display location, rating, annual fees, and short overview.

2. **College Details Page (`/colleges/[id]`)**
   - Comprehensive overview of individual colleges.
   - Dynamic sections for **About**, **Courses** (degree, duration, fees), **Placements** (average/highest package, placement rate), **Reviews & Ratings**, and **Admission Cutoff Ranks**.
   - "Add to Compare" toggle directly on details header.

3. **Compare Colleges (`/compare`)**
   - Side-by-side comparison matrix of up to **3 colleges**.
   - Enforces a 3-college maximum limit with toast feedback.
   - Compares Basic Info, Placements, Available Courses, Reviews, and Cutoff ranks.
   - Individual college column removal and "Clear All" functionality.
   - `localStorage` persistence across page reloads and browser tabs.

4. **College Predictor (`/predictor`)**
   - Predicts eligible college and course admissions based on entrance exam rank and candidate category (`General`, `OBC`, `SC`, `ST`, `EWS`).
   - Form validation with loading and error states.
   - Results display cutoff ranks and direct "View College" action links.

---

## Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: TailwindCSS (Dark/Light visual theme support)
- **Database & ORM**: PostgreSQL via Prisma 8 (`@prisma/composer`)
- **State Persistence**: `useSyncExternalStore` + `localStorage`

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── colleges/
│   │   │   ├── route.ts                 # Search, Filter & Paginate Colleges API
│   │   │   └── [id]/
│   │   │       ├── route.ts             # College Details API
│   │   │       ├── courses/route.ts     # College Courses API
│   │   │       ├── placements/route.ts  # College Placements API
│   │   │       ├── reviews/route.ts     # College Reviews API
│   │   │       └── cutoffs/route.ts     # College Cutoffs API
│   │   └── predictor/
│   │       └── route.ts                 # College Predictor API
│   ├── colleges/
│   │   ├── page.tsx                     # College Search & Filter Page
│   │   └── [id]/page.tsx                # College Details Page
│   ├── compare/page.tsx                 # Compare Colleges Matrix Page
│   ├── predictor/page.tsx               # College Predictor Form & Results Page
│   └── page.tsx                         # Platform Landing Page
├── components/                          # Reusable UI components
├── hooks/
│   └── useCompare.ts                    # Compare store React hook
├── lib/
│   └── compareStore.ts                  # LocalStorage compare state manager
├── scripts/
│   ├── seed.ts                          # Main College database seed script
│   └── seed-related.ts                  # Related entities seed script
└── src/
    └── prisma/                          # Prisma contract & database client initialization
```

---

## Environment Variables Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"
```

> **Note**: Do not commit `.env` to version control. The `.env` file is included in `.gitignore`.

---

## Database Setup & Seeding Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Initialize Database Client**:
   ```bash
   npx prisma@latest contract emit
   npx prisma@latest db init
   ```

3. **Seed Database**:
   Seed colleges and related domain records (courses, placements, reviews, cutoffs):
   ```bash
   npx tsx scripts/seed.ts
   npx tsx scripts/seed-related.ts
   ```

---

## Running the Application

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Check
```bash
npm run build
npm run start
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/colleges` | Query colleges with `page`, `limit`, `search`, `location`, `minFees`, `maxFees`, `minRating` |
| `GET` | `/api/colleges/[id]` | Fetch college details by ID |
| `GET` | `/api/colleges/[id]/courses` | Fetch courses for a specific college |
| `GET` | `/api/colleges/[id]/placements` | Fetch placement statistics for a college |
| `GET` | `/api/colleges/[id]/reviews` | Fetch student reviews for a college |
| `GET` | `/api/colleges/[id]/cutoffs` | Fetch admission cutoffs for a college |
| `POST` | `/api/predictor` | Body: `{ rank: number, category: string }`. Returns eligible colleges/courses |
