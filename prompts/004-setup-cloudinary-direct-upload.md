<objective>
Implement direct Cloudinary uploads from the browser, bypassing the Express backend.

Replace the current server-side image upload flow (Express multer -> Cloudinary) with client-side direct uploads using Cloudinary's Upload Widget or signed uploads.
</objective>

<context>
You are migrating a tech store application from Express backend to Next.js full-stack.

Current Express image handling:
- `Back-end/src/controllers/upload.controller.ts` - uploadProfileImage, uploadProductImages, deleteProductImages
- `Back-end/src/utils/cloudinary.ts` - uploadToCloudinary, deleteFromCloudinary utilities
- Uses multer for multipart form handling, uploads to temp directory, then to Cloudinary

Current frontend components:
- `Front-end/src/app/components/product/upload-images.tsx` - Product image upload
- `Front-end/src/app/components/profile/upload-form.tsx` - Profile image upload
- `Front-end/src/app/components/product/manage-images.tsx` - Image management/deletion

Current action (`Front-end/src/app/lib/actions/product.ts`):
- `uploadImages` - Sends FormData to Express backend

Database:
- Image model: id, url, productId (relation to Product)
- User model: has `image` field for profile picture

Tech stack:
- Next.js App Router
- Cloudinary (already used in Express)
- Prisma ORM

Read `CLAUDE.md` in the project root for any project-specific conventions.
</context>

<requirements>
1. Set up Cloudinary configuration:
   - Create `./Front-end/src/app/lib/config/cloudinary.ts` for Cloudinary SDK setup
   - Document env vars: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

2. Create upload signature endpoint:
   - `./Front-end/src/app/api/cloudinary/signature/route.ts`
   - Generate signed upload parameters for authenticated users
   - Include upload preset, folder, and timestamp
   - Validate user authentication before providing signature

3. Create client-side upload utilities:
   - `./Front-end/src/app/lib/cloudinary/upload.ts`
   - Function to upload single file directly to Cloudinary
   - Function to upload multiple files
   - Use signed uploads for security

4. Create server actions for database updates:
   - `./Front-end/src/app/lib/actions/images.ts`
   - `saveProductImages(productId: string, imageUrls: string[])` - Save uploaded URLs to database
   - `deleteProductImages(productId: string, imageUrls: string[])` - Delete from Cloudinary and database
   - `updateProfileImage(imageUrl: string)` - Update user's profile image

5. Update upload components:
   - `./Front-end/src/app/components/product/upload-images.tsx`:
     - Get signature from API
     - Upload directly to Cloudinary
     - Call server action to save URLs to database
   - `./Front-end/src/app/components/profile/upload-form.tsx`:
     - Similar flow for profile images
     - Delete old image from Cloudinary when replacing

6. Update image deletion:
   - `./Front-end/src/app/components/product/manage-images.tsx`:
     - Call server action that deletes from both Cloudinary and database

7. Handle Cloudinary folder structure:
   - Profile images: `Images/profiles/`
   - Product images: `Images/{brandName}/`
</requirements>

<implementation>
Signed upload flow:
1. Client requests signature from `/api/cloudinary/signature`
2. Server validates auth, generates signature with timestamp and params
3. Client uploads directly to `https://api.cloudinary.com/v1_1/{cloud_name}/image/upload`
4. Client receives response with secure_url
5. Client calls server action to save URL to database

Cloudinary signature generation:
```typescript
import { v2 as cloudinary } from "cloudinary";

const timestamp = Math.round(new Date().getTime() / 1000);
const signature = cloudinary.utils.api_sign_request(
  { timestamp, folder, upload_preset },
  process.env.CLOUDINARY_API_SECRET
);
```

Delete from Cloudinary server-side:
```typescript
import { v2 as cloudinary } from "cloudinary";

// Extract public_id from URL: Images/BrandName/filename
const publicId = url.substring(url.indexOf("Images/"), url.lastIndexOf("."));
await cloudinary.uploader.destroy(publicId);
```
</implementation>

<output>
Create/modify these files:
- `./Front-end/src/app/lib/config/cloudinary.ts` - Cloudinary SDK configuration
- `./Front-end/src/app/api/cloudinary/signature/route.ts` - Signature endpoint
- `./Front-end/src/app/lib/cloudinary/upload.ts` - Client upload utilities
- `./Front-end/src/app/lib/actions/images.ts` - Server actions for database operations
- `./Front-end/src/app/components/product/upload-images.tsx` - Update for direct upload
- `./Front-end/src/app/components/profile/upload-form.tsx` - Update for direct upload
- `./Front-end/src/app/components/product/manage-images.tsx` - Update deletion logic
- `./Front-end/.env.example` - Add Cloudinary env vars
</output>

<verification>
Before declaring complete, verify:
1. Signature endpoint requires authentication
2. Upload utilities handle errors gracefully
3. Image URLs are saved to database after successful upload
4. Deleted images are removed from both Cloudinary and database
5. Profile image replacement deletes old image
6. Upload progress can be tracked in UI
7. No remaining calls to Express upload endpoints
</verification>

<success_criteria>
- Users can upload product images directly to Cloudinary
- Users can upload profile images directly to Cloudinary
- Images are properly associated with products in database
- Old images are cleaned up when deleted or replaced
- Upload works without Express backend running
- Uploads are secure (authenticated, signed)
</success_criteria>
