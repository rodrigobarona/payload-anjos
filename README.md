# Payload Ecommerce Template

> A complete, production-ready ecommerce platform built with PayloadCMS 3.47, Next.js 15, and TypeScript. Features advanced product management, multi-currency support, integrated payments, and comprehensive shipping solutions.

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://ecommerce.mandala.sh/en)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![PayloadCMS](https://img.shields.io/badge/PayloadCMS-3.47-red)](https://payloadcms.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)

## 🌐 Live Demo

Experience the template in action: **[https://ecommerce.mandala.sh/en](https://ecommerce.mandala.sh/en)**

## 📖 Comprehensive Documentation

This template includes extensive documentation covering every aspect of the system:

- **[📚 Complete Documentation Hub](.docs/README.md)** - Start here for full documentation
- **[🔧 Setup & Installation](.docs/01-setup.md)** - Quick start guide
- **[🏗️ Architecture Overview](.docs/02-architecture.md)** - System design and patterns
- **[🛒 Ecommerce Features](.docs/06-ecommerce.md)** - Product management, cart, payments
- **[🎨 UI Components](.docs/07-ui-components.md)** - Design system and styling guide

## ✨ Key Features

### 🛒 **Advanced Ecommerce**

- **Product Variants** - Size, color, and custom variant management
- **Multi-Currency Support** - USD, EUR, GBP, PLN with real-time conversion
- **Stock Management** - Real-time inventory tracking with low-stock alerts
- **Shopping Cart** - Persistent cart with guest/user synchronization
- **Wishlist** - Save items for later with user accounts

### 💳 **Payment Integration**

- **Stripe** - Credit cards, digital wallets, international payments
- **Autopay** - Popular European payment method
- **Przelewy24** - Polish payment gateway integration
- **Multi-Gateway** - Switch between payment providers seamlessly

### 🚚 **Shipping Solutions**

- **InPost Integration** - Pickup points, courier delivery, COD
- **Dynamic Pricing** - Weight and value-based shipping calculations
- **Address Validation** - Real-time address verification
- **International Shipping** - Multi-country support with restrictions

### 👥 **Customer Experience**

- **User Accounts** - Profile management, order history, addresses
- **Guest Checkout** - Fast checkout without registration
- **Multi-Language** - English/Polish with easy language switching
- **SEO Optimized** - Meta tags, structured data, sitemaps

### 🎛️ **Admin Dashboard**

- **Analytics** - Revenue tracking, order metrics, product performance
- **Order Management** - Full order lifecycle with status tracking
- **Customer Management** - User profiles, order history, support
- **Content Management** - Pages, blogs, media library

## 🛠️ Technology Stack

### **Frontend**

- **[Next.js 15](https://nextjs.org)** - App Router, Server Components, SSG/SSR
- **[React 19](https://react.dev)** - Latest React with React Compiler
- **[TailwindCSS 4.x](https://tailwindcss.com)** - Utility-first styling
- **[Radix UI](https://radix-ui.com)** - Accessible component primitives
- **[Zustand](https://zustand-demo.pmnd.rs)** - State management
- **[next-intl](https://next-intl-docs.vercel.app)** - Internationalization

### **Backend & CMS**

- **[PayloadCMS 3.47](https://payloadcms.com)** - Headless CMS and admin panel
- **[MongoDB](https://mongodb.com)** - Database with Mongoose ODM
- **[AWS S3](https://aws.amazon.com/s3/)** - File storage (compatible with Cloudflare R2)

### **Development Tools**

- **[TypeScript](https://typescriptlang.org)** - Type safety throughout
- **[ESLint](https://eslint.org)** - Code linting with custom rules
- **[Prettier](https://prettier.io)** - Code formatting
- **[React Hook Form](https://react-hook-form.com)** - Form management
- **[Zod](https://zod.dev)** - Schema validation

## 📸 Screenshots

### Storefront

![Storefront](./public/storefront.png)

### Admin Dashboard

![Admin Dashboard](./public/admin-dashboard.png)

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **pnpm** (recommended) or npm
- **MongoDB** (local or Atlas)
- **S3-compatible storage** (AWS S3 or Cloudflare R2)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/payload-ecommerce-template.git
   cd payload-ecommerce-template
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration - see detailed setup guide
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Access your application**
   - **Storefront**: [http://localhost:3000](http://localhost:3000)
   - **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

> **⚠️ Important**: For complete setup instructions including database configuration, S3 setup, and payment gateway integration, see our **[detailed setup guide](.docs/01-setup.md)**.

## 📂 Project Structure

```
payload-ecommerce-template/
├── .docs/                     # 📚 Comprehensive documentation
├── src/
│   ├── app/                   # 🌐 Next.js App Router
│   │   ├── (frontend)/        # 🛒 Customer-facing pages
│   │   └── (payload)/         # ⚙️  Admin panel
│   ├── collections/           # 📊 PayloadCMS collections
│   │   └── (ecommerce)/       # 🛍️  Ecommerce-specific collections
│   ├── globals/               # 🌍 Global configurations
│   ├── components/            # 🧩 React components
│   │   ├── (ecommerce)/       # 🛒 Ecommerce components
│   │   └── ui/                # 🎨 UI component library
│   ├── stores/                # 🗄️  Zustand state stores
│   └── lib/                   # 🔧 Utilities and helpers
├── translations/              # 🌐 i18n translation files
└── .cursor/                   # 🎯 Cursor AI rules
```

## 🎯 Development Workflow

This template includes sophisticated development tools and guidelines:

- **[Cursor AI Rules](.cursor/rules/)** - AI-powered development assistance
- **[Development Guidelines](.docs/11-development.md)** - Coding standards and patterns
- **[API Reference](.docs/10-api-reference.md)** - Complete API documentation
- **[Troubleshooting Guide](.docs/12-troubleshooting.md)** - Common issues and solutions

## 🌍 Internationalization

Built-in support for multiple languages:

- **English** - Default language
- **Polish** - Full translation included
- **Extensible** - Easy to add more languages

## 🔧 Configuration

### Environment Variables

Essential variables (see [setup guide](.docs/01-setup.md) for complete list):

```env
# Database
MONGODB_URI=mongodb://localhost:27017/payload-ecommerce

# Payload
PAYLOAD_SECRET=your-super-secret-key

# S3 Storage
S3_ENDPOINT=https://s3.amazonaws.com
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=your-bucket-name

# Payment Gateways
STRIPE_SECRET_KEY=sk_test_...
AUTOPAY_SECRET_KEY=your-autopay-key
P24_MERCHANT_ID=your-p24-id
```

## 🚀 Deployment

Ready for production deployment on multiple platforms:

- **[Vercel](https://vercel.com)** - Recommended (see [deployment guide](.docs/09-deployment.md))
- **[Railway](https://railway.app)** - Database and app hosting
- **[DigitalOcean](https://digitalocean.com)** - VPS deployment
- **[AWS](https://aws.amazon.com)** - Full AWS stack

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines and:

1. Check the [issues](https://github.com/your-username/payload-ecommerce-template/issues)
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

- **Documentation**: [Complete docs](.docs/README.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/payload-ecommerce-template/issues)
- **Community**: [PayloadCMS Discord](https://discord.gg/payload)

## 🙏 Acknowledgments

Built with these amazing technologies:

- [PayloadCMS](https://payloadcms.com) - The best TypeScript headless CMS
- [Next.js](https://nextjs.org) - The React framework for production
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS framework
- [Radix UI](https://radix-ui.com) - Low-level UI primitives

---

**Ready to build your ecommerce empire?** 🚀 [Get started](.docs/01-setup.md) with the complete setup guide!
