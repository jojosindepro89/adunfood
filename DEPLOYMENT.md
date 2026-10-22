# Deploying Àdùn Kitchen to Vercel

1. Push this project to GitHub and import the repository into Vercel. Vercel detects the Vite build and runs `npm run build`.
2. In **Project Settings → Environment Variables**, add these values for Production (and Preview if you want admin sign-in on preview deployments):
   - `ADMIN_PASSWORD`: a unique administrator password of at least 12 characters.
   - `ADMIN_SESSION_SECRET`: a separate random secret with at least 32 bytes of entropy. Generate one with `openssl rand -base64 48`.
3. Redeploy after saving the variables. Open `/admin` on the deployed site to sign in.

The `/admin` URL is intentionally not linked from the public storefront. The serverless endpoint validates the password and issues a signed, HTTP-only, secure, same-site session cookie. Keep both environment values out of GitHub and never put them in a `VITE_` variable.

The current menu, settings, cart, and orders still use browser local storage. They are not shared between devices or protected as server-side business records. Use a database and authenticated admin APIs before relying on this deployment for real order management. The login protects access to the admin interface; it does not turn browser-local order data into a multi-user backend.

The Vercel login endpoint is not available in the plain Vite development server, so `/admin` sign-in is intended to be verified on a Vercel deployment or preview deployment.
