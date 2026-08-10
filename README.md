# MIS — unified Next.js app

Single Next.js service that serves the UI, the REST API, and Socket.IO from
one process — no separate frontend/backend deploy. Built for a single
Render web service.

## Layout

- `server.js` — custom Node server: binds one HTTP port, mounts the Express
  API (`/api/*`, `/webhook*`, `/analytics`) and Socket.IO, and falls back to
  the Next.js request handler for everything else (pages, static assets).
- `src/server/` — the Express API (routes, controllers, repositories,
  services, middleware, Socket.IO setup). Migrated from the former
  `MISBackend/src`.
- `src/legacy-client/` — the React UI (components, pages, reports, hooks,
  services). Migrated from the former `MISFrontend/src`. It keeps its own
  `react-router-dom` client-side routing; Next.js hosts it behind a single
  catch-all route (`pages/[[...slug]].jsx`) rather than a per-page rewrite,
  since the app owns ~90 routes and its own auth/theme providers.
- `pages/` — Next.js entry points (`_app`, `_document`, and the catch-all
  page that mounts the legacy UI client-side).
- `public/` — static assets (manifest, icons, service worker).

## Scripts

- `npm run dev` — development server (`NODE_ENV=development node server.js`)
- `npm run build` — `next build`
- `npm start` — production server (`NODE_ENV=production node server.js`)
- `npm test` — frontend unit tests (vitest)
- `npm run test:server` — API tests (jest)

## Environment

Copy `.env.example` to `.env` and fill in real values. `NEXT_PUBLIC_*`
variables are baked in at build time and exposed to the browser bundle;
everything else stays server-only. Because the UI and API are now
same-origin, the old `VITE_API_SERVER` / `VITE_API_LOCAL` split and the
Render-free-tier "wake the backend" ping are gone — requests are just
relative (`/api/...`).

## Deploying on Render

Single web service:
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Set the environment variables from `.env.example`.
