# Deploying on Render

The website needs only GitHub and Render. No database, API key, payment account, CMS, or email service is required.

## Render Blueprint

The repository includes a root-level `render.yaml`. In Render, choose **New → Blueprint**, connect this GitHub repository, and keep the Blueprint path as `render.yaml`. Render will create a Node web service, run the production build, start Next.js on the provided port, health-check `/`, and redeploy on each commit to the linked branch.

The Blueprint sets `SITE_URL` to the temporary Render domain and keeps `SITE_INDEXABLE=false` for a safe pre-launch deployment.

## Manual GitHub to Render

1. Push this project to a GitHub repository.
2. In Render, choose **New → Web Service** and connect the repository.
3. Use these settings:

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Branch | The branch containing this site |
| Root directory | Leave blank |
| Build command | `npm ci && npm run build` |
| Start command | `npm run start` |
| Health check path | `/` |
| Environment variables | `SITE_URL` and `SITE_INDEXABLE` |

4. Set `SITE_URL` to the complete public URL without a trailing slash and keep `SITE_INDEXABLE=false` until launch approval.
5. Deploy and use the generated `onrender.com` URL.

The start script binds to `0.0.0.0` and Next.js automatically uses Render's `PORT`. The first request on Render's free service tier may be slower after the service has slept. Use a paid Render web service before a public launch to remove free-tier spin-down.

## Before a public launch

The current site intentionally sends `noindex, nofollow` directives. Keep them until the official business identity, domain, products, policies, service area, and integrations are confirmed. At launch, set `SITE_URL` to the final domain and `SITE_INDEXABLE=true`, then redeploy. Product checkout and message delivery remain intentionally inactive until the appropriate live services are connected.
