# Calmwind Backend

Production-ready backend built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** following clean architectural patterns.

---

## 📁 Project Structure

```text
backend/
├── public/
│   └── temp/               # Temporary storage for file uploads via Multer
├── src/
│   ├── DB/
│   │   └── index.js        # MongoDB connection logic using Mongoose
│   ├── controllers/
│   │   ├── healthcheck.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js     # JWT token verification
│   │   ├── error.middleware.js    # Centralized API error handler
│   │   └── multer.middleware.js   # File upload handling (DiskStorage)
│   ├── models/
│   │   └── user.model.js          # User schema with bcrypt & JWT generation
│   ├── routes/
│   │   ├── healthcheck.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   ├── ApiError.js            # Standardized error class
│   │   ├── ApiResponse.js          # Standardized response format
│   │   ├── asyncHandler.js         # Promise-based controller wrapper
│   │   └── cloudinary.js           # Cloudinary media upload utility
│   ├── app.js             # Express app configuration & middleware pipeline
│   ├── constant.js        # Global constants (e.g. DB_NAME)
│   └── index.js           # Server entry point & DB connection init
├── .env                   # Environment variables (local)
├── .env.sample            # Sample environment variables
├── .gitignore
├── .prettierrc
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.sample` to `.env` and fill in your values:
```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

### 3. Start Development Server
```bash
npm run dev
```

---

## 🔌 API Endpoints

### Healthcheck
- `GET /api/v1/healthcheck` - Check server status and DB connection state

### User Authentication & Management
- `POST /api/v1/users/register` - Register a new user (supports avatar & coverImage files)
- `POST /api/v1/users/login` - User login (returns access & refresh tokens)
- `POST /api/v1/users/logout` - User logout (clears tokens and cookies, secured)
- `POST /api/v1/users/refresh-token` - Refresh expired access token
- `POST /api/v1/users/change-password` - Change account password (secured)
- `GET /api/v1/users/current-user` - Get current authenticated user (secured)
- `PATCH /api/v1/users/update-account` - Update full name & email (secured)
