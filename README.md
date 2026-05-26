# PrepBoostAI

PrepBoostAI is a full-stack MERN-style application that helps a logged-in user generate an AI-powered interview preparation report from a resume, a self-description, and a target job description. It can also generate a tailored resume PDF from a saved interview report.

The project is split into two separate apps:

- `Backend`: Express API, MongoDB models, authentication, file upload, PDF parsing, Google GenAI report generation, and resume PDF generation.
- `Frontend`: React + Vite client for login/register, report creation, report history, report viewing, and PDF download.

## Tech Stack

- Frontend: React 19, Vite, React Router, Axios, Sass
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT stored in an HTTP cookie
- AI: `@google/genai`
- File handling: Multer, `pdf-parse`
- PDF generation: Puppeteer

## Folder Structure

```text
PrepBoostAI/
+-- Backend/
|   +-- package.json
|   +-- package-lock.json
|   +-- server.js
|   +-- src/
|       +-- app.js
|       +-- config/
|       |   +-- database.js
|       +-- controllers/
|       |   +-- auth.controller.js
|       |   +-- interview.controller.js
|       +-- middlewares/
|       |   +-- auth.middleware.js
|       |   +-- file.middleware.js
|       +-- models/
|       |   +-- blacklist.model.js
|       |   +-- interviewReport.model.js
|       |   +-- user.model.js
|       +-- routes/
|       |   +-- auth.routes.js
|       |   +-- interview.routes.js
|       +-- services/
|           +-- ai.service.js
+-- Frontend/
    +-- package.json
    +-- package-lock.json
    +-- index.html
    +-- vite.config.js
    +-- src/
        +-- App.jsx
        +-- app.routes.jsx
        +-- main.jsx
        +-- style.scss
        +-- features/
        |   +-- auth/
        |   |   +-- auth.context.jsx
        |   |   +-- auth.form.scss
        |   |   +-- components/
        |   |   |   +-- Protected.jsx
        |   |   +-- hooks/
        |   |   |   +-- useAuth.js
        |   |   +-- pages/
        |   |   |   +-- Login.jsx
        |   |   |   +-- Register.jsx
        |   |   +-- services/
        |   |       +-- auth.api.js
        |   +-- interview/
        |       +-- interview.context.jsx
        |       +-- hooks/
        |       |   +-- useInterview.js
        |       +-- pages/
        |       |   +-- Home.jsx
        |       |   +-- Interview.jsx
        |       +-- services/
        |       |   +-- interview.api.js
        |       +-- style/
        |           +-- home.scss
        |           +-- interview.scss
        +-- style/
            +-- button.scss
```

## How The App Works

1. The frontend runs on `http://localhost:5173`.
2. The backend runs on `http://localhost:3000`.
3. The backend allows CORS only from `http://localhost:5173`.
4. Users register or log in through `/api/auth`.
5. The backend signs a JWT and stores it in a cookie named `token`.
6. Protected frontend pages call `/api/auth/get-me` to confirm the current user.
7. A logged-in user uploads a resume PDF and enters job/self-description details.
8. The backend parses the PDF, sends the content to Google GenAI, stores the generated report in MongoDB, and returns the report to the frontend.
9. The saved report can later be opened from the recent reports list.
10. The app can generate a resume PDF for a saved report using Puppeteer.

## Prerequisites

Install these before starting:

1. Node.js `20.19.0` or newer. Vite 7 and several dependencies require Node 20+.
2. npm. It comes with Node.js.
3. MongoDB. Use either a local MongoDB server or MongoDB Atlas.
4. A Google GenAI API key.

Check your versions:

```bash
node -v
npm -v
```

## Step 1: Open The Project

If you already cloned the project, open a terminal in the project root:

```bash
cd "D:\Latest Projects\PrepBoostAI"
```

If you are cloning from GitHub again, use:

```bash
git clone <your-repository-url>
cd PrepBoostAI
```

## Step 2: Set Up The Backend

Go to the backend folder:

```bash
cd Backend
```

Install backend dependencies:

```bash
npm ci
```

If `npm ci` fails because the lockfile is out of date, use:

