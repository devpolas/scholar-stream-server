## 🧩 Server Setup & Routing

The Scholar Stream backend is built using **Express.js** with a clean middleware and routing architecture.

---

## 🚀 Application Entry Point

The server initializes an Express application and applies global middlewares before registering API routes.

### Key Middlewares

- `express.json()` – Parses incoming JSON payloads
- `cors()` – Enables Cross-Origin Resource Sharing
- `morgan("dev")` – HTTP request logger (development only)

---

## 🌐 Health Check & Test Routes

Root-level routes are provided to verify server availability:

```http
GET    /
POST   /
PATCH  /
PUT    /
DELETE /
```

## Response Example

```
{
"status": "success",
"message": "Hello from server!"
}
```

These routes are intended only for testing server connectivity.

## 📦 API Route Registration

```
All application routes are versioned and prefixed with:

/api/v1

Registered Routes
Route Description

/api/v1/users User management & roles
/api/v1/scholarships Scholarship CRUD operations
/api/v1/applications Scholarship applications
/api/v1/reviews Reviews & ratings
/api/v1/payments Stripe payment handling
```

## Features

```
GET /api/v1/scholarships?search=Masters&universityCountry=USA&subjectCategory=Engineering&sort=-applicationFees&page=2&limit=5
```

## 🧭 Routing Flow

```
Request
↓
Global Middlewares
↓
Route Logger
↓
API Routers
↓
Controller Logic
↓
Response
```

### Each router is responsible for:

```
Authentication

Role-based authorization

Business logic delegation to controllers

stripe payment gatewat
```

## 🔍 Request Logging

```
In development mode, HTTP requests are logged using Morgan:

if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
}

Additionally, a custom middleware logs all incoming route hits:

Hit application router: /api/v1/...

❌ Unhandled Routes

All unrecognized routes return a standardized 404 response:

ANY /\*splat

Response
{
"status": "fail",
"message": "can't find /unknown-route on this server"
}
```

## 🏗️ Architecture Principles

```
Versioned REST API (/api/v1)

Separation of concerns (routes → controllers → models)

Middleware-first design

Centralized authentication

Role-based authorization

Modular and scalable structure
```

## 🛡️ Environment Configuration

```
Environment variables are loaded using:

require("@dotenvx/dotenvx").config();

This allows secure configuration for:

Database connections

Firebase Admin SDK

Stripe keys

Server environment modes
```

## 📌 Summary

```
Express v5 based backend

Clean RESTful routing

Secure authentication flow

Stripe payment integration

Firebase-backed authorization

MongoDB with Mongoose
```
