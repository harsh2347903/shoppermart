# ShopperMart - Full-Stack MERN E-Commerce Application

ShopperMart is a full-stack e-commerce web application featuring a responsive React frontend, modular Express REST API, MongoDB Atlas database modeling with Mongoose, and JWT authentication.

## 🚀 Features

- **Product Catalog**: Live product catalog loaded from MongoDB with category filtering and real-time title/description search.
- **Product Details**: Comprehensive detail pages displaying high-res images, pricing with discounts, specifications, shipping/warranty info, and verified reviews.
- **Authentication**: JWT token-based auth with bcrypt-hashed passwords. Pre-seeded demo user and admin accounts for testing.
- **Order Placement**: Intuitive checkout flow that stores shipping addresses and order items directly in MongoDB.
- **Modern UI / UX**: Built with clean CSS tokens, responsive layout, micro-animations, accessible labels, and pill badges.

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, React Router 7, Vanilla CSS
- **Backend**: Node.js, Express 5, Mongoose 9, JWT, bcryptjs, CORS
- **Database**: MongoDB / MongoDB Atlas

---

## 📂 Project Structure

```text
ShopperMart/
├── Backend/
│   ├── server/
│   │   ├── config/          # MongoDB connection configuration
│   │   ├── controllers/     # Route logic (auth, products, orders)
│   │   ├── data/            # Seed data and script
│   │   ├── middleware/      # Auth JWT verification, logger, notFound
│   │   ├── models/          # Mongoose schemas (User, Product, Order)
│   │   ├── routes/          # Express route definitions
│   │   ├── app.js           # Express app setup and middleware
│   │   └── index.js         # Entry point and server initialization
│   ├── .env.example
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── components/      # Header, SearchBar, ShopProductCard
    │   ├── pages/           # HomePage, ProductPage, LoginPage, AboutPage
    │   ├── services/        # Centralized fetch API wrapper
    │   ├── App.jsx          # Route declarations & global state
    │   ├── main.jsx         # React DOM entry
    │   └── styles.css       # Complete design system & responsive styling
    ├── .env.example
    ├── index.html
    └── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Local MongoDB on port 27017 or MongoDB Atlas connection string)

### 1. Setup Backend
```bash
cd Backend
npm install
cp .env.example .env
npm run seed     # Seeds initial products and demo accounts
npm run dev      # Starts server on http://localhost:3000
```

### 2. Setup Frontend
```bash
cd ../Frontend
npm install
cp .env.example .env
npm run dev      # Starts Vite dev server on http://localhost:5173
```

---

## 🔑 Demo Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Demo User** | `user@test.in` | `user123!` |
| **Admin** | `admin@test.in` | `Admin123!` |

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API health check | Public |
| `GET` | `/api/products` | Get all products (filter by `?category=`) | Public |
| `GET` | `/api/products/:id` | Get single product by ID | Public |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Log in and receive JWT | Public |
| `GET` | `/api/auth/me` | Get authenticated user profile | Bearer Token |
| `POST` | `/api/orders` | Place a new order | Optional/Bearer |
| `GET` | `/api/orders` | List user orders | Optional/Bearer |
