OA V‑Card Backend API

Overview
- Express + MongoDB API for OTP login, user profile management, QR generation, and vCard export.

Base URLs
- Local: http://localhost:4000 (or APP_PORT)
- Heroku: https://oa-vcard-2d56fb61c27d.herokuapp.com/

Health
- GET /health → { "status": "ok" }
- Note: GET / returns 404 by design.

CORS
- Allowed origin is controlled by FRONTEND_ORIGIN.
- Set to frontend domain (e.g., http://localhost:5173 during local dev, or your deployed domain).

Authentication Flow
- Passwordless via email OTP.
- JWT returned after verification; use in Authorization: Bearer <token>.

Endpoints
- POST /auth/request-otp
  - Headers: Content-Type: application/json
  - Body: { "email": "user@example.com" }
  - Success: 200 → { "message": "OTP sent successfully" }
  - Errors: 400 (missing email), 500 (send failure)
  - Notes: OTP expires after OTP_EXPIRY_MINUTES (default 10). For staging, set EMAIL_DRIVER=log to log OTPs in server logs.

- POST /auth/verify-otp
  - Headers: Content-Type: application/json
  - Body: { "email": "user@example.com", "otp": "123456" }
  - Success: 200 → { "token": "<jwt>", "userId": "<mongoId>" }
  - Errors: 400 (invalid/expired OTP or missing fields), 500 (server error)
  - JWT: expires in 7 days; include in Authorization header for protected routes.

- GET /user/:id (protected)
  - Headers: Authorization: Bearer <jwt>
  - Success: 200 → user profile (without OTP fields)
  - Errors: 400 (invalid id), 401 (no/invalid token), 403 (accessing another user), 404 (not found)

- PUT /user/:id (protected)
  - Headers: Authorization: Bearer <jwt>, Content-Type: application/json
  - Body fields (optional): fullName, phoneNumber, position, location, socialLinks
  - Success: 200 → updated user
  - Errors: 400, 401, 403, 404

- GET /user/:id/qrcode (public)
  - Returns: image/png (300px, margin 1)
  - Encodes URL: ${PUBLIC_BASE_URL}/scan/:id

- GET /user/:id/vcard (public)
  - Returns: text/vcard; charset=utf-8 with Content-Disposition: attachment; filename="<name>.vcf"
  - Includes: name, email, phone, position, location, social links note, and profile URL.

User Model Shape

{
  _id: String,
  fullName: String,
  email: String,
  phoneNumber: String,
  position: String,
  location: String,
  socialLinks: { linkedin?: String, twitter?: String, instagram?: String },
  qrCode?: String,
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}


Environment Variables
- PORT: Set by Heroku automatically (used in production)
- APP_PORT: Local dev port fallback (default 4000)
- NODE_ENV: production in Heroku to avoid loading local .env
- MONGODB_URI: MongoDB connection string (Atlas recommended)
- JWT_SECRET: JWT signing secret
- FRONTEND_ORIGIN: CORS allowlist origin
- PUBLIC_BASE_URL: Frontend base used in QR links (e.g., https://your-frontend.com)
- OTP_EXPIRY_MINUTES: OTP lifetime in minutes (default 10)
- EMAIL_DRIVER: smtp (default) or log to print OTPs
- SMTP Options (choose ONE approach):
  - Service: SMTP_SERVICE=gmail, SMTP_USER, SMTP_PASS (App Password)
  - Raw: SMTP_HOST, SMTP_PORT, SMTP_SECURE (true for 465), SMTP_USER, SMTP_PASS
- FROM_EMAIL: Sender address (use your mailbox or match SMTP_USER)
- SMTP_DEBUG: true to log transporter debug/verify info
- APP_NAME: App name used in email subject

Error Format
- Errors return JSON: { "message": "<reason>" }
- Typical statuses: 400, 401, 403, 404, 500

Frontend Integration Tips
- Implement "/scan/:id" page to handle QR destination (PUBLIC_BASE_URL/scan/:id).
- Store the JWT after /auth/verify-otp and attach it via Authorization header for protected routes.
- When testing email in staging, use EMAIL_DRIVER=log and read logs.

Axios Helpers (Example)

import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL; // e.g., https://<your-app>.herokuapp.com
export const api = axios.create({ baseURL: API_BASE_URL });

export const requestOtp = (email) =>
  api.post('/auth/request-otp', { email });

export const verifyOtp = async (email, otp) => {
  const { data } = await api.post('/auth/verify-otp', { email, otp });
  api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  return data;
};

export const getUser = (id) => api.get(`/user/${id}`);
export const updateUser = (id, payload) => api.put(`/user/${id}`, payload);
export const getQrPng = (id) => `${API_BASE_URL}/user/${id}/qrcode`;
export const getVcard = (id) => `${API_BASE_URL}/user/${id}/vcard`;


Setup
- Copy .env.example to .env for local dev and fill values.
- Install dependencies: npm install
- Start: npm start (Heroku uses PORT; local uses APP_PORT)

Deployment Notes (Heroku)
- Ensure Config Vars are set: MONGODB_URI, JWT_SECRET, FRONTEND_ORIGIN, PUBLIC_BASE_URL, SMTP,
  and NODE_ENV=production.
- Dyno logs: heroku logs --tail
- Health check: GET https://oa-vcard-2d56fb61c27d.herokuapp.com/health