# VinylSwipe

## Development

Install dependencies and run the Netlify dev server to access serverless functions locally:

```bash
npm install
netlify dev
```

If you prefer running the Vite dev server directly, set `VITE_FUNCTIONS_BASE` to the URL of your Netlify functions (e.g. `http://localhost:8888`).

### Running the Front‑End Only Demo

To preview the mock vinyl player without Netlify functions, install dependencies and start the Vite dev server:

```bash
npm install
npm run dev
```

If `npm run build` fails with a message like `Cannot find module @rollup/rollup-linux-x64-gnu`,
remove `node_modules` and `package-lock.json` then reinstall to ensure the correct
Rollup binary is downloaded for your platform:

```bash
rm -rf node_modules package-lock.json
npm install
```