```bash
npm install
```

Create a `.env` file inside the `Backend` folder:

```text
Backend/.env
```

Add these values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/interview-ai
JWT_SECRET=replace_this_with_a_long_random_secret
GOOGLE_GENAI_API_KEY=replace_this_with_your_google_genai_api_key
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/interview-ai
```

Start the backend:

```bash
npm run dev
```

Expected output:

```text
Connected to Database
Server is running on port 3000
```

Keep this terminal running.

## Step 3: Set Up The Frontend

Open a second terminal from the project root and go to the frontend folder:

```bash
cd "D:\Latest Projects\PrepBoostAI\Frontend"
```

Install frontend dependencies:

```bash
npm ci
```

If `npm ci` fails because the lockfile is out of date, use:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Expected output includes a local Vite URL:

```text
Local: http://localhost:5173/
```

Open this URL in your browser:

```text
http://localhost:5173
```

## Step 4: Use The App

1. Go to `http://localhost:5173/register`.
2. Create an account.
3. You should be redirected into the protected app.
4. Paste a target job description.
5. Upload a resume PDF.
6. Add a self-description if you want more personalized results.
7. Click `Generate My Interview Strategy`.
8. Wait for the AI report to finish.
9. Open saved reports from the recent reports list.
10. Use the resume PDF generation option from the report page.

Important upload note: the backend currently accepts files through memory upload with a `3MB` limit and parses resumes as PDF text. Use a PDF file under 3MB for the most reliable result.

## Backend API Routes

Auth routes:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/logout
GET  /api/auth/get-me
```

Interview routes:

```text
POST /api/interview/
GET  /api/interview/
GET  /api/interview/report/:interviewId
POST /api/interview/resume/pdf/:interviewReportId
```

## Useful Commands

Backend:

```bash
cd Backend
npm run dev
```

Frontend:

```bash
cd Frontend
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment Variables

The backend uses these variables:

```env
MONGO_URI=
JWT_SECRET=
GOOGLE_GENAI_API_KEY=
```

The frontend currently has no `.env` file. Its API base URL is hardcoded in:

```text
Frontend/src/features/auth/services/auth.api.js
Frontend/src/features/interview/services/interview.api.js
```

Both currently point to:

```text
http://localhost:3000
```

## Common Problems

### Backend says MongoDB connection failed

Check that MongoDB is running and that `MONGO_URI` is correct.

For local MongoDB, the default value is usually:

```env
MONGO_URI=mongodb://127.0.0.1:27017/interview-ai
```

### Frontend cannot call backend

Make sure:

- Backend is running on `http://localhost:3000`.
- Frontend is running on `http://localhost:5173`.
- You did not change the frontend port, because backend CORS allows only `http://localhost:5173`.

### Login works but protected pages keep redirecting

The app depends on cookies. Make sure the frontend calls the backend with credentials enabled. This is already set in both frontend Axios service files with:

```js
withCredentials: true
```

### AI report generation fails

Check that:

- `GOOGLE_GENAI_API_KEY` exists in `Backend/.env`.
- The API key is valid.
- The backend was restarted after changing `.env`.
- The uploaded resume is a readable PDF.

### Resume upload fails

Use a PDF file under 3MB. The UI mentions DOCX, but the backend currently parses uploaded files with `pdf-parse`, so PDF is the supported format in the current backend implementation.

### Puppeteer install or PDF generation fails

Puppeteer downloads or uses a browser for PDF generation. If installation was interrupted, reinstall backend dependencies:

```bash
cd Backend
npm install
```

## Development Notes

- Backend entry point: `Backend/server.js`
- Express app setup: `Backend/src/app.js`
- Database connection: `Backend/src/config/database.js`
- Google GenAI logic: `Backend/src/services/ai.service.js`
- Frontend route setup: `Frontend/src/app.routes.jsx`
- Frontend auth API client: `Frontend/src/features/auth/services/auth.api.js`
- Frontend interview API client: `Frontend/src/features/interview/services/interview.api.js`

There are no automated tests configured yet. The backend `test` script currently exits with an error placeholder.
