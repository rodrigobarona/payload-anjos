# Project Setup & Installation

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Version 18.20.2 or higher, or 20.9.0+
- **pnpm**: Preferred package manager (or npm/yarn)
- **Supabase Account**: For PostgreSQL database and storage
- **Git**: For version control

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/payload-ecommerce-template.git
cd payload-ecommerce-template
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Copy the Supabase environment template:

```bash
cp .env.supabase.template .env
```

Configure the following environment variables in your `.env` file:

```env
# Supabase Database (PostgreSQL)
DATABASE_URI=postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres

# Payload Configuration
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Supabase Storage (S3-Compatible)
SUPABASE_STORAGE_BUCKET=your-bucket-name
SUPABASE_STORAGE_ENDPOINT=https://your-project-ref.supabase.co/storage/v1/s3
SUPABASE_STORAGE_REGION=us-east-1
SUPABASE_STORAGE_ACCESS_KEY_ID=your-access-key
SUPABASE_STORAGE_SECRET_ACCESS_KEY=your-secret-key

# Optional: For production deployment
VERCEL_PROJECT_PRODUCTION_URL=your-production-url
```

### 4. Start Development Server

```bash
pnpm dev
```

Your application will be available at:

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## Detailed Environment Variables

### Required Variables

| Variable                 | Description                                | Example                                                       |
| ------------------------ | ------------------------------------------ | ------------------------------------------------------------- |
| `DATABASE_URI`           | Supabase PostgreSQL connection string      | `postgresql://postgres:pass@db.ref.supabase.co:5432/postgres` |
| `PAYLOAD_SECRET`         | Secret key for Payload (min 32 characters) | `your-super-secret-key-here-32-chars`                         |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of your application             | `http://localhost:3000`                                       |

### Supabase Storage Configuration

| Variable                             | Description                     | Required |
| ------------------------------------ | ------------------------------- | -------- |
| `SUPABASE_STORAGE_BUCKET`            | Supabase storage bucket name    | Yes      |
| `SUPABASE_STORAGE_ENDPOINT`          | Supabase S3-compatible endpoint | Yes      |
| `SUPABASE_STORAGE_ACCESS_KEY_ID`     | Supabase storage access key     | Yes      |
| `SUPABASE_STORAGE_SECRET_ACCESS_KEY` | Supabase storage secret key     | Yes      |

### Optional Variables

| Variable                        | Description                          | Default            |
| ------------------------------- | ------------------------------------ | ------------------ |
| `VERCEL_PROJECT_PRODUCTION_URL` | Production URL for Vercel deployment | -                  |
| `NODE_OPTIONS`                  | Node.js options                      | `--no-deprecation` |

## Development Scripts

The project includes several useful scripts:

```bash
# Development
pnpm dev                    # Start development server
pnpm dev:prod              # Build and start production server

# Building
pnpm build                 # Build for production
pnpm start                 # Start production server

# Code Quality
pnpm lint                  # Run ESLint
pnpm lint:fix              # Run ESLint with auto-fix

# Payload CMS
pnpm payload               # Access Payload CLI
pnpm generate:types        # Generate TypeScript types
pnpm generate:importmap    # Generate import map

# Utilities
pnpm knip                  # Find unused dependencies
pnpm reinstall             # Clean reinstall dependencies
```

## Supabase Setup

### 1. Create Supabase Project

1. Visit [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization and set project details
4. Wait for project initialization (2-3 minutes)

### 2. Database Configuration

1. Go to **Project Settings** → **Database**
2. Copy the **Connection String (URI)**
3. Replace `[password]` with your database password
4. Update `DATABASE_URI` in your `.env` file

### 3. Storage Setup

1. Go to **Storage** in your Supabase dashboard
2. Click **Create bucket**
3. Set bucket name (e.g., "media", "uploads")
4. Configure bucket permissions (public or private)

### 4. Storage API Keys

1. Go to **Project Settings** → **API**
2. Copy your **Project URL** and **API Keys**
3. Update storage environment variables in `.env`

### 5. Enable Row Level Security (RLS)

For production, enable RLS policies:

```sql
-- Enable RLS on auth tables if needed
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create policies for your collections
-- (PayloadCMS will handle most of this automatically)
```

## Development Environment

### Recommended VS Code Extensions

```

```
