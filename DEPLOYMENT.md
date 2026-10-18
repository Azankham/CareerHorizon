# Deploying CareerHorizon to Render

The repository includes a Render Blueprint (`render.yaml`) that creates an
Express web service and a Vite static site.

## Before deploying

Rotate any database credentials that were ever committed to the repository.
Removing a credential from the current file does not remove it from Git
history. Put the replacement connection string only in Render's `MONGO_URI`
environment variable.

Have these values ready:

- A MongoDB Atlas connection string for `MONGO_URI`. In Atlas, allow network
  access from Render (or temporarily allow access from anywhere if your Atlas
  plan/network policy requires it).
- A long, random signing secret for `SECRET_KEY`.
- Your Cloudinary cloud name, API key, and API secret.
- A Gemini API key for `VITE_GEMINI_API_KEY` if you want the resume AI feature.

## Deploy

1. Push this repository to GitHub.
2. In Render, choose **New > Blueprint** and connect the repository.
3. Render reads `render.yaml` and prompts for the secret environment variables.
   Enter the values above. The Gemini key is optional if you do not use the AI
   feature.
4. Confirm creation and wait for both services to finish deploying.
5. Verify the API at `https://careerhorizon-api.onrender.com/api/health`. It
   should return `{"status":"ok"}`.
6. Open `https://careerhorizon-web.onrender.com` and test registration,
   login, job listings, resume uploads, and AI analysis as configured.

The Blueprint sets the frontend API URL and the backend's allowed frontend
origin to match the two service names. If you rename either service or use a
custom domain, update `VITE_API_BASE_URL` and `CLIENT_URL` in the Render
dashboard, respectively. A frontend build is required after changing
`VITE_API_BASE_URL`.

`VITE_GEMINI_API_KEY` is compiled into the browser application and is visible
to its users. Apply appropriate restrictions and quotas to that key; do not
put server-side secrets in `VITE_` variables.
