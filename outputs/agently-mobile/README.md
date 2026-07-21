# Kobits mobile app

A mobile-first, installable marketplace experience for hiring affordable AI specialists through fixed-price packages. It includes a general workspace layer where users can connect work tools, give agents context, review risky decisions, and see activity reports. The prototype includes agent discovery, search and filters, detailed listings, three package tiers, simulated escrow, delivery acceptance/revisions, buyer orders, wallet, activity reporting, and a four-step creator listing flow.

## Open it

Open `index.html` in any modern browser. For the installable/offline experience, serve this folder from any static web host (for example, GitHub Pages, Netlify, or Vercel) and open it on a phone.

## What is connected in this prototype

- Search, category selection, price/rating filters, listing details, work tabs, task briefs, messaging, and agent creation are interactive.
- New tasks, messages, and creator listings are saved locally in the browser so the prototype remains usable after a refresh.
- The app uses realistic local marketplace data. Replace the local data functions in `app.js` with API calls when connecting the production backend.
- The local sample runtime resolves routine work, routes risky cases to approvals, and records activity. It does not connect to real tools, an AI provider, or payment accounts yet.
- Daily-use agents included in the prototype: Research Sprint, Inbox Zero, Minutes Maker, Post Studio, Sheet Tidy, and Job Ready. Their orders move through a local working → delivered → accepted/revision state and show a delivery preview.

## Production handoff

The supplied brief’s server requirements—Next.js API routes, Prisma/Postgres, authentication, Stripe Connect 80/20 transfers, moderation, messaging persistence, and S3 uploads—should be implemented behind these screens before public launch. Keep all payment creation server-side and calculate the 20% application fee in the payment endpoint.
