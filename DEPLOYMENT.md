# Deploying CareerHorizon to Render

The repository includes a Render Blueprint (`render.yaml`) that creates a
Free-plan Express web service and a free Vite static site. The API service
explicitly sets `plan: free`; do not choose a paid compute plan during setup.

## Before deploying

Rotate any database credentials that were ever committed to the repository.
Removing a credential from the current file does not remove it from Git
history. Put the replacement connection string only in Render's `MONGO_URI`
environment variable.

Have these values ready:

- A MongoDB Atlas connection string for `MONGO_URI`. An Atlas Free cluster is
  sufficient for a small hobby deployment.
- A long, random signing secret for `SECRET_KEY`.
- Your Cloudinary cloud name, API key, and API secret.
- A Gemini API key for `VITE_GEMINI_API_KEY` if you want the resume AI feature.
  It is optional if you do not use that feature.

## Set up MongoDB Atlas

1. In MongoDB Atlas, create a project and a **Free** cluster.
2. Create a database user with a strong, unique password. Do not reuse your
   Atlas account password.
3. Under **Network Access**, allow the Render API to connect. Render Free
   services do not have fixed outbound IP addresses, so if Atlas cannot be
   restricted to a stable Render IP, add `0.0.0.0/0`. Protect access with the
   dedicated database user and a strong password.
4. Select **Connect > Drivers** and copy the connection string. Replace its
   password placeholder with the database user's password (URL-encode special
   characters in the password) and include the database name, for example:
   `mongodb+srv://<user>:<password>@<cluster-host>/careerhorizon`.
5. Keep this URI private. Add it to Render as `MONGO_URI`, never to source code
   or a `VITE_` variable.

## Deploy

1. Push this repository to GitHub.
2. In Render, choose **New > Blueprint** and connect the repository.
3. Review the Blueprint. Confirm `careerhorizon-api` is on the **Free** plan
   and `careerhorizon-web` is a static site. Do not select a paid plan.
4. Enter the environment variables when prompted:
   - API service: `MONGO_URI`, `SECRET_KEY`, `CLOUDINARY_CLOUD_NAME`,
     `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
   - Static site: `VITE_GEMINI_API_KEY` if using the AI feature. If you are not
     using it, leave it unset/blank if Render allows that prompt.
5. Deploy the Blueprint and wait for both services to finish.
6. Open `https://careerhorizon-api.onrender.com/api/health`. It should return
   `{"status":"ok"}`.
7. Open `https://careerhorizon-web.onrender.com` and test registration, login,
   job listings, and resume uploads. Test AI analysis only if you configured
   the Gemini key.

The Blueprint sets `VITE_API_BASE_URL` to
`https://careerhorizon-api.onrender.com` and `CLIENT_URL` to
`https://careerhorizon-web.onrender.com`, matching the declared service names.
If Render shows different service URLs (for example, because a name is already
in use) or you add a custom domain, update both values in the dashboard:

- `VITE_API_BASE_URL`: the API service's full URL, including `https://` and
  without a trailing slash. Save it on the static site and trigger a new
  frontend deploy, because Vite embeds this value at build time.
- `CLIENT_URL`: the frontend origin only, including `https://` and without a
  trailing slash. Save it on the API service and redeploy the backend.

## If Render still asks for payment details

The API service must show **Free** in the Blueprint review. If Render still
blocks creation with a payment prompt after that, do not select a paid plan or
enter card details just to continue. Cancel and check the service's selected
plan and the account/workspace billing prompt; Render's account-specific
eligibility may differ.

One alternative is to deploy both parts on Vercel's free Hobby plan: Vercel
supports Express, but the current backend starts its own listener and would
need a small serverless-compatible adjustment first. Hobby is for
non-commercial personal use and has function quotas, so check Vercel's current
terms and limits before using it. It is not a drop-in change to this Render
Blueprint.

## Free-tier limitations

- Render Free web services spin down after 15 minutes without inbound traffic.
  The first request after that can wait about a minute while the API starts.
- The API's local filesystem is ephemeral. Files saved there can disappear on
  restarts, redeploys, and spin-downs. This app uses Cloudinary for uploaded
  media; continue using external persistent storage rather than local disk.
- Render's 750 Free instance hours are shared by the workspace each month.
  Free services are suspended for the rest of the month if the allowance is
  exhausted. Bandwidth and build-pipeline usage also have monthly limits.
- Atlas Free clusters have their own storage and feature limits. Keep backups
  of important data.
- `VITE_GEMINI_API_KEY` is compiled into the browser application and is visible
  to its users. Apply appropriate restrictions and quotas to that key; never
  put server-side secrets in `VITE_` variables.
