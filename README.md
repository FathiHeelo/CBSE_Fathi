# Fashion Catalog & Discovery MFE

React, TypeScript, and MUI foundation for the fashion marketplace catalog microfrontend.

## Development

```bash
npm install
npm run dev
```

Use `npm test` to verify catalog filtering and sorting, and `npm run build` for a production build.

Run `npm run build:mfe` to create the standalone ES module in `dist-mfe/catalog-mfe.js`. A shell can load that script and render `<catalog-mfe></catalog-mfe>`.

## Current foundation

- Material Design theme tokens and reusable MUI component overrides
- Typed fashion marketplace data in `src/data/mockProducts.json`
- Local catalog state with debounced search, filters, sorting, and product mutations
