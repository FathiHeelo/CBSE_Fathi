# Role & Project Brief: Microfrontend Catalog & Discovery (React + MUI)

## 🎯 Developer Info & Role

- **Developer Name:** Fathi (فتحي)
- **Role:** Catalog & Discovery MFE Developer
- **Assigned Scope:**
  1. Home Page
  2. Product Listing Page (PLP)
  3. Search & Filtering System
  4. Product Detail Page (PDP)
- **Tech Stack:** React (Vite/CRA), MUI (Material UI v5), Custom Events / Web Components.

---

## 🏗 System Architecture & Integration Specs

- **Architecture Pattern:** Microfrontend (MFE) built with Web Component Wrapping (`r2wc` / Custom Elements).
- **Shell Compatibility:** Must export a standalone Custom Element (e.g., `<catalog-mfe></catalog-mfe>`) or a clean Webpack/Vite Bundle to be easily integrated into the parent Shell repo via Web Components / Single-SPA / Script Tag.
- **Design System Consistency:** Use MUI Theme Provider. Ensure all spacing, typography, palette, and component styles strictly follow Material Design 3 guidelines so it matches other team components (Vue/Vuetify & Lit/Material Web).

---

## ⚡ Memory & Token Optimization Rules (STRICT)

To maintain token efficiency and prevent memory drops during long chat sessions:

1. **Context Preservation:** Always refer back to `AGENTS.md`. Do not re-explain architecture or tech stack in chat responses.
2. **Incremental Code Only:** Provide full code for new files, but for edits, show ONLY the changed code blocks or diffs with line references.
3. **No Redundant Explanations:** Keep explanations under 3-4 bullet points. Focus purely on functional React components, MUI styling, and state management.
4. **Clean Code Base:** Keep state local or inside custom hooks (`useCatalogState`). Do not bloat the global bundle.

---

## 📦 Required Pages & Component Requirements

### 1. Home Page (`/` or Home View)

- Banner/Hero section matching group's app theme.
- Featured products carousel/grid.
- Quick category navigation cards.

### 2. Product Listing Page (PLP)

- Grid layout using MUI `Grid2` / `Grid`.
- Dynamic Product Cards with: Image, Title, Price, Rating, "View Details" button, and "Add to Cart" quick button.

### 3. Search & Filtering System

- Sidebar or top bar filter: Category filter, Price Range Slider, Sorting (Price low-high, Popularity, Rating).
- Real-time search bar with debounce.

### 4. Product Detail Page (PDP)

- Image gallery / main viewer.
- Detailed specs, description, availability status.
- Quantity selector + "Add to Cart" button.

---

## 🔗 Inter-MFE Communication (Events Bus)

Since this app runs inside a MFE Shell alongside Cart & Account MFEs:

- **Event Out (Product Added to Cart):**
  When a user clicks "Add to Cart", dispatch a Custom Event on `window`:

  ```javascript
  const addToCartEvent = new CustomEvent('catalog:add-to-cart', {
    detail: { productId, title, price, quantity, image },
    bubbles: true,
    composed: true // Required for Web Components / Shadow DOM
  });
  window.dispatchEvent(addToCartEvent);
  ```

- **Event Out (Navigate to Account/Orders):**
  Dispatch `catalog:navigate` if internal links refer to external MFE routes.

---

## 🚀 Step-by-Step Task Execution Plan

### Phase 1: Setup & MUI Theme Setup

- Setup Vite + React + MUI (`@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`).
- Setup custom Material Design theme (colors, typography).

### Phase 2: Mock Data & State Management

- Create `src/data/mockProducts.json` tailored to the assigned App Type.
- Build custom hooks for filtering and searching logic.

### Phase 3: Page Components

- Create modular components: `ProductCard`, `FilterSidebar`, `SearchBar`, `ProductGrid`.
- Build views: `HomeView`, `PLPView`, `PDPView`.

### Phase 4: Microfrontend Export & Packaging

- Wrap the app using `react-to-web-component` or export entry points for Shell ingestion.
- Test custom events dispatching.

---

## 💡 Instructions for Codex/AI Assistant

When I ask you to build a feature:

- Check if the feature belongs to Home, PLP, Search/Filter, or PDP.
- Implement using MUI components (`Container`, `Grid`, `Card`, `Typography`, `TextField`, `Slider`, etc.).
- Always include the `bubbles: true` and `composed: true` custom-event options when actionable items (like Add to Cart) occur.
- Write production-grade, clean TypeScript/JavaScript React code.
