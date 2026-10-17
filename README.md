# Southern Grace Interiors

A complete Next.js storefront and interior-design studio website for Southern Grace Interiors. The site runs with local content and assets, requires no environment variables, and is ready to deploy as a Node web service on Render.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm test
npm run build
npm run start
```

`npm run start` listens on Render's `PORT` automatically and binds to `0.0.0.0`.

## Working now

- Responsive home, shop, collection, product, cart, services, inspiration, about, journal, contact, and policy routes
- 21 typed products across five collections
- Search, category and price filters, sorting, variants, quantities, related products, and persistent browser cart
- Disabled checkout with an honest launch-status message; no payment fields or order creation
- Validated inquiry and newsletter experiences that do not transmit or store personal information
- Local commercial-use photography, responsive images, noindex metadata, dynamic-host Open Graph metadata, sitemap, and robots response

## Integration boundaries

Provider contracts live in `app/lib/providers.ts`; typed domain models live in `app/types/domain.ts`. The safe defaults are local catalog/content, browser-only cart, disabled inquiries, and disabled checkout.

After business approval:

1. Implement a Shopify Storefront provider for live products, collections, cart creation, and Shopify-hosted checkout.
2. Implement a Sanity content provider for editorial content, portfolio, owner details, journal, and global settings.
3. Implement a server-only inquiry provider with schema validation, spam protection, rate limiting, and an email/CRM destination.
4. Replace provisional merchandise, prices, policies, contact details, and service scope with verified information.
5. Remove `noindex` only after the business identity, domain, content rights, and launch details are approved.

See `DEPLOY_RENDER.md`, `ASSETS.md`, and `CONTENT_TO_CONFIRM.md` for the handoff details.
