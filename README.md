# Project Overview (Client)

- Project name: Pauline Tacik — Portfolio & Workshops
- Aim: Present the graphic design, illustration and printmaking work of Pauline Tacik, showcase projects and workshops, and provide an easy way for prospects to get in touch. Includes a small back-office to manage content (projects, workshops, users) without touching code.
- Target audience: Prospects, clients, partners, cultural organizations, and workshop participants.
- Current status: Production-ready portfolio with content management, image library integration, and authentication.
- Last updated: 2025-10-09 13:40

## Sitemap and Pages
- Home (/)
  - Highlights featured projects and workshops, brand statement, and navigation.
- Projects (/projects via components; details under /project/[slug])
  - Listing: Filtered projects with thumbnails and tags.
  - Detail: Each project has a dedicated page at /project/[slug] with images and metadata.
- Workshops (/workshops)
  - Listing: All workshops with filters.
  - Detail: Each workshop at /workshop/[slug] with description and media.
- About (/about)
  - Bio, practice, skills/services offered.
- Contact (/contact)
  - Contact form integrated with EmailJS (currently gated by a “feature in development” notice in UI).
- Legal pages
  - Privacy Policy (/privacy-policy)
  - Legal Notices (/legals)
- Authentication
  - Login (/login) — credential-based login for administrators.
- Backoffice
  - Admin Dashboard (/admin) — requires login.

## Backoffice (Admin)
- Access control: Protected by NextAuth (credentials provider) and middleware; redirects unauthenticated users to /login.
- Features (via AdminDashboard):
  - Manage projects: create, edit, delete via REST endpoints.
  - Manage workshops: create, edit, delete via REST endpoints.
  - Manage users: create list of admin users with roles (e.g., admin), passwords are hashed with bcrypt.
  - Manage media: Cloudinary image library integration with usage tracking and safe deletion (prevents deleting images in use).
- Quality of life: Logout and quick navigation back to the public site.

## Backend and Data
- Platform: Next.js App Router (Node.js runtime) with server actions and route handlers.
- Database: MongoDB (collections: users, projects, workshops). Connection via src/lib/mongodb.js.
- Auth: next-auth credentials provider with JWT. Password hashing with bcryptjs. Custom sign-in page at /login. Session data enriched with user id and role.
- APIs (selected):
  - /api/projects (GET, POST) and /api/projects/[id] (GET, PUT, DELETE)
  - /api/workshops (GET, POST) and /api/workshops/[id] (GET, PUT, DELETE)
  - /api/users (GET, POST) — lists/creates users (passwords never returned)
  - /api/images (GET) — lists Cloudinary images with usage across DB
  - /api/images/[filename] (DELETE) — safe delete by filename (blocked if in use)
  - /api/auth/[...nextauth] — NextAuth configuration for credentials login
- Media Storage: Cloudinary. Server utilities in src/lib/cloudinary.js. Scripts exist for migrations and testing.
- Email: EmailJS used client-side on /contact with public keys.

## Integrations and Services
- MongoDB — content storage for users, projects, workshops.
- Cloudinary — image hosting, listing, and deletion; server-side usage via API key/secret.
- EmailJS — sends contact form emails from the client without a custom mail server.
- NextAuth — authentication with credentials provider.

## Technology Stack
- Frontend: Next.js 15 (App Router), React 19, Tailwind CSS 4.
- Backend: Next.js API routes (route.js handlers) on Node runtime.
- Auth: NextAuth (JWT, credentials).
- DB: MongoDB official driver.
- Styling: Tailwind CSS; custom UI components in src/app/components.

## Performance, SEO, Accessibility
- Image optimization via Next/Image combined with Cloudinary-hosted assets.
- Server-side rendering and static optimization where possible.
- Semantic structure and responsive design with Tailwind.
- Basic SEO supported by Next.js conventions; can extend with metadata on pages.

## Deployment and Hosting
- Is deployed on Vercel (connected to GitHub repo).

## Maintenance and Operations
- Content management occurs in /admin (after login).
- Media hygiene: API endpoint /api/images and /api/images/[filename] to list and safely delete unused images.
- Utilities:
  - npm run migrate-images — migrates local image references to Cloudinary (see src/scripts/migrate-images.mjs)
  - npm run test-cloudinary — verifies Cloudinary connectivity
- Security: Credentials stored hashed; API guards should be paired with admin UI usage. Avoid exposing secrets in client code.

## Contact and Support
- For content updates, log into /admin.
- For technical support, provide environment variables and error messages observed. If email form is needed in production, ensure EmailJS keys and templates are configured and remove the temporary UI alert that blocks submission.

---

# Developer Docs (original template)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
