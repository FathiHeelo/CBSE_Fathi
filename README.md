# Yum Ta Dum - Catalog & Discovery MFE

Group 13's React + MUI microfrontend for restaurant discovery, menus, search, and meal selection.

## URLs and routes

- Local development: `http://127.0.0.1:5173/`
- Live deployment: pending publication by the Yum Ta Dum Shell/deployment owner
- `/` - discovery, categories, featured restaurants, and offers
- `/restaurants` - searchable, filterable, sortable restaurant list
- `/restaurants/:restaurantId` - restaurant details and grouped menu
- `/search` - combined restaurant and meal search results

## Development

```bash
npm install
npm run dev
```

Use `npm test` to verify catalog data and event contracts, and `npm run build` for a production build.

```bash
npm test
npm run build
npm run build:mfe
```

## Shell integration

`npm run build:mfe` creates `dist-mfe/yum-catalog.js`. Load it as an ES module, then render:

```html
<yum-catalog></yum-catalog>
```

The embedded element uses open Shadow DOM and omits the standalone header/footer because the Shell owns global chrome and routing.

Catalog dispatches these exact events on `window`:

- `cart:add-item` with `detail: { item: MealItem }`
- `navigation:requested` with `detail: { route: string }`

Both events use `bubbles: true` and `composed: true`. Prices remain numeric ILS values in payloads and are formatted with `₪` only in the UI.

## Implemented catalog

- Approved Yum Ta Dum MUI theme and component overrides
- Home discovery, restaurant list, restaurant menu/detail, and search routes
- Canonical restaurant and meal dataset with tested search, filters, and sorting
- Strict `cart:add-item` and `navigation:requested` event dispatchers
- Standalone app plus `<yum-catalog>` Web Component build
