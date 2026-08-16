# 🍽️ Yum Ta Dum – Catalog & Discovery Platform

## 🎥 Demo

![Yum Ta Dum Demo](C:\Users\asus\CBSE\CBSE_Fathi\src\assets\yum-ta-dum-demo.gif)

▶️ **[Watch the Full Demo Video](https://drive.google.com/file/d/1pmaWmkh4zJ5gS2fHyTUSR4Cog1W-3V1q/view?usp=sharing)**

🌐 **Live Application:**
https://cbse-fathi.vercel.app/

---

## 🚀 Overview

**Yum Ta Dum – Catalog & Discovery** is a React-based Microfrontend developed by **Group 13** for restaurant discovery, menu browsing, searching, filtering, and meal selection.

The Catalog can run as a standalone application or be integrated into the main Yum Ta Dum Shell as a reusable Web Component.

The platform provides a clean and responsive experience while keeping the Catalog independent from the rest of the system.

---

## 🩷 Core Features

* 🔎 **Restaurant Discovery**

  * Browse available restaurants.
  * View featured restaurants and offers.
  * Explore restaurant categories.

* 🍽️ **Restaurant Details & Menus**

  * View restaurant information.
  * Browse grouped menu items.
  * View meal details and prices.

* 🔍 **Search System**

  * Search for restaurants.
  * Search for meals.
  * Combined search results through the `/search` route.

* 🎛️ **Filtering & Sorting**

  * Filter restaurant results.
  * Sort restaurants based on available catalog criteria.
  * Quickly discover relevant restaurants.

* 🛒 **Meal Selection**

  * Add meals to the shopping cart.
  * Communicates with the main Shell through custom browser events.

* 🧭 **Navigation**

  * Sends navigation requests to the Shell.
  * Keeps routing responsibilities organized between Microfrontends.

* 📱 **Responsive Design**

  * Clean and responsive Material UI interface.
  * Works across different screen sizes.

---

## 🏗️ System Design

* **Microfrontend Architecture**

  * Runs independently as a standalone React application.
  * Can also be loaded as a Web Component.
  * The Catalog is exposed as:

```html
<yum-catalog></yum-catalog>
```

* **Shell Integration**

  * The main Shell owns the global header, footer, and application navigation.
  * The Catalog handles restaurant discovery, menus, search, and meal selection.

* **Shadow DOM**

  * Uses an open Shadow DOM.
  * Helps isolate Catalog styles from other Microfrontends.
  * Prevents CSS conflicts with the main Shell.

* **Event-Based Communication**

  * Microfrontends communicate through custom browser events.

---

## 🔄 Microfrontend Events

### 🛒 Add Item to Cart

The Catalog dispatches:

```text
cart:add-item
```

With:

```ts
{
  item: MealItem
}
```

Used when a user selects a meal and wants to add it to the cart.

---

### 🧭 Navigation Request

The Catalog dispatches:

```text
navigation:requested
```

With:

```ts
{
  route: string
}
```

Used when the Catalog requests navigation through the main Shell.

Both events use:

```ts
bubbles: true
composed: true
```

---

## 📍 Application Routes

### `/`

Main discovery page containing:

* Categories
* Featured restaurants
* Offers
* Restaurant discovery

### `/restaurants`

Restaurant listing page containing:

* Search
* Filters
* Sorting
* Restaurant cards

### `/restaurants/:restaurantId`

Restaurant details page containing:

* Restaurant information
* Grouped menu
* Available meals
* Meal prices

### `/search`

Combined search page for:

* Restaurants
* Meals

---

## 💰 Price Handling

Meal prices remain numeric **ILS values** inside the application and event payloads.

Example:

```ts
price: 25
```

Currency formatting is applied only inside the UI:

```text
₪25
```

This keeps application data clean and reusable.

---

## 🔗 Project URLs

* 🌐 **Live Application**
  https://cbse-fathi.vercel.app/

* 🧩 **Microfrontend Bundle**
  https://cbse-fathi.vercel.app/mfe/yum-catalog.js

* 🎥 **Full Demo Video**
  https://drive.google.com/file/d/1pmaWmkh4zJ5gS2fHyTUSR4Cog1W-3V1q/view?usp=sharing

* 💻 **Local Development**

```text
http://127.0.0.1:5173/
```

---

## 📈 Key Improvements

* Clean Microfrontend architecture
* Standalone application support
* Reusable Web Component
* Restaurant discovery system
* Restaurant and meal search
* Filtering and sorting
* Restaurant menu browsing
* Event-driven Shell communication
* Shadow DOM style isolation
* Responsive Material UI design
* Tested Catalog data
* Tested event contracts
* Production-ready Microfrontend bundle

---

## 🛠️ Technologies Used

* React
* TypeScript
* Material UI (MUI)
* Vite
* Web Components
* Shadow DOM
* Custom Browser Events
* HTML
* CSS
* JavaScript
* Testing Tools
* Vercel

---

## 🧩 Shell Integration

The production build generates both:

* Standalone application inside `dist/`
* Microfrontend bundle inside:

```text
dist/mfe/yum-catalog.js
```

Load the Microfrontend bundle inside the main Yum Ta Dum Shell:

```html
<script
  type="module"
  src="https://cbse-fathi.vercel.app/mfe/yum-catalog.js"
></script>

<yum-catalog></yum-catalog>
```

The embedded Catalog automatically omits the standalone header and footer because the Shell owns the global application layout.

---

## 📁 Demo GIF

For the demo preview to appear inside GitHub, place the GIF inside:

```text
assets/yum-ta-dum-demo.gif
```

Project structure:

```text
project/
├── assets/
│   └── yum-ta-dum-demo.gif
├── src/
├── README.md
├── package.json
└── ...
```

The README displays it using:

```md
![Yum Ta Dum Demo](./assets/yum-ta-dum-demo.gif)
```

---

## ▶️ How to Run

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Enter the Project

```bash
cd <project-folder>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

---

## 🧪 Testing

Run the Catalog tests using:

```bash
npm test
```

The tests verify:

* Catalog data
* Search behavior
* Event contracts
* Microfrontend communication

---

## 🏭 Production Build

Create the production build:

```bash
npm run build
```

Build the Microfrontend bundle:

```bash
npm run build:mfe
```

The generated Microfrontend bundle will be available at:

```text
dist/mfe/yum-catalog.js
```

---

## 👥 Team

**Group 13**

Yum Ta Dum – Catalog & Discovery Microfrontend.
