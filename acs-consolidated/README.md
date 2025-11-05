# ACS Consolidated Website

This is the consolidated Asian Culture Society website that combines all 8 separate pages into one Next.js application.

## Pages Included

- `/home` - Home page (from ACS-Website)
- `/about-us` - About Us page
- `/calendar` - Calendar page
- `/mentor-mentee` - Mentor/Mentee program page
- `/tinikling` - Tinikling page
- `/tinikling/sign-up` - Tinikling sign up page
- `/mentor-mentee/mentor/sign-up` - Mentor sign up page
- `/mentor-mentee/mentee/sign-up` - Mentee sign up page

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/home](http://localhost:3000/home) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `Jacob-C-Kim/Asian-Culture-Society-Website`
4. Set the **Root Directory** to: `acs-consolidated`
5. Framework Preset: Next.js (auto-detected)
6. Click "Deploy"

### Environment Variables

No environment variables are required for basic functionality. If your pages use external APIs (Google Sheets, etc.), add those keys in the Vercel dashboard under:

Project Settings → Environment Variables

## Updating CampusGroups iFrames

Once deployed, update your CampusGroups iframe URLs to point to your new Vercel deployment:

**Old structure:**
- https://campusgroups.rit.edu/acs/home/ → iframe: `https://acs-home.vercel.app`
- https://campusgroups.rit.edu/acs/about-us/ → iframe: `https://acs-about.vercel.app`

**New structure:**
- https://campusgroups.rit.edu/acs/home/ → iframe: `https://your-app.vercel.app/home`
- https://campusgroups.rit.edu/acs/about-us/ → iframe: `https://your-app.vercel.app/about-us`
- https://campusgroups.rit.edu/acs/tinikling/sign-up/ → iframe: `https://your-app.vercel.app/tinikling/sign-up`
- https://campusgroups.rit.edu/acs/mentor-mentee/mentor/sign-up/ → iframe: `https://your-app.vercel.app/mentor-mentee/mentor/sign-up`

Replace `your-app` with your actual Vercel project name.

## Benefits

✅ **Single repository** - All pages in one place
✅ **Single deployment** - Deploy once instead of 8 times
✅ **Clean URLs** - Proper nested routing
✅ **Shared dependencies** - No duplication
✅ **Easier maintenance** - Update all pages together
✅ **Better performance** - Next.js optimizations

## Architecture

- **Framework**: Next.js 15 with App Router
- **UI Libraries**: Radix UI, Lucide Icons
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

Each page maintains its original React components wrapped in Next.js client components, so the frontend code remains unchanged.

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

2. Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Asset Loading Issues

Assets are served from `/assets/{page-name}/`. If images aren't loading, verify:

1. Assets are in `public/assets/` directory
2. Image paths in components use `/assets/...` (leading slash for public directory)

## Support

For issues or questions, contact the ACS web development team.
