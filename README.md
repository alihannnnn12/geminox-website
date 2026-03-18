# Geminox Local Preview

This is a full local-first redesign for the Geminox artist site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

The first goal is simple: get the site running on your machine so you can review it in the browser before thinking about deployment.

## Prerequisites

- Node.js `20.11+`
- npm `10+`

Recommended:

- Use the current Node LTS release if you are installing fresh.

## Local Setup

1. Open Terminal.
2. Go to the project folder:

```bash
cd /Users/alihan/Downloads/website
```

3. Install dependencies:

```bash
npm install
```

4. Start local development:

```bash
npm run dev
```

5. Open your browser:

```text
http://localhost:3000
```

## Build Production Version Locally

```bash
npm run build
```

If you want to preview the production build locally after that:

```bash
npm run start
```

## Lint

```bash
npm run lint
```

## End-to-End Tests

Install Playwright browsers once:

```bash
npm run test:e2e:install
```

Run the tests:

```bash
npm run test:e2e
```

Optional UI mode:

```bash
npm run test:e2e:ui
```

## Folder Structure

```text
src/
  app/                  Next.js app routes and API placeholders
  components/           Reusable UI and interactive components
  data/                 Easy-to-edit content files
  lib/                  Small helpers
public/
  assets/               Images and placeholder visuals
  downloads/            Downloadable EPK placeholders
tests/                  Playwright tests
```

## Where To Edit Content

- Hero text: `src/data/site.ts`
- Booking email: `src/data/site.ts`
- Social links: `src/data/site.ts`
- Artist bio / about copy: `src/data/site.ts`
- Release info: `src/data/releases.ts`
- Tour dates: `src/data/shows.ts`
- Gallery images: `src/data/gallery.ts`
- Newsletter integration: `src/app/api/newsletter/route.ts`
- Contact form integration: `src/app/api/contact/route.ts`

## Current Real Content Reused

Pulled from the current Geminox site:

- Artist name
- Booking email: `bookings@geminoxbeats.com`
- Location: `Washington DC`
- `No Fakers` EP announcement
- Featured YouTube mix embed
- Instagram / TikTok / YouTube links
- Available visual assets from the current site where they looked relevant

## Placeholder Content You Should Replace Later

- Additional release cards after `No Fakers`
- Tour dates
- Most gallery imagery beyond the reused current assets
- Streaming profile links
- Merch products and store links
- Press photo bundle
- Tech rider

## Environment Variables

No environment variables are required right now.

That keeps local setup simple for review.

## Common Troubleshooting

### `node: command not found`

Install Node.js first, then restart Terminal.

### `npm install` fails because of old Node

Check your version:

```bash
node -v
```

If it is below `20.11`, upgrade Node and run `npm install` again.

### Playwright tests fail before browsers are installed

Run:

```bash
npm run test:e2e:install
```

### Fonts or embeds load slowly on first run

The first local run may take a little longer because Next.js prepares the app and fetches font assets.

## Notes For Future Deployment

- This project is ready for local review first.
- When you are happy with the content and visuals, we can add IONOS deployment steps next.
- Before deployment, replace placeholder assets and connect the newsletter/contact endpoints to real services.

## GitHub -> Vercel -> IONOS

This is the recommended path for this Next.js project.

### 1. Push this project to GitHub

If this folder is not already a Git repository:

```bash
cd /Users/alihan/Downloads/website
git init
git add .
git commit -m "Initial Geminox site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

If Git asks for your identity first:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 2. Import the GitHub repo into Vercel

1. Log in to Vercel.
2. Click `New Project`.
3. Select your GitHub repository.
4. Keep the detected `Next.js` framework preset.
5. Keep the root directory as the repository root.
6. Click `Deploy`.

No environment variables are required for this version of the site.

### 3. Add your domain in Vercel

Inside Vercel:

1. Open the deployed project.
2. Go to `Settings`.
3. Open `Domains`.
4. Add your main domain, for example `geminoxbeats.com`.
5. Also add `www.geminoxbeats.com`.

Vercel will then show you the exact DNS records it expects.

### 4. Configure DNS in IONOS

Use the DNS records shown in Vercel for your exact project.

Typical setup:

- Apex/root domain: `A` record
- `www` subdomain: `CNAME` record

Typical values:

- `@` -> `A` -> the IP shown by Vercel
- `www` -> `CNAME` -> the Vercel host shown by Vercel

### 5. Update DNS in IONOS

In IONOS:

1. Log in to the IONOS Control Panel.
2. Go to `Domains & SSL`.
3. Open the target domain.
4. Edit the DNS settings.
5. Add or update the `A` record for the root domain.
6. Add or update the `CNAME` record for `www`.
7. Save the changes.

If you are using `www`, make sure that no old IONOS website-builder mapping is still attached to that same subdomain.

### 6. Wait for verification

- Vercel should verify the domain after the DNS changes propagate.
- IONOS says DNS changes can take up to about an hour to fully take effect everywhere.

### 7. Optional final cleanup

Once the domain is working on Vercel, decide whether you still want to pay for `MyWebsite Now Plus`.

- Keep IONOS if you still want the domain or email services there.
- Cancel or downgrade the website-builder package if it is no longer needed.

## First Things To Customize

- Replace placeholder gallery art with real warehouse, crowd, and press photography.
- Add real streaming profile URLs in `src/data/site.ts`.
- Add real release catalog entries in `src/data/releases.ts`.
- Add live show dates in `src/data/shows.ts`.
- Connect newsletter signup in `src/app/api/newsletter/route.ts`.
- Connect the contact form delivery in `src/app/api/contact/route.ts`.
