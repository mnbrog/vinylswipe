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

If you encounter an error about a missing optional Rollup module when building, delete `node_modules` and `package-lock.json` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```
