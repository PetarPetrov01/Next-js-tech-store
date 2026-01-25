<objective>
Migrate product CRUD operations from Express backend calls to direct Prisma server actions.

Replace the current server actions that call the Express backend (`Front-end/src/app/lib/actions/product.ts`) with server actions that use Prisma directly.
</objective>

<context>
You are migrating a tech store application from Express backend to Next.js full-stack.

Current Express product implementation:
- `Back-end/src/controllers/product.controller.ts` - uploadProduct, editProduct, deleteProduct
- `Back-end/src/services/productService.ts` - Business logic for product operations

Current frontend product actions (`Front-end/src/app/lib/actions/product.ts`):
- `postProduct` - Creates or updates product via Express API
- `editProduct` - Wrapper for postProduct with productId
- `deleteProduct` - Deletes product via Express API
- `uploadImages` - Uploads images to Express API (will be handled separately)

Already migrated (direct Prisma, do not modify):
- `Front-end/src/app/lib/data/product.ts` - getProducts, getProduct, getProductImages

Database models (Prisma):
- Product: id, name, model, description, price, quantity, categoryId, brandId, ownerId, images relation
- Category: id, name
- Brand: id, name
- Image: id, url, productId

Tech stack:
- Next.js App Router with server actions
- Prisma ORM (configured at `Front-end/src/app/lib/config/db-config.ts`)
- NextAuth.js for authentication (from prompt 001)

Read `CLAUDE.md` in the project root for any project-specific conventions.
</context>

<requirements>
1. Update `./Front-end/src/app/lib/actions/product.ts` with direct Prisma operations:

2. Implement `createProduct` server action:
   - Validate user is authenticated via NextAuth session
   - Create product with Prisma including: name, model, description, price, quantity, categoryId, brandId
   - Set ownerId to authenticated user's id
   - Return created product with category and brand names populated
   - Handle Prisma validation errors

3. Implement `updateProduct` server action:
   - Validate user is authenticated
   - Validate user owns the product (ownerId matches session user)
   - Update product fields via Prisma
   - Return updated product with populated relations
   - Handle: product not found, unauthorized, validation errors

4. Implement `deleteProduct` server action:
   - Validate user is authenticated
   - Validate user owns the product
   - Delete product and cascade delete related images
   - Handle: product not found, unauthorized

5. Add revalidation:
   - Revalidate `/products` path after create/update/delete
   - Revalidate `/products/[id]` path after update/delete

6. Maintain existing return type structure:
   - `{ error: FormattedError | null; result: Product | null }`
   - Use existing `formatError` utility

7. Remove image upload logic from this file (handled separately in prompt 004)
</requirements>

<implementation>
Authentication pattern:
```typescript
import { auth } from "@/auth";

const session = await auth();
if (!session?.user?.id) {
  return { error: formatError({ message: "Unauthorized" }), result: null };
}
```

Ownership validation:
```typescript
const product = await prisma.product.findUnique({ where: { id: productId } });
if (product?.ownerId !== session.user.id) {
  return { error: formatError({ message: "Unauthorized" }), result: null };
}
```

Use Prisma transactions where appropriate for data integrity.
</implementation>

<output>
Modify these files:
- `./Front-end/src/app/lib/actions/product.ts` - Replace API calls with Prisma operations

Do NOT modify:
- `./Front-end/src/app/lib/data/product.ts` - Already uses direct Prisma
</output>

<verification>
Before declaring complete, verify:
1. All server actions are marked with "use server"
2. Authentication check exists in each mutation action
3. Ownership validation prevents unauthorized modifications
4. Return types match existing `FormattedError` pattern
5. revalidatePath is called after mutations
6. No remaining fetch calls to Express backend in this file
</verification>

<success_criteria>
- Authenticated users can create products
- Users can only update/delete their own products
- Product list refreshes after mutations
- Error messages display correctly on frontend
- No Express backend calls remain for product CRUD
</success_criteria>
