<objective>
Migrate Express authentication to NextAuth.js (Auth.js) in the Next.js frontend.

Replace the current server actions that call the Express backend (`Front-end/src/app/lib/actions/auth.ts`) with NextAuth.js configuration that handles authentication directly via Prisma.

This enables the frontend to be fully self-contained without relying on the Express backend for auth.
</objective>

<context>
You are migrating a tech store application from Express backend to Next.js full-stack.

Current Express auth implementation:
- `Back-end/src/services/authService.ts` - Login/register with bcrypt password hashing, JWT signing
- `Back-end/src/controllers/auth.controller.ts` - Login, register, logout, validate, getProfile, updateUsername, checkEmail
- JWT tokens stored in httpOnly cookies with 7-day expiration

Current frontend auth actions (`Front-end/src/app/lib/actions/auth.ts`):
- Calls Express backend at `http://localhost:3001/api/auth/*`
- Handles login, register, checkEmail

Database: Prisma with User model (id, email, firstName, lastName, username, password, image)

Tech stack:
- Next.js App Router
- Prisma ORM (already configured at `Front-end/src/app/lib/config/db-config.ts`)
- TypeScript

Read `CLAUDE.md` in the project root for any project-specific conventions.
</context>

<requirements>
1. Install and configure NextAuth.js v5 (Auth.js) with:
   - Credentials provider for email/password login (matching current Express behavior)
   - Google OAuth provider

2. Create NextAuth configuration:
   - `./Front-end/src/auth.ts` - Main NextAuth config
   - `./Front-end/src/app/api/auth/[...nextauth]/route.ts` - API route handler

3. Implement Credentials provider that:
   - Validates email/password against Prisma User table
   - Uses bcrypt for password comparison (matching Express implementation)
   - Returns user object without password field

4. Configure Google OAuth provider:
   - Handle account linking for existing users
   - Create new user if email doesn't exist

5. Update session handling:
   - Include user id, email, username, and image in session
   - Use JWT strategy with 7-day expiration (matching Express)

6. Create new server actions in `./Front-end/src/app/lib/actions/auth.ts`:
   - `signIn` - Wrapper around NextAuth signIn
   - `signOut` - Wrapper around NextAuth signOut
   - `registerUser` - Create user via Prisma, then sign in
   - `checkEmail` - Check if email exists (for registration validation)
   - `updateUsername` - Update user's username
   - `getProfile` - Get current user's profile

7. Create auth middleware:
   - `./Front-end/src/middleware.ts` - Protect routes that require authentication
   - Protected routes: `/profile`, `/products/post`, `/products/[id]/edit`, `/products/[id]/images`

8. Add environment variables template:
   - Document required env vars: NEXTAUTH_SECRET, NEXTAUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
</requirements>

<implementation>
Follow NextAuth.js v5 patterns:
- Use `auth()` function for server-side session access
- Use `useSession()` hook for client-side session access
- Separate auth config from route handler for edge compatibility

Password handling:
- Use bcrypt with salt rounds of 10 (matching Express)
- Never expose password in session or responses

Error handling:
- Return structured errors matching current `FormattedError` type
- Handle: invalid credentials, email already exists, user not found
</implementation>

<output>
Create/modify these files:
- `./Front-end/src/auth.ts` - NextAuth configuration
- `./Front-end/src/app/api/auth/[...nextauth]/route.ts` - Route handler
- `./Front-end/src/app/lib/actions/auth.ts` - Replace with new server actions
- `./Front-end/src/middleware.ts` - Route protection
- `./Front-end/.env.example` - Environment variables template

Update package.json dependencies via npm install.
</output>

<verification>
Before declaring complete, verify:
1. Run `npm install` completes without errors
2. NextAuth route handler exports GET and POST
3. Credentials provider properly hashes and compares passwords
4. Session includes user id, email, username, image
5. Protected routes redirect to login when unauthenticated
6. All server actions are marked with "use server"
</verification>

<success_criteria>
- Users can log in with email/password
- Users can register new accounts
- Users can log in with Google OAuth
- Session persists across page refreshes
- Protected routes are inaccessible without authentication
- No calls to Express backend for auth operations
</success_criteria>
