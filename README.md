# Yum Ta Dum - Catalog & Discovery MFE

Group 13's React + MUI microfrontend for restaurant discovery, menus, search, and meal selection.

## Development

```bash
npm install
npm run dev
```

Use `npm test` to verify catalog data and event contracts, and `npm run build` for a production build.

Run `npm run build:mfe` to create `dist-mfe/yum-catalog.js`. The Shell can load that ES module and render `<yum-catalog></yum-catalog>`.

## Implemented catalog

- Approved Yum Ta Dum MUI theme and component overrides
- Home discovery, restaurant list, restaurant menu/detail, and search routes
- Canonical restaurant and meal dataset with tested search, filters, and sorting
- Strict `cart:add-item` and `navigation:requested` event dispatchers
- Standalone app plus `<yum-catalog>` Web Component build
