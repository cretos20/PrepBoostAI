# PrepBoostAI

AI-powered full-stack job preparation platform featuring ATS resume analysis, skill-gap detection, AI-generated interview preparation, and automated resume processing using Gemini AI.

---

# Tech Stack

## Frontend

* React.js
* Vite
* SCSS
* Context API

## Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

## AI & Automation

* Google Gemini AI
* Puppeteer

---

# Features

* User Authentication with JWT
* Resume PDF Upload
* ATS Resume Analysis
* Skill-Gap Detection
* AI-Generated Interview Questions
* Resume Processing with Gemini AI
* Recent Reports History
* Resume PDF Generation using Puppeteer
* Protected Routes
* Modular Full-Stack Architecture

---

# Project Structure

```text
PrepBoostAI/
│
├── Backend/
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── services/
│
└── Frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── features/
        ├── pages/
        ├── services/
        ├── hooks/
        └── styles/
```

---

# How The App Works

1. Frontend runs on `http://localhost:5173`
2. Backend runs on `http://localhost:3000`
3. Users register/login using JWT authentication
4. JWT token is stored securely in cookies
5. Protected routes validate users through `/api/auth/get-me`
6. Users upload resumes and enter job/self-description details
7. Backend parses PDF and sends content to Gemini AI
8. AI-generated reports are stored in MongoDB
9. Users can access recent reports anytime
10. Resume PDFs are generated dynamically using Puppeteer

---

# Prerequisites

Install the following before setup:

* Node.js `v20+`
* npm
* MongoDB Local or MongoDB Atlas
* Google Gemini API Key

Check versions:

```bash
node -v
npm -v
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/cretos20/PrepBoostAI.git
cd PrepBoostAI
```

---

# Backend Setup

## Go To Backend Folder

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

## Create Backend Environment File

Create:

```text
Backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
GEMINI_MODEL=gemini-2.5-flash
GEMINI_FALLBACK_MODELS=gemini-2.5-flash-lite
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Start Backend Server

```bash
npm run dev
```

Expected Output:

```text
Connected to Database
Server is running on port 3000
```

---

# Frontend Setup

## Open New Terminal

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

## Create Frontend Environment File

Create:

```text
Frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Start Frontend

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# API Flow

```text
Frontend → Express API → Gemini AI → MongoDB → Frontend
```

---

# Authentication Flow

```text
User Login/Register
        ↓
JWT Generated
        ↓
Stored In Cookies
        ↓
Protected Route Verification
```

---

# Environment Variables

## Backend

| Variable               | Description               |
| ---------------------- | ------------------------- |
| MONGO_URI              | MongoDB connection string |
| JWT_SECRET             | JWT secret key            |
| GOOGLE_GENAI_API_KEY   | Gemini API key            |
| GEMINI_MODEL           | Primary Gemini model      |
| GEMINI_FALLBACK_MODELS | Fallback Gemini models    |
| CLIENT_URL             | Frontend URL              |
| NODE_ENV               | Environment mode          |

## Frontend

| Variable          | Description     |
| ----------------- | --------------- |
| VITE_API_BASE_URL | Backend API URL |

---

# Future Improvements

* Mock Interviews
* Voice-Based Interviews
* AI Resume Scoring
* Multi-Role Preparation
* Analytics Dashboard
* Email Reports

---

# Author

## Nitya Raval

* Full Stack Developer
* AI/ML Enthusiast
* AWS Certified Cloud Practitioner
