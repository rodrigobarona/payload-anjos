# Project Setup & Installation

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Version 18.20.2 or higher, or 20.9.0+
- **pnpm**: Preferred package manager (or npm/yarn)
- **MongoDB**: Local instance or MongoDB Atlas account
- **Git**: For version control

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Mandala-Software-House/payload-ecommerce-template.git
cd payload-ecommerce-template
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Configure the following environment variables in your `.env` file:

```env
# Database
DATABASE_URI=mongodb://localhost:27017/payload-ecommerce

# Payload Configuration
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# S3 Storage (AWS or compatible)
S3_BUCKET=your-bucket-name
S3_ENDPOINT=your-s3-endpoint
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key

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

| Variable                 | Description                                | Example                                       |
| ------------------------ | ------------------------------------------ | --------------------------------------------- |
| `DATABASE_URI`           | MongoDB connection string                  | `mongodb://localhost:27017/payload-ecommerce` |
| `PAYLOAD_SECRET`         | Secret key for Payload (min 32 characters) | `your-super-secret-key-here-32-chars`         |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of your application             | `http://localhost:3000`                       |

### Storage Configuration

For file uploads, configure S3-compatible storage:

| Variable               | Description     | Required |
| ---------------------- | --------------- | -------- |
| `S3_BUCKET`            | S3 bucket name  | Yes      |
| `S3_ENDPOINT`          | S3 endpoint URL | Yes      |
| `S3_ACCESS_KEY_ID`     | S3 access key   | Yes      |
| `S3_SECRET_ACCESS_KEY` | S3 secret key   | Yes      |

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

## Database Setup

### Local MongoDB

1. Install MongoDB locally or use Docker:

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or using MongoDB Atlas (cloud)
# Get connection string from MongoDB Atlas dashboard
```

2. Update `DATABASE_URI` in your `.env` file

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `DATABASE_URI` with your Atlas connection string

## S3 Storage Setup

### AWS S3

1. Create an S3 bucket in AWS
2. Create IAM user with S3 permissions
3. Get access keys
4. Configure environment variables

### Cloudflare R2 (Alternative)

```env
S3_BUCKET=your-r2-bucket
S3_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your-r2-access-key
S3_SECRET_ACCESS_KEY=your-r2-secret-key
```

## First-Time Setup

### 1. Create Admin User

When you first visit `/admin`, you'll be prompted to create an administrator account:

1. Navigate to http://localhost:3000/admin
2. Fill in admin user details
3. Complete setup

### 2. Configure Shop Settings

After admin setup, configure your shop:

1. Go to **Shop Settings** → **General**
2. Set available currencies
3. Configure currency exchange rates
4. Enable/disable OAuth if needed

### 3. Set Up Payment Methods

Configure payment gateways in **Payments Settings**:

1. Choose primary paywall (Stripe, Autopay, or Przelewy24)
2. Add API keys for chosen payment provider
3. Configure webhook endpoints

### 4. Configure Shipping

Set up shipping options in **Shop Settings**:

1. Configure InPost courier settings
2. Set up pickup points
3. Define shipping costs and zones

## Development Environment

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Troubleshooting Setup Issues

### Common Issues

#### 1. Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

#### 2. MongoDB Connection Issues

- Ensure MongoDB is running
- Check connection string format
- Verify network access (for Atlas)

#### 3. S3 Upload Issues

- Verify S3 credentials
- Check bucket permissions
- Ensure CORS is configured

#### 4. Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Environment Validation

To validate your environment setup:

```bash
# Check Node.js version
node --version  # Should be 18.20.2+ or 20.9.0+

# Check pnpm version
pnpm --version

# Test MongoDB connection
mongosh $DATABASE_URI

# Validate environment variables
pnpm payload --help
```

## Next Steps

After successful setup:

1. **Explore the Admin Panel**: Visit `/admin` to familiarize yourself with the CMS
2. **Review the Architecture**: Read [Architecture Overview](./02-architecture.md)
3. **Understand Collections**: Check [Database Schema & Collections](./03-collections.md)
4. **Customize Settings**: Configure [Global Settings](./04-globals.md)

## Production Considerations

For production deployment:

1. **Secure Environment Variables**: Use secure secrets management
2. **Database Security**: Configure MongoDB authentication and SSL
3. **S3 Security**: Implement proper IAM policies
4. **SSL/TLS**: Configure HTTPS
5. **Monitoring**: Set up application monitoring
6. **Backups**: Implement regular database backups

See [Deployment Guide](./09-deployment.md) for detailed production setup instructions.
