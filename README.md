# Personal Academic Website - Tran Quoc Khang

Website built with React + Vite, styled with Tailwind CSS, and deployed automatically to GitHub Pages using GitHub Actions.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages Auto Deploy

Workflow file: `.github/workflows/deploy.yml`

The deployment runs automatically when pushing to the `main` branch.

### One-time GitHub setup

1. Go to repository `Settings`.
2. Open `Pages`.
3. In `Build and deployment`, choose `Source: GitHub Actions`.
4. Push to `main` branch.

After workflow success, your site is published on GitHub Pages.
