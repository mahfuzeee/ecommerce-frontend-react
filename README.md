# Ecommerce Frontend React

This repository contains a complete React-based e-commerce frontend ecosystem with two separate applications:

- `ecommerce/` — customer-facing storefront for browsing products, cart, checkout flow, and account-related pages
- `super-admin/` — admin dashboard for managing products, categories, brands, orders, reviews, and other store operations

The project is built with React, Vite, Bootstrap, Zustand, React Router, Axios, and a modular component-based structure.

## Project Structure

```bash
.
├── ecommerce/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── super-admin/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── example.env
│   └── README.md
├── README.md
└── vercel.json
```

## Apps Included

### 1. Frontend Store (`ecommerce`)

This app is meant for end users and includes pages such as:

- Home page and hero sections
- Product listing and product details
- Shopping cart and checkout flow
- Contact page
- User login and registration
- Order tracking and review flow
- Responsive storefront UI

### 2. Super Admin (`super-admin`)

This app is for store administration and includes dashboards and management panels for:

- Products
- Categories and brands
- Orders
- Reviews
- Dashboard overview and analytics widgets
- Product creation and updates

## Tech Stack

- React 19
- Vite
- JavaScript
- Bootstrap 5
- React Router DOM
- Zustand for state management
- Axios for API communication
- React Query for data fetching
- Swiper, Slick, ApexCharts, and other UI libraries
- Sass for styling

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js 18+
- npm 9+

## Installation

Clone the repository:

```bash
git clone https://github.com/mahfuzeee/ecommerce-frontend-react.git
cd ecommerce-frontend-react
```

Install dependencies for each app separately:

```bash
cd ecommerce
npm install

cd ../super-admin
npm install
```

## Running the Applications

### Run the storefront app

```bash
cd ecommerce
npm run dev
```

The app will start in development mode and usually open in the browser at:

```bash
http://localhost:5173
```

### Run the admin app

```bash
cd super-admin
npm run dev
```

The admin app will also run through Vite, typically at:

```bash
http://localhost:5173
```

If both apps are running at the same time, they may use different ports if configured separately. You can adjust Vite settings if needed.

## Production Build

To build each app for production:

```bash
cd ecommerce
npm run build

cd ../super-admin
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment Configuration

The admin app includes an `example.env` file. Create your own `.env` file based on it if your app requires API configuration or environment variables.

Example:

```bash
cp example.env .env
```

Update the values according to your backend or deployment setup.

## Notes

- This project is structured as a frontend monorepo with separate apps for customer and admin flows.
- API endpoints and backend configuration should be aligned with your actual service URLs.
- The root project is not a full-stack app by itself; it is a frontend repository with multiple UI applications.

## License

This project is currently licensed under the ISC license.

## Repository

- GitHub: https://github.com/mahfuzeee/ecommerce-frontend-react
