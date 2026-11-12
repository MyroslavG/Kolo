# UAConnect

UAConnect is now organized as a small product workspace:

- `web/` - the existing Next.js 15 web app
- `mobile/` - a new Expo React Native app prototype that mirrors the core mobile flow

Ukrainian remains the default language across the product.

## Quick Start

Install dependencies from the repository root:

```bash
pnpm install
```

Run the web app:

```bash
pnpm web:dev
```

Run the Expo app:

```bash
pnpm mobile:dev
```

## Useful Commands

```bash
pnpm web:typecheck
pnpm web:lint
pnpm web:build
pnpm mobile:typecheck
```

## Image Compression Migration

The storage compression script is dry-run by default:

```bash
pnpm web:compress-images
```

To run it for real, set `SUPABASE_SERVICE_ROLE_KEY` locally and pass `--write`:

```bash
pnpm web:compress-images -- --write
```

Useful safer test run:

```bash
pnpm web:compress-images -- --bucket business-content-images --limit 10
```

Never commit the service-role key. Keep it only in your local shell or local `.env.local`.

## Structure

```text
web/
  app/             Next.js App Router routes
  components/      Web UI components
  data/            Web taxonomy data
  lib/             Web helpers and Supabase clients
  supabase/        SQL schema and RLS policies
mobile/
  App.tsx          Expo app shell and mobile flow
  src/data.ts      Mobile prototype data
  src/types.ts     Mobile TypeScript types
```

## Deployment Notes

### RoboBro campaign

The Home card and fixed, pinned Feed announcement use shared Ukrainian/English
copy and the fundraiser URL in `shared/robobro.ts`. They are visible to guests
and do not depend on community posts loading. The announcement is built into
the clients, so it does not create a user-authored database post or support
likes/comments. Set `robobroCampaign.enabled` to `false` to retire both placements.
Changes require a website deployment and a mobile app release/update.

Donate opens the organizer's external fundraiser. Clicks reuse `contact_click`
analytics with `campaign: robobro`, `action: donate`, and `surface: home_campaign`
or `feed_campaign`; they measure outbound clicks, not completed donations.

The bundled image in `web/public/robobro.png` and `mobile/assets/robobro.png`
comes from the [official campaign](https://unitewithukraine.givecloud.co/robobro)
([original image](https://cdn.givecloud.co/s/files/1/0000/8711/files/robobro-main.png)).

### Hosting

For Vercel, set the project **Root Directory** to `web`. The web app keeps its own `package.json`, `next.config.ts`, Tailwind config, and Supabase schema inside that folder.

The root `netlify.toml` is still only the redirect from the old Netlify URL to Vercel.
