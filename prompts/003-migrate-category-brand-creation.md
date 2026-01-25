<objective>
Add server actions for creating categories and brands directly via Prisma.

The GET operations for categories and brands are already migrated (`Front-end/src/app/lib/data/category.ts`). This prompt adds the CREATE operations.
</objective>

<context>
You are migrating a tech store application from Express backend to Next.js full-stack.

Current Express implementation:
- `Back-end/src/controllers/category.controller.ts` - createCategory
- `Back-end/src/controllers/brand.controller.ts` - createBrand
- Both handle Prisma P2002 error (unique constraint violation)

Already migrated (direct Prisma):
- `Front-end/src/app/lib/data/category.ts` - getCategories, getSortedBrands, getBrandsByCategory

Frontend components using these:
- `Front-end/src/app/components/product/dialogs/add-new-brand-dialog.tsx`
- `Front-end/src/app/components/product/dialogs/add-new-category-dialog.tsx`

Database models:
- Category: id (Int autoincrement), name (String unique)
- Brand: id (Int autoincrement), name (String unique)

Tech stack:
- Next.js App Router with server actions
- Prisma ORM
- NextAuth.js for authentication

Read `CLAUDE.md` in the project root for any project-specific conventions.
</context>

<requirements>
1. Create new file `./Front-end/src/app/lib/actions/category.ts`:

2. Implement `createCategory` server action:
   - Validate user is authenticated
   - Create category with provided name
   - Handle Prisma P2002 error: "This category already exists"
   - Return created category or error
   - Revalidate relevant paths

3. Implement `createBrand` server action:
   - Validate user is authenticated
   - Create brand with provided name
   - Handle Prisma P2002 error: "This brand already exists"
   - Return created brand or error
   - Revalidate relevant paths

4. Return type structure:
   ```typescript
   type ActionResult<T> = {
     error: { message: string } | null;
     result: T | null;
   }
   ```

5. Update the dialog components to use new server actions instead of any existing API calls.
</requirements>

<implementation>
Prisma error handling pattern:
```typescript
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

try {
  const category = await prisma.category.create({ data: { name } });
  return { error: null, result: category };
} catch (error) {
  if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
    return { error: { message: "This category already exists" }, result: null };
  }
  return { error: { message: "Failed to create category" }, result: null };
}
```

Revalidate paths that display categories/brands:
- `/products` (filter sidebar)
- `/products/post` (product form dropdowns)
</implementation>

<output>
Create/modify these files:
- `./Front-end/src/app/lib/actions/category.ts` - New file with createCategory and createBrand
- `./Front-end/src/app/components/product/dialogs/add-new-brand-dialog.tsx` - Update to use server action
- `./Front-end/src/app/components/product/dialogs/add-new-category-dialog.tsx` - Update to use server action
</output>

<verification>
Before declaring complete, verify:
1. Server actions are marked with "use server"
2. Authentication check prevents anonymous creation
3. Duplicate names return user-friendly error messages
4. Dialog components call server actions correctly
5. Category/brand lists refresh after creation
</verification>

<success_criteria>
- Authenticated users can create new categories
- Authenticated users can create new brands
- Duplicate names show appropriate error message
- New categories/brands appear in dropdowns without page refresh
- No Express backend calls for category/brand creation
</success_criteria>
