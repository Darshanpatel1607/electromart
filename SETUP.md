# ElectroMart SaaS Platform - Setup Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Git
- Docker & Docker Compose (optional, for containerized setup)

## Quick Start

### 1. Clone and Setup Repository

```bash
git clone https://github.com/Darshanpatel1607/electromart.git
cd electromart
git checkout dev/saas-platform
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials (see Environment Variables section)

# Run database migrations
npm run migrate

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Update .env.local with API endpoint

# Start development server
npm run dev
```

### 4. Database Setup

```bash
cd ../database

# Create PostgreSQL database
createdb electromart_dev

# Run migrations
psql electromart_dev < schema/users.sql
psql electromart_dev < schema/contacts.sql
psql electromart_dev < schema/followups.sql
psql electromart_dev < schema/content_events.sql
psql electromart_dev < schema/analytics.sql

# Optional: Seed with sample data
psql electromart_dev < seeds/sample-data.sql
```

## Environment Variables

### Backend (.env)

```env
# Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/electromart_dev
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRY=7d

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@electromart.com

# CORS
CORS_ORIGIN=http://localhost:3000

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=electromart-uploads

# Logging
LOG_LEVEL=debug
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=ElectroMart
NEXT_PUBLIC_APP_URL=http://localhost:3000

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## Docker Setup (Alternative)

```bash
# Build and run all services
docker-compose up -d

# Run migrations
docker-compose exec backend npm run migrate

# Access applications
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

## Verification

After setup, verify everything is working:

### Backend Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Frontend Access

Open http://localhost:3000 and sign up for a new account.

### Database Check

```bash
psql electromart_dev
\dt  -- List all tables
```

## Development Commands

### Backend
```bash
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run migrate      # Run migrations
npm run seed         # Seed database
npm run test         # Run tests
npm run lint         # Lint code
```

### Frontend
```bash
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # Type checking
npm run lint         # Lint code
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues

- Ensure PostgreSQL is running: `pg_isready`
- Check credentials in .env file
- Verify database exists: `psql -l | grep electromart`

### npm install Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Review the [API Documentation](./docs/API.md)
2. Check [Database Schema](./docs/DATABASE.md) for data structure
3. Start building features!

## Support

For issues or questions:
- Check existing GitHub issues
- Create a new issue with detailed description
- Join our Discord community (link coming soon)
