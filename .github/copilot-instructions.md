# Oriane Pregnancy App - AI Agent Instructions

## Project Overview
French-language pregnancy tracking app built with Next.js 16 App Router, Prisma ORM (PostgreSQL), TypeScript, and shadcn/ui components. Targets expectant mothers ("mamans") with medical tracking, checklists, nutrition guidance, and appointment management.

## Architecture & Key Patterns

### Data Layer
- **Prisma schema** (`prisma/schema.prisma`): Single source of truth for all models
- Key models: `User` (with pregnancy data), `Checklist` (3 types: trousseau/documents/projet-naissance), `Appointment`, weight/symptom tracking, `Food` (nutrition), `Album`/`Photo` (memories)
- All user data cascades on delete (`onDelete: Cascade`)
- Auth is stubbed: `getCurrentUserId()` returns demo user ID (see `lib/auth.ts`)

### Component Structure
- **Server Components by default** - use `"use client"` only when needed (forms, interactivity)
- **Client/Server split**: Server actions in `app/actions/*.ts`, client components in `components/*-client.tsx`
- Example: `trousseau-client.tsx` (optimistic UI) calls `checklists.ts` server actions
- All UI components in `components/ui/` from shadcn/ui ("new-york" style variant)

### Forms & Validation
- **Zod schemas** in `lib/validators/*.ts` for input validation
- Server actions validate inputs with Zod before Prisma operations
- Example: `toggleChecklistItemSchema` validates `checklistId` and `itemId`

### Styling & Design
- **Tailwind v4** with CSS variables (see `app/globals.css`)
- Custom color palette: `--primary` (pink #E81F67), `--tertiary` (peach), `--success` (mint green)
- Use `cn()` utility (`lib/utils.ts`) for conditional classes
- Mobile-first responsive design with bottom navigation (`components/mobile-nav.tsx`)
- Accessibility focus: skip links, ARIA labels, safe area insets for iOS

### State Management
- **Optimistic UI** pattern with `useOptimistic` hook (see `trousseau-client.tsx`)
- Server actions with `revalidatePath()` to refresh data
- No global state library - rely on server components and URL state

### Navigation & Routing
- App router file structure maps to URLs (e.g., `app/checklists/trousseau/page.tsx` → `/checklists/trousseau`)
- Shared `<MobileNav>` in root layout with 5 main sections
- Active route detection: `pathname.startsWith(\`/\${firstSegment}\`)`

## Critical Developer Workflows

### Local Development
```bash
npm run dev              # Start dev server (default port 3000)
npm run check            # Run linter + type check
npm run prisma:generate  # Generate Prisma client (auto-runs on npm install)
npm run prisma:migrate:dev  # Create/apply migrations
```

### Database Setup
- Requires `DATABASE_URL` and `DIRECT_URL` env vars (Vercel Postgres format)
- Migration in `prisma/migrations/20251212134435_init_oriane/`
- Always run `prisma generate` after schema changes

### TypeScript Config
- Strict mode enabled
- Build errors ignored in `next.config.mjs` (`ignoreBuildErrors: true`) - **fix this before production**
- Path aliases: `@/*` maps to project root

### Git Workflow
- Feature branches off `main`
- Commit messages: imperative tense, reference issues
- Pull requests require at least one approval and passing checks
- For new features, create a new branch, respecting conventional branch and commit naming

## Project-Specific Conventions

### Naming
- French UI text and route names (`suivi`, `checklists`, `nutrition`)
- Component files: kebab-case (`mobile-nav.tsx`, `checklist-item.tsx`)
- Client components: `-client.tsx` suffix
- Server actions: singular noun + plural file name (e.g., `toggleChecklistItemAction` in `checklists.ts`)

### Checklist System
- 3 hardcoded types: `trousseau` (hospital bag), `documents` (admin), `projet-naissance` (birth plan)
- Default data embedded in server actions (`defaultChecklists` object)
- One checklist per user per type (`@@unique([userId, type])`)
- Nested structure: Checklist → ChecklistSection → ChecklistItem
- Progress calculated client-side from completed items

### Server Actions Pattern
1. Export typed function with Zod validation
2. Call `getCurrentUserId()` for auth
3. Perform Prisma operation
4. `revalidatePath()` for affected routes
5. Return typed payload (not raw Prisma models)

Example:
```typescript
export async function toggleChecklistItemAction(input: ToggleChecklistItemInput) {
  const parsed = toggleChecklistItemSchema.parse(input)
  const userId = await getCurrentUserId()
  // ... Prisma update ...
  revalidatePath('/checklists/trousseau')
}
```

### Food/Nutrition
- `Food` model with `FoodStatus` enum (`RECOMMANDE`, `A_EVITER`, `MODERE`)
- No food search implemented yet - placeholder pages in `app/nutrition/`

## Key Files to Reference

- **Schema**: `prisma/schema.prisma` - all data models and relationships
- **Auth stub**: `lib/auth.ts` - replace with NextAuth.js or similar
- **Server action example**: `app/actions/checklists.ts` - complete CRUD pattern
- **Optimistic UI example**: `components/checklists/trousseau-client.tsx`
- **Mobile navigation**: `components/mobile-nav.tsx` - app-wide structure
- **Theming**: `app/globals.css` - custom color variables

## Known Gaps & TODOs
- Authentication is mocked - implement real session management
- No food search/filtering implementation
- No API routes - all logic in server actions
- Image optimization disabled in `next.config.mjs`
- Missing test suite
