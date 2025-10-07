# Echoo Backend Service

A **production-ready** backend service for a social media platform, built with **Node.js**, **Express**, **Typescript**, **PostgreSQL**, **Prisma ORM**, and **Redis**.
It provides APIs for authentication, user management, posts, comments, likes and profile photo uploads

## Features

- **Modular REST API** with Auth, User, Post, Comment and Like endpoints
- **JWT Authentication**: login, register, logout with token revocation, forgot/reset password
- **Cloudinary Integration** for profile image upload, optimization and cleanup
- **Swagger/OpenAPI documentation** auto-generated from Zod validation schemas
- **Redis caching** with paginated endpoints and targeted cache invalidation
- **Dockerized deployment** with a 'docker-compose' setup for backend + Redis

---

## Tech Stack

- **Backend:** Node.js, Express, Typescript
- **Database:** PostgreSQL + Prisma ORM
- **Cache:** Redis
- **File Storage:** Cloudinary
- **Documentation:** Swagger UI
- **Containerization:** Docker, docker-compose

---

## Installation (Local Development)

### 1. **Clone the Repository**

```bash
git clone https://github.com/bonaxl015/echoo-mobile-app.git
cd echoo-mobile-app
```

### 2. **Install Dependencies**

```bash
yarn install
```

### 3. **Environment Variables**

Create a `.env` file in the project root with:

```env
# App server
PORT=5051
NODE_ENV=development

# Database
DATABASE_URL=your_database_url

# Image cloud storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Authentication
JWT_SECRET=your_jwt_secret
TOKEN_EXPIRATION=your_jwt_token_expiration

# SMTP (Forgot password)
GMAIL_USER=your_gmail_user
GMAIL_PASS=your_gmail_password

# Frontend info for password reset url
FRONTEND_URL=your_frontend_url

# Redis
REDIS_URL=your_redis_url
```

## Running with Docker (Recommended)

`docker-compose.yml` will build and run **backend + Redis** in one command:

```bash
docker compose up --build
```

Backend will be available at:

```
http://localhost:5051
```

Swagger docs will be available at:

```
http://localhost:5051/docs
```

## Development Scripts

```bash
yarn lint       # Run ESLint checks
yarn format     # Format code with Prettier
yarn build      # Compile Typescript
yarn dev        # Run in development mode
yarn start      # Run compiled JS in production mode
```

## License

MIT
