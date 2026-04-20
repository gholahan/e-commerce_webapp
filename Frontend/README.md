# Modern E-Commerce Web Application
A modern, responsive e-commerce web application built with React, Vite, and TypeScript.
Users can browse products, manage a cart and wishlist, and authenticate using demo accounts.

## Live Preview Link
[View the App](https://e-commerce-webapp-riz3.vercel.app/)

## Demo Accounts
Login using any DummyJSON user(https://dummyjson.com/users)

Example credentials:

 Username | Password |
|----------|----------|
| emilys | emilyspass |
| michaelw | michaelwpass |

## Features
- **Product Browsing:** Full catalog with pagination (24 per page)
- **Search:** Modal preview with “See all” to move to page, sharable URLs for each search
- **Cart:** Add/remove items, adjust quantities
- **Wishlist:** Save and manage favorites
- **Checkout:** Auto subtotal & total calculation
- **Auth:** JWT-protected routes
- **UI:** Responsive design, skeleton loaders, toast notifications


## Tech Stack
- **Frontend:** React, TypeScript, Vite  
- **Styling:** Tailwind CSS  
- **State Management:** TanStack Query (Server State), Zustand (Client State)  
- **Routing:** React Router  
- **Forms & Validation:** Formik, Yup  
- **API & HTTP:** Axios, [DummyJSON](https://dummyjson.com)  
- **UI & Feedback:** React Toastify, React Icons, Lucide React  
- **Deployment:** Vercel

## Getting Started
```bash
git clone https://github.com/gholahan/e-commerce_webapp.git
cd e-commerce_webapp
npm install
npm run dev
```

## Architecture
The project uses a feature-based folder structure — each feature contains its own components, skeletons, hooks, services, types, and store, keeping related code grouped together for scalability and maintainability.

```bash
src/
├─ app/
│  ├─ routes/
│  └─ axios.ts
│
├─ features/
│  ├─ auth/
│  ├─ products/
│  ├─ cart/
│  ├─ checkout/
│  └─ wishlist/
│
├─ layouts/
├─ pages/
├─ shared/
│
├─ App.tsx
├─ main.tsx
└─ index.css
```

## State Management
- **TanStack Query:** Handles server state, caching, and background updates  
- **Zustand:** Manages lightweight client-side global state

## Authentication
- JWT-based authentication with protected and public route guards.
- Axios request interceptors automatically attach access tokens.
- Axios response interceptors handle token expiration and refresh.

## API Reference
Powered by the [DummyJSON API](https://dummyjson.com/).

- [Full API documentation](https://dummyjson.com/docs)
- [List of demo users](https://dummyjson.com/users)

## UI Inspo
https://www.figma.com/design/PBL1XNC8OQgcQhElK6omzI/Full-E-Commerce-Website-UI-UX-Design
