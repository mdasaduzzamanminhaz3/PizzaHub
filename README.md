# 🍕 PizzaHub — Pizza Ordering & Delivery Platform

<p align="center">
  A modern, responsive pizza ordering platform built with Next.js, TypeScript, and MongoDB-powered authentication.
</p>

<p align="center">
  <a href="https://pizza-hub-delta.vercel.app/">Live Website</a> •
  <a href="https://github.com/mdasaduzzamanminhaz3/PizzaHub">Frontend Repository</a> •
  <a href="https://github.com/mdasaduzzamanminhaz3/PizzaHub-server">Backend Repository</a>
</p>

---

## 📌 Project Overview

**PizzaHub** is a full-stack pizza ordering and restaurant management platform designed to connect customers with restaurants through a seamless online food ordering experience.

Customers can explore pizza menus, discover different food categories, search for menu items, view product details, and manage their orders. Restaurant vendors can manage their restaurant profiles, publish menu items, monitor customer orders, and upgrade their subscription plans.

The platform also provides an administrative dashboard for managing users, reviewing menu items, and monitoring transactions.

PizzaHub offers a role-based experience with dedicated dashboards for Customers, Vendors, and Administrators.

## 🌐 Live Application

| Resource | Link |
|---|---|
| Live Website | https://pizza-hub-delta.vercel.app/ |
| Frontend GitHub | https://github.com/mdasaduzzamanminhaz3/PizzaHub |
| Backend GitHub | https://github.com/mdasaduzzamanminhaz3/PizzaHub-server |
| Backend API | https://pizzahub-server-olive.vercel.app/ |

## ✨ Key Features

### 🏠 Public Website
- Modern and responsive homepage.
- Featured pizza menu items.
- Explore different pizza categories.
- Browse available menu items.
- Search and filter menu items.
- View detailed information about menu items.
- Smooth animations and interactive UI elements.

### 🔐 Authentication
- Email and password authentication.
- Google authentication.
- User registration with account roles.
- Protected routes.
- Role-based navigation.
- User profile management.

### 👤 Customer Dashboard
- Customer dashboard overview.
- Browse available pizza items.
- Place food orders.
- View personal order history.
- Monitor order status.
- Cancel pending orders.
- Manage profile information.

### 🏪 Vendor Dashboard
- Vendor dashboard overview.
- Create and manage menu items.
- View menu item approval status.
- Update and delete menu items.
- Manage item availability.
- View customer orders.
- Accept or reject customer orders.
- Manage subscription information.

### 🛡️ Admin Dashboard
- Administrative dashboard overview.
- Manage registered users.
- View customers and vendors.
- Manage published menu items.
- Approve or reject menu submissions.
- Monitor platform transactions.

### 💳 Subscription & Payment
- Vendor subscription management.
- Free and Premium subscription plans.
- Stripe payment integration for vendor subscriptions.
- Payment success and cancellation pages.
- Payment status verification.

### 🎨 UI/UX
- Fully responsive layout.
- Light and dark theme support.
- Reusable UI components.
- Interactive charts and dashboard statistics.
- Toast notifications.
- Loading and empty states.
- Smooth page animations.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and application routing |
| React 19 | UI development |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling and responsive design |
| Shadcn UI | Reusable UI components |
| Base UI | Accessible UI primitives |
| Better Auth | Authentication |
| MongoDB Adapter | Authentication database integration |
| Framer Motion | UI animations |
| Stripe | Subscription payment integration |
| Stripe.js | Client-side Stripe integration |
| Recharts | Charts and data visualization |
| Next Themes | Light/Dark mode |
| Sonner | Toast notifications |
| Lucide React | Icons |
| React Icons | Additional icons |
| Embla Carousel | Carousel functionality |
| ESLint | Code quality |

## 📂 Project Structure

```text
pizzahub-client/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── dashboard/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── types/
│
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

*Note: The structure above represents a conceptual overview. Adjust it to match the actual folders in your repository.*

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js (20 or later recommended)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/mdasaduzzamanminhaz3/PizzaHub.git
```

### 2. Navigate to the Project Directory

```bash
cd PizzaHub
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

Add the environment variables required by your application configuration.

Example:

```env
# Application
NEXT_PUBLIC_API_URL=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# MongoDB
MONGODB_URI=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

**Important:** These are example variable names. Keep the names consistent with the actual references in your authentication, API, and payment configuration files. Never expose secret keys through public environment variables.

### 5. Start Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

### 6. Build for Production

```bash
npm run build
```

### 7. Start Production Server

```bash
npm run start
```

### 8. Run ESLint

```bash
npm run lint
```

## 🔗 Backend Integration

PizzaHub frontend communicates with a separate Express.js backend.

**Backend API Base URL:**

```text
https://pizzahub-server-olive.vercel.app
```

The frontend integrates with backend services for:

- Menu item management.
- Customer order management.
- Vendor operations.
- User profile management.
- Payment verification.
- Role-based access control.

## 🚀 Deployment

The frontend is deployed on **Vercel**.

Live URL:

https://pizza-hub-delta.vercel.app/

## 🔒 Security

- Authentication managed through Better Auth.
- Protected application routes.
- Role-based dashboard access.
- Environment-based configuration.
- Secure handling of sensitive credentials.
- Backend authorization for protected operations.

## 🔮 Future Improvements

- Advanced restaurant discovery.
- Enhanced menu filtering and sorting.
- Customer reviews and ratings.
- Favorites and wishlist functionality.
- Email notifications.
- Improved order tracking experience.

## 👨‍💻 Developer

**Md Asaduzzaman Minhaz**

- GitHub: [@mdasaduzzamanminhaz3](https://github.com/mdasaduzzamanminhaz3)
- Frontend Repository: [PizzaHub](https://github.com/mdasaduzzamanminhaz3/PizzaHub)

---

<p align="center">
  Made with ❤️ and 🍕
</p>

<p align="center">
  © 2026 PizzaHub. All Rights Reserved.
</p>