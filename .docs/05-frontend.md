# Frontend Structure & Components

## Overview

The frontend is built with Next.js 15 using the App Router, React 19, and TailwindCSS. It follows a modern, component-based architecture with internationalization support and optimized performance.

## Next.js App Router Structure

```
src/app/
├── (frontend)/              # Public-facing routes
│   ├── [locale]/           # Internationalized routes
│   │   ├── (with-cart)/    # Routes with cart functionality
│   │   │   ├── account/    # Customer account pages
│   │   │   ├── cart/       # Shopping cart
│   │   │   ├── checkout/   # Checkout process
│   │   │   ├── product/    # Product pages
│   │   │   └── page.tsx    # Homepage (with cart)
│   │   ├── (without-cart)/ # Routes without cart
│   │   │   ├── admin/      # Admin redirect
│   │   │   └── posts/      # Blog posts
│   │   ├── layout.tsx      # Locale layout
│   │   └── not-found.tsx   # 404 page
│   ├── (sitemaps)/         # SEO sitemaps
│   ├── globals.css         # Global styles
│   └── not-found.tsx       # Global 404
└── (payload)/              # Admin panel routes
    └── admin/              # PayloadCMS admin
```

## Route Groups

### (with-cart) Routes

Pages that include cart functionality and user authentication:

- Homepage (`/`)
- Product pages (`/product/[slug]`)
- Account management (`/account/*`)
- Shopping cart (`/cart`)
- Checkout (`/checkout`)

### (without-cart) Routes

Content pages without ecommerce functionality:

- Blog posts (`/posts/[slug]`)
- Static pages
- Admin redirects

## Internationalization (i18n)

### Routing Configuration

**Location**: `src/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/product/[slug]': {
      en: '/product/[slug]',
      pl: '/produkt/[slug]'
    },
    '/posts/[slug]': {
      en: '/posts/[slug]',
      pl: '/posty/[slug]'
    },
    '/account': {
      en: '/account',
      pl: '/konto'
    }
  }
});
```

### Translation Files

**Location**: `translations/`

- `en.json` - English translations
- `pl.json` - Polish translations

**Example Structure**:

```json
{
  "common": {
    "add_to_cart": "Add to Cart",
    "price": "Price",
    "quantity": "Quantity"
  },
  "product": {
    "details": "Product Details",
    "specifications": "Specifications",
    "reviews": "Reviews"
  },
  "checkout": {
    "shipping_address": "Shipping Address",
    "payment_method": "Payment Method",
    "order_summary": "Order Summary"
  }
}
```

### Usage in Components

```typescript
import { useTranslations } from 'next-intl';

export function ProductCard() {
  const t = useTranslations('product');

  return (
    <div>
      <h3>{t('details')}</h3>
      <button>{t('add_to_cart')}</button>
    </div>
  );
}
```

## Component Architecture

### Component Organization

```
src/components/
├── (ecommerce)/            # Ecommerce-specific components
│   ├── Cart/
│   ├── ProductBreadcrumbs/
│   ├── QuantityInput/
│   ├── PriceClient/
│   └── ...
├── ui/                     # Base UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── heros/                  # Hero section variants
├── Logo/
├── Media/
├── RichText/
└── ...
```

### UI Component System

**Location**: `src/components/ui/`

Built with Radix UI primitives and styled with TailwindCSS:

```typescript
// Example: Button component
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Ecommerce Components

#### 1. Product Components

**ProductCard**: Display product in listings

```typescript
interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
  showQuickAdd?: boolean;
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  // Implementation
}
```

**ProductDetails**: Full product page

```typescript
interface ProductDetailsProps {
  product: Product;
  variant?: string;
}

