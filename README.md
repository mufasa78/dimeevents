# Dime Events

Luxury event planning service creating moments that matter.

## Deployment to Vercel

### Prerequisites

- A Vercel account
- A GitHub repository (https://github.com/mufasa78/dimeevents)
- A PostgreSQL database (e.g., Neon, Supabase, or Vercel Postgres)

### Steps to Deploy

1. Push your code to GitHub:
   ```
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. Log in to Vercel and create a new project
   - Connect to your GitHub repository
   - Configure the following settings:

3. Environment Variables
   - Add the `DATABASE_URL` environment variable with your PostgreSQL connection string
   - Add `NODE_ENV=production`

4. Build Settings
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Deploy
   - Click "Deploy" and wait for the build to complete

### Troubleshooting

If you encounter build issues:
- Check the build logs for specific errors
- Ensure all environment variables are correctly set
- Verify that the database is accessible from Vercel

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Run the development server: `npm run dev`
