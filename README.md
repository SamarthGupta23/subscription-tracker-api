# Subscription Tracker

A simple web API to help users manage and track their paid subscriptions (like Netflix, Spotify, YouTube Premium, etc).  
Users can register, log in, add their subscriptions, edit and delete them, and get reminders before a renewal is due.

---

## Features

- **User authentication:** Users can sign up, log in, and securely manage their data.
- **Subscription management:** Add, update, delete, or view all your subscriptions.
- **Reminders:** Get notified before your subscription is about to renew (via email, using QStash for background jobs).
- **Categories:** Organize subscriptions by type (entertainment, productivity, etc).
- **REST API:** Built with Node.js and Express, ready to be used with web or mobile frontends.

---

## How it works

1. **Register or log in** to your account.
2. **Add your subscriptions** (e.g. Netflix, Spotify), including price, renewal date, and category.
3. The system **tracks your subscriptions** and can **send reminders** before a renewal.
4. **Edit or delete** subscriptions as your needs change.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Background Jobs / Scheduling:** QStash (by Upstash)
- **Environment management:** dotenv

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/subscription-tracker.git
cd subscription-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your values (MongoDB URI, JWT secret, QStash credentials, etc).

### 4. Start the server

```bash
npm run dev
```

### 5. (If using local QStash) Start QStash

```bash
npx @upstash/qstash-cli dev
```

---

## API Endpoints (examples)

- `POST /api/v1/auth/sign-up` – Register a new user
- `POST /api/v1/auth/sign-in` – Log in
- `POST /api/v1/subscriptions` – Add a new subscription (auth required)
- `GET /api/v1/subscriptions` – List all subscriptions (auth required)
- `PATCH /api/v1/subscriptions/:id` – Edit a subscription (auth required)
- `DELETE /api/v1/subscriptions/:id` – Delete a subscription (auth required)

---

## Running the Test Script

See [`test.js`](./test.js) for an automated integration test that checks all major features.

---

## License

MIT

---

**Made with ❤️ for anyone who forgets about their monthly subscriptions!**
