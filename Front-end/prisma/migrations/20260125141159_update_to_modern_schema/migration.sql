-- Safe migration: Rename tables and update structure WITHOUT data loss

-- Step 1: Rename existing tables to new snake_case names
ALTER TABLE "User" RENAME TO "users";
ALTER TABLE "Brand" RENAME TO "brands";
ALTER TABLE "Category" RENAME TO "categories";
ALTER TABLE "Product" RENAME TO "products";
ALTER TABLE "ProductImage" RENAME TO "product_images";

-- Step 2: Add indexes for better performance
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");
CREATE INDEX "products_brandId_idx" ON "products"("brandId");
CREATE INDEX "products_ownerId_idx" ON "products"("ownerId");
CREATE INDEX "products_createdAt_idx" ON "products"("createdAt");
CREATE INDEX "product_images_productId_idx" ON "product_images"("productId");

-- Step 3: Drop old foreign key constraints
ALTER TABLE "products" DROP CONSTRAINT "Product_categoryId_fkey";
ALTER TABLE "products" DROP CONSTRAINT "Product_brandId_fkey";
ALTER TABLE "products" DROP CONSTRAINT "Product_ownerId_fkey";
ALTER TABLE "product_images" DROP CONSTRAINT "ProductImage_productId_fkey";

-- Step 4: Add new foreign key constraints with referential actions
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" 
    FOREIGN KEY ("categoryId") REFERENCES "categories"("id") 
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "products" ADD CONSTRAINT "products_brandId_fkey" 
    FOREIGN KEY ("brandId") REFERENCES "brands"("id") 
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "products" ADD CONSTRAINT "products_ownerId_fkey" 
    FOREIGN KEY ("ownerId") REFERENCES "users"("id") 
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" 
    FOREIGN KEY ("productId") REFERENCES "products"("id") 
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 5: Handle Wishlist migration (preserve existing wishlist data)
-- Create new wishlist_items table
CREATE TABLE "wishlist_items" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wishlist_items_pkey" PRIMARY KEY ("id")
);

-- Migrate data from old Wishlist structure to new WishlistItem structure
-- Copy data from the implicit many-to-many table _ProductToWishlist
INSERT INTO "wishlist_items" ("userId", "productId", "createdAt")
SELECT 
    w."userId",
    pt."A" as "productId",
    CURRENT_TIMESTAMP
FROM "Wishlist" w
INNER JOIN "_ProductToWishlist" pt ON pt."B" = w."id";

-- Add indexes and constraints for wishlist_items
CREATE INDEX "wishlist_items_userId_idx" ON "wishlist_items"("userId");
CREATE INDEX "wishlist_items_productId_idx" ON "wishlist_items"("productId");
CREATE UNIQUE INDEX "wishlist_items_userId_productId_key" ON "wishlist_items"("userId", "productId");

ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "users"("id") 
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_productId_fkey" 
    FOREIGN KEY ("productId") REFERENCES "products"("id") 
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 6: Drop old wishlist tables (data already migrated)
DROP TABLE "_ProductToWishlist";
DROP TABLE "Wishlist";
