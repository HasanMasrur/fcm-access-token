# Firebase Token (Nest.js)

A minimal Nest.js API + CLI to generate **Firebase (FCM) access tokens** from a Google service account.

## ✨ Features

- `GET /api/token` — returns a Bearer token and expiry
- `npm run token` — prints a token in the terminal for quick copy-paste
- Multiple secure ways to provide credentials (file path, raw JSON, Base64)
- Zero global installs required (no Nest CLI needed to run)

---

## 🚀 Quick Start

```bash
# 1) Extract project
npm i

# 2) Copy your credentials:
cp .env.example .env
# Choose ONE of the following in .env:
# - SERVICE_ACCOUNT_PATH=./firebase-service-account.json
# - SERVICE_ACCOUNT_JSON={...}    (raw JSON, single line or multiline)
# - SERVICE_ACCOUNT_BASE64=...    (base64 of the full JSON)

# 3) Dev server
npm run start:dev
# → http://localhost:3000/api/token

# Or build & run
npm run build && npm start
```

### Generate via CLI
```bash
npm run token
```

---

## 🔐 Security Notes

- **Never commit** your service account JSON or `.env`.
- Prefer **SERVICE_ACCOUNT_BASE64** or **SERVICE_ACCOUNT_PATH** over raw JSON in env.
- If a key is ever exposed, **revoke and rotate** it in Google Cloud IAM immediately.

---

## 🔧 Customize Scopes

By default we request the FCM scope:
```
GOOGLE_SCOPES=https://www.googleapis.com/auth/firebase.messaging
```
You can set `GOOGLE_SCOPES` in `.env` to a comma-separated list if needed.

---

## 🧪 Test the HTTP API

```bash
curl http://localhost:3000/api/token
# -> { "tokenType":"Bearer","token":"...","expiresAt":"...","hint":"Use ...","scope":"..." }
```

## 🧰 Tech
- Nest.js 10 (no global CLI needed)
- Typescript, ts-node-dev
- google-auth-library
```

# fcm-access-token