export function ProductDetails({ product, variant }: ProductDetailsProps) {
  // Handles variants, pricing, add to cart
}
```

#### 2. Cart Components

**CartDrawer**: Slide-out cart

```typescript
export function CartDrawer() {
  const { items, isOpen, close } = useCartStore();
  // Implementation
}
```

**CartItem**: Individual cart item

```typescript
interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}
```

#### 3. Checkout Components

**CheckoutForm**: Multi-step checkout

```typescript
export function CheckoutForm() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  // Implementation
}
```

## State Management

### Zustand Stores

**Location**: `src/stores/`

#### Cart Store

```typescript
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  currency: Currency;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      currency: 'USD',
      addItem: (item) => {
        // Implementation
      },
      // Other methods
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, currency: state.currency }),
    }
  )
);
```

#### Currency Store

```typescript
interface CurrencyState {
  currency: Currency;
  availableCurrencies: Currency[];
  exchangeRates: Record<Currency, number>;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number, from: Currency) => number;
}
```

#### Wishlist Store

```typescript
interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}
```

## Data Fetching

### Server Components

Using Next.js Server Components for data fetching:

```typescript
// Product page
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

async function getProduct(slug: string): Promise<Product | null> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
  });

  return result.docs[0] || null;
}
```

### Client Components

Using SWR pattern for client-side data:

```typescript
import useSWR from 'swr';

export function ProductReviews({ productId }: { productId: string }) {
  const { data: reviews, error } = useSWR(
    `/api/products/${productId}/reviews`,
    fetcher
  );

  if (error) return <div>Failed to load reviews</div>;
  if (!reviews) return <div>Loading...</div>;

  return (
    <div>
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
```

## Styling System

### TailwindCSS Configuration

**Location**: `tailwind.config.ts`

```typescript
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Additional color definitions
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### CSS Variables

**Location**: `src/app/(frontend)/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* Additional variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Dark mode variables */
  }
}
```

## Content Blocks

### Block System

**Location**: `src/blocks/`

Content blocks allow flexible page layouts:

```typescript
// RenderBlocks component
export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.blockType) {
          case 'content':
            return <ContentBlock key={index} {...block} />;
          case 'mediaBlock':
            return <MediaBlock key={index} {...block} />;
          case 'carousel':
            return <CarouselBlock key={index} {...block} />;
          case 'callToAction':
            return <CallToActionBlock key={index} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
```

### Available Blocks

1. **Content Block**: Rich text content
2. **Media Block**: Images and videos
3. **Carousel Block**: Image/content carousel
4. **Call to Action Block**: CTA sections
5. **Form Block**: Contact forms
6. **Archive Block**: Post listings
7. **Accordion Block**: Collapsible content
8. **Hotspot Block**: Interactive product hotspots

## Performance Optimization

### Image Optimization

```typescript
import Image from 'next/image';

export function ProductImage({ media, alt, sizes }: ProductImageProps) {
  return (
    <Image
      src={media.url}
      alt={alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      className="rounded-lg"
      priority={false}
    />
  );
}
```

### Code Splitting

```typescript
// Dynamic imports for heavy components
const ProductReviews = dynamic(() => import('./ProductReviews'), {
  loading: () => <ReviewsSkeleton />,
  ssr: false,
});

const CheckoutForm = dynamic(() => import('./CheckoutForm'), {
  loading: () => <CheckoutSkeleton />,
});
```

### Lazy Loading

```typescript
import { Suspense } from 'react';

export function ProductPage() {
  return (
    <div>
      <ProductHeader />

      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails />
      </Suspense>

      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews />
      </Suspense>
    </div>
  );
}
```

## SEO Optimization

### Metadata Generation

```typescript
// Product page metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.meta?.title || product.title,
    description: product.meta?.description,
    openGraph: {
      title: product.title,
      description: product.meta?.description,
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  };
}
```

### Structured Data

```typescript
export function ProductStructuredData({ product }: { product: Product }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.images?.[0]?.url,
    "offers": {
      "@type": "Offer",
      "price": product.pricing?.[0]?.value,
      "priceCurrency": product.pricing?.[0]?.currency,
      "availability": product.stock > 0 ? "InStock" : "OutOfStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

## Error Handling

### Error Boundaries

```typescript
'use client';

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-8">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Loading States

```typescript
export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-200 rounded-lg mb-4" />
      <div className="h-8 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
      <div className="h-10 bg-gray-200 rounded w-32" />
    </div>
  );
}
```

## Testing

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    title: 'Test Product',
    price: 99.99,
    image: '/test-image.jpg',
  };

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });
});
```

This frontend architecture provides a solid foundation for building a modern, performant ecommerce experience with excellent SEO and user experience.
