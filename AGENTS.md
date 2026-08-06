# Role & Project Brief: Microfrontend Catalog & Discovery (React + MUI)

**Project Name:** Yum Ta Dum (Multi-Vendor Food Delivery Platform)
**Group:** Group 13
**Document Version:** 1.0 (SRS Approved - Aug 5, 2026)

---

## 🎯 Developer Info & Scope

- **Developer Name:** Fathi Al-Helo (فتحي الحلو)
- **Role:** Catalog & Discovery MFE Owner
- **Repository Name:** `yum-ta-dum-catalog-react`
- **Custom Element Name:** `<yum-catalog>`
- **Tech Stack:** React, MUI (Material UI v5), Vite, `@r2wc/react` or a standards-based Web Components wrapper.
- **Assigned Routes:**
  - `/` - Home and Discovery View (Categories, Featured Restaurants, Offers)
  - `/restaurants` - Restaurant List View (Filtering, Sorting, Search)
  - `/restaurants/:restaurantId` - Restaurant Menu & Details View
  - `/search` - Search Results View

---

## 🏗 System Architecture & Technical Specifications

- **Architecture Pattern:** Frontend-only Microfrontend running independently and embedded via Web Components.
- **Integration Method:** Web Components + Custom Events with `bubbles: true` and `composed: true`.
- **Shell Ownership:** The Shell owns the global header, footer, route selection, and cross-MFE navigation.
- **Navigation Rule:** Never force a full reload with `window.location.href`; dispatch `navigation:requested` instead.
- **Canonical Mock Data Owner:** Catalog & Discovery is the only owner of the full restaurant and meal dataset. Cart and Account must not duplicate it.
- **Independence:** The MFE must run independently for development/testing and must not import another member's source or mutate another MFE's state.

---

## 🎨 Yum Ta Dum Design Tokens & Visual System

All MUI components must follow these tokens exactly:

- **Primary Green:** `#2E7D32`
- **Primary Hover/Pressed:** `#1B5E20`
- **Secondary CTA Orange:** `#F57C00`
- **Secondary Hover/Pressed:** `#E65100`
- **Background:** `#F7F8F5`
- **Surface:** `#FFFFFF`
- **Text Primary:** `#1F1F1F`
- **Text Secondary:** `#616161`
- **Border:** `#E0E0E0`
- **Success:** `#2E7D32`
- **Warning:** `#ED6C02`
- **Error:** `#D32F2F`
- **Currency:** `ILS`; display as `₪25.00`, but keep raw numeric prices in data and event payloads.
- **Font Family:** `Roboto, Arial, sans-serif`
- **Border Radius:** Cards `16px`; buttons/inputs `12px`; dialogs `20px`; chips/badges `999px`.
- **Shadow:** `0 2px 8px rgba(0,0,0,0.08)`
- **Icons:** Material Symbols Outlined / MUI outlined icons.
- **Mascot:** Use the Yumy mascot placeholder for empty, success, and no-results states when the approved asset is available.

---

## 📡 Custom Event Contracts (Strict Case-Sensitivity)

### 1. Add Item to Cart (`cart:add-item`)

When a meal is selected, dispatch on `window`:

```typescript
window.dispatchEvent(
  new CustomEvent('cart:add-item', {
    detail: {
      item: {
        id: 'meal-101',
        restaurantId: 'rest-01',
        restaurantName: 'Burger House',
        name: 'Classic Cheeseburger',
        description: 'Beef patty with cheese and house sauce.',
        price: 35,
        image: '/images/meals/classic-cheeseburger.jpg',
        category: 'Burgers',
        quantity: 1,
      },
    },
    bubbles: true,
    composed: true,
  }),
);
```

### 2. Request Route Navigation (`navigation:requested`)

```typescript
window.dispatchEvent(
  new CustomEvent('navigation:requested', {
    detail: { route: '/restaurants/rest-01' },
    bubbles: true,
    composed: true,
  }),
);
```

- Event names and payload fields are case-sensitive.
- Do not include the `₪` symbol or formatted currency strings in event payload numbers.
- The `composed` option is mandatory so events cross Shadow DOM boundaries and reach the Shell.

---

## 📦 Canonical Mock Data Schema (`src/data/mockData.ts`)

```typescript
export interface Restaurant {
  restaurantId: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  rating: number;
  deliveryEstimate: string;
  categories: string[];
}

export interface MealItem {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}
```

- Restaurant IDs, meal IDs, prices, and names must remain stable for integration tests and fixtures.
- All prices are raw numeric ILS values.
- A cart may contain meals from only one restaurant; Cart owns the confirmation/clearing behavior when switching restaurants.

---

## 📦 Required Catalog Features

### Home / Discovery (`/`)

- Restaurant categories, featured restaurants, and offers.
- Loading, error, and Yumy empty states.

### Restaurant List (`/restaurants`)

- Responsive cards showing name, cuisine, rating, delivery estimate, and image.
- Search by restaurant or meal name.
- Category filtering and basic sorting suitable for the mock dataset.

### Restaurant Details (`/restaurants/:restaurantId`)

- Restaurant description and metadata.
- Menu grouped by meal category.
- Meal cards that dispatch the exact `cart:add-item` contract.

### Search Results (`/search`)

- Combined restaurant and meal results.
- Loading, no-results, and error states.

---

## ⚡ Memory & Token Optimization Rules for AI

1. Read `AGENTS.md` before answering or changing code.
2. Provide incremental diffs for existing files; provide full code only for new files.
3. Keep explanations to 3-4 concise bullets.
4. Keep state local or in focused hooks such as `useCatalog` and `useRestaurantSearch`.
5. Avoid unnecessary global state and dependencies.
6. Always handle loading, empty, and error states gracefully.

---

## 🚀 Execution Roadmap

### Phase 1: MUI Theme & Design Tokens

- Implement the approved Yum Ta Dum colors, typography, radii, shadows, and component overrides.

### Phase 2: Canonical Mock Data & Types

- Maintain the complete shared restaurant and meal dataset in `src/data/mockData.ts`.

### Phase 3: Catalog Components

- Build `RestaurantCard`, `MealCard`, `SearchBar`, and `FilterSidebar`.

### Phase 4: Views & Routes

- Build `HomeView`, `RestaurantListView`, `RestaurantDetailView`, and `SearchResultsView`.

### Phase 5: Web Component & Integration

- Export `<yum-catalog>` and test all event contracts across Shadow DOM.

---

## ✅ Definition of Done

- TypeScript type-check and production build pass.
- Unit tests cover search/filter logic and event payloads.
- UI uses ILS formatting and approved design tokens.
- Custom events always use exact names, exact payloads, `bubbles: true`, and `composed: true`.
- The MFE runs standalone and exports `<yum-catalog>` for Shell integration.
