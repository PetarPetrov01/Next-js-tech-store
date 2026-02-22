# Tech Store - Project Context for Claude

## Project Overview

A full-stack e-commerce application for tech products. Currently undergoing migration from a separate Express.js backend to Next.js API routes/server actions.

## Architecture

```
Next-js-tech-store/
├── Front-end/              # Next.js 16 application (App Router)
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/auth/   # NextAuth.js API route
│   │   │   ├── components/ # React components
│   │   │   ├── lib/        # Server actions, data fetching, utilities
│   │   │   │   ├── actions/  # Server actions (auth.ts, product.ts)
│   │   │   │   ├── data/     # Data fetching functions
│   │   │   │   └── config/   # Database config
│   │   │   ├── store/      # Zustand store (cart)
│   │   │   └── [routes]/   # Page routes
│   │   ├── contexts/       # React contexts (AuthProvider)
│   │   └── auth.ts         # NextAuth.js configuration
│   └── prisma/
│       └── schema.prisma   # Database schema
│
└── Back-end/               # Express.js server (BEING MIGRATED)
    └── src/
        ├── routes/         # Express routers
        ├── controllers/    # Route handlers
        ├── services/       # Business logic
        ├── middlewares/    # Auth guards, validation
        └── utils/          # Cloudinary, JWT helpers
```

## Tech Stack

### Front-end (Next.js)
- **Framework**: Next.js 16 with App Router
- **React**: 18.2.0
- **Styling**: TailwindCSS 4, MUI components
- **State Management**: Zustand (cart), React Context (auth session)
- **Forms**: React Hook Form + Zod validation
- **Auth**: NextAuth.js v5 beta (credentials + Google OAuth)
- **Database**: Prisma ORM with PostgreSQL
- **UI Components**: Swiper, React Icons, Heroicons

### Back-end (Express - Legacy)
- **Framework**: Express.js 4
- **Auth**: JWT with cookie-based sessions
- **File Uploads**: Multer + Cloudinary
- **Validation**: Zod + zod-express

## Database Schema (Prisma)

| Model | Description |
|-------|-------------|
| User | User accounts with OAuth support |
| Product | Tech products with category, brand, owner |
| Brand | Product brands |
| Category | Product categories |
| ProductImage | Product images (Cloudinary URLs) |
| WishlistItem | User wishlists |

## Current Migration Status

### Completed
- [x] NextAuth.js setup with credentials + Google OAuth
- [x] Prisma schema moved to Front-end
- [x] Auth server actions (login, register, logout, checkEmail, updateUsername, getProfile)
- [x] Product data fetching (getProducts, getProduct) via Prisma
- [x] Category data fetching via Prisma

### In Progress / Pending
- [ ] Product mutations (create, edit, delete) - still calling Express API
- [ ] Image upload/delete (direct Cloudinary upload from client)
- [ ] Brands API endpoints
- [ ] Profile image upload

### Deferred
- Wishlist functionality (not in current migration scope)

## Express API Endpoints (To Migrate)

### Products `/api/products`
| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| GET | `/` | Get all products | ✅ Migrated to Prisma |
| GET | `/:id` | Get product by ID | ✅ Migrated to Prisma |
| GET | `/categories` | Get categories | ✅ Migrated to Prisma |
| GET | `/:id/images` | Get product images (auth) | ⏳ Pending |
| POST | `/upload` | Create product (auth) | ⏳ Pending |
| POST | `/category` | Create category (auth) | ⏳ Pending |
| POST | `/:id/images` | Upload images (auth) | ⏳ Pending |
| PUT | `/:id/edit` | Edit product (auth) | ⏳ Pending |
| DELETE | `/:id` | Delete product (auth) | ⏳ Pending |
| DELETE | `/:id/images` | Delete images (auth) | ⏳ Pending |

### Brands `/api/brands`
| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| GET | `/` | Get all brands | ⏳ Pending |
| GET | `/sorted` | Get sorted brands | ⏳ Pending |
| POST | `/` | Create brand | ⏳ Pending |

### Upload `/api/upload`
| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| POST | `/image` | Upload profile image (auth) | ⏳ Pending |

### Auth `/api/auth`
All auth endpoints migrated to NextAuth.js + server actions.

## Key Files Reference

### Configuration
- `Front-end/src/auth.ts` - NextAuth.js configuration
- `Front-end/prisma/schema.prisma` - Database schema
- `Front-end/.env.example` - Environment variables template
- `Front-end/prisma.config.mjs` - Prisma configuration

### Server Actions (Front-end)
- `src/app/lib/actions/auth.ts` - Auth actions (login, register, etc.)
- `src/app/lib/actions/product.ts` - Product actions (still uses Express)
- `src/app/lib/data/product.ts` - Product data fetching (uses Prisma)
- `src/app/lib/data/category.ts` - Category data fetching

### State Management
- `src/app/store/cart.ts` - Zustand cart store
- `src/contexts/AuthProvider.tsx` - Auth session provider

### Backend Services (for migration reference)
- `Back-end/src/services/productService.ts` - Product business logic
- `Back-end/src/services/brandService.ts` - Brand business logic
- `Back-end/src/utils/cloudinary.ts` - Cloudinary utilities (deletion logic)

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth.js
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Cloudinary - Client-side (for uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_PRESET=""        # Unsigned upload preset

# Cloudinary - Server-side (for deletions only)
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## Development Commands

```bash
# Front-end
cd Front-end
npm run dev        # Start Next.js dev server (port 3000)
npm run build      # Build for production
npx prisma studio  # Open Prisma Studio
npx prisma migrate dev  # Run migrations

# Back-end (legacy)
cd Back-end
npm run dev        # Start Express dev server (port 3001)
```

## Migration Guidelines

### Creating Server Actions
1. Place in `src/app/lib/actions/` with `"use server"` directive
2. Use `auth()` from `@/auth` to get current session
3. Use `prisma` from `@/app/lib/config/db-config`
4. Return `{ error: FormattedError | null, result: T | null }` pattern

### Creating API Routes (when needed for file uploads)
1. Place in `src/app/api/[endpoint]/route.ts`
2. Export async functions: `GET`, `POST`, `PUT`, `DELETE`
3. Use NextRequest/NextResponse from `next/server`
4. Get session with `auth()` for protected routes

### Cloudinary Integration (Direct Client Upload)
- Upload images directly from client to Cloudinary (no server intermediary)
- Use unsigned upload preset configured in Cloudinary dashboard
- Store resulting URLs in database via server actions
- Server-side Cloudinary SDK only needed for deletions

```typescript
// Client-side upload pattern
const uploadToCloudinary = async (file: File, folder: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);
  formData.append('folder', folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  return (await res.json()).secure_url;
};
```

## Code Patterns

### Protected Server Action
```typescript
"use server";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/config/db-config";

export async function protectedAction(data: SomeType) {
  const session = await auth();
  if (!session?.user) {
    return { error: { message: "Not authenticated" }, result: null };
  }

  // ... business logic with prisma
}
```

### Error Handling Pattern
```typescript
try {
  // ... operation
  return { error: null, result: data };
} catch (error) {
  console.error("Operation error:", error);
  return { error: { message: "Operation failed" }, result: null };
}
```
