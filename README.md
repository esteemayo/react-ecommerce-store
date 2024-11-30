# E-commerce Store Application

A fast and scalable e-commerce store application built using Vite, Axios, React Query, Styled Components, React Router Dom, React Stripe Checkout, Firebase for image upload and more.

## Table of Contents

1. #overview
2. #features
3. #technical-requirements
4. #setup-and-installation
5. #usage
6. #payment-gateway
7. #image-upload
8. #api-endpoints
9. #contributing
10. #license

## Overview

This e-commerce store application allows users to browse and purchase products, manage their accounts, and track their orders. The application uses Vite for fast and efficient development, Axios for making HTTP requests, React Query for managing data fetching and caching, Styled Components for styling, React Router Dom for client-side routing, React Stripe checkout for payment processing, and Firebase for image upload.

## Features

- User authentication and authorization
- Product browsing and purchasing
- Order management and tracking
- User account management
- Payment processing using Stripe
- Image upload using Firebase
- Fast and efficient development using Vite
- Data fetching and caching using React Query
- Styling using Styled Components
- Client-side routing using React Router Dom

## Techical Requirements

- Node.js (20.x)
- Vite (5.x)
- Axios (0.26.x)
- React Query (5.x)
- Styled Components (6.x)
- React Router Dom (6.x)
- React Stripe Checkout (2.x
- Firebase (10.x))

## Setup and Installation

1. Clone the repository: <mark>git clone [https://github.com/esteemayo/react-ecommerce-store.git](https://github.com/esteemayo/react-ecommerce-store.git)</mark>
2. Change into the project directory: <mark>cd your-repo-name</mark>
3. Install dependencies: <mark>npm install</mark> or <mark>yarn install</mark>
4. Create a <mark>.env</mark> file and add the following environment variables:

- <mark>VITE_APP_STRIPE_PUBLISHABLE_KEY:</mark> Stripe publishable key
- <mark>VITE_APP_FIREBASE_API_KEY:</mark> Firebase API key
- <mark>VITE_APP_DEV_API_URL:</mark> Application development server URL
- <mark>VITE_APP_PROD_API_URL:</mark> Application production server URL

5. Start the application: <mark>npm run dev</mark> or <mark>yarn dev</mark>

## Usage

1. Open a web browser and navigate to [http://localhost:5173](http://localhost:5173)
2. Click on the "Login" button to authenticate
3. Browse the products and add items to your cart
4. Click on the "Checkout" button to place an order
5. Enter your payment information and complete the order
6. Click on the "Leave a review" button to add a review on a product

## Payment Gateway

This application uses Stripe for Payment Processing. The <mark>VITE_APP_STRIPE_PUBLISHABLE_KEY</mark> and <mark>STRIPE_SECRET_KEY</mark> from the backend environment variables are used to secure the payment process.

## Image Upload

This application uses Firebase for image upload. The <mark>VITE_APP_FIREBASE_API_KEY</mark>, <mark>VITE_APP_FIREBASE_AUTH_DOMAIN</mark>, <mark>VITE_APP_FIREBASE_PROJECT_ID</mark>, <mark>VITE_APP_FIREBASE_STORAGE_BUCKET</mark>, <mark>VITE_APP_FIREBASE_MESSAGE_SENDER_ID</mark>, and <mark>VITE_APP_FIREBASE_APP_ID</mark> environment variables are used to secure the image upload process.

## API Endpoints

The following API endpoints are available:

### Authentication Endpoints

- <mark>POST /api/v1/auth/login:</mark> Authenticates a user and returns a JSON Web Token (JWT).
- <mark>POST /api/v1/auth/facebook-login:</mark> Authenticates a user and returns a JSON Web Token (JWT).
- <mark>POST /api/v1/auth/google-login:</mark> Authenticates a user and returns a JSON Web Token (JWT).
- <mark>POST /api/v1/auth/register:</mark> Creates a new user and returns user data and JWT.
- <mark>POST /api/v1/auth/logout:</mark> Clears authenticated user's token from the cookie.
- <mark>POST /api/v1/auth/forgot-password:</mark> Sends a request to reset a user's password through email.
- <mark>POST /api/v1/auth/reset-password/:token:</mark> Reset a user password.
- <mark>PATCH /api/v1/auth/update-my-password:</mark> Updates authenticated user's password.

### User Endpoints

- <mark>GET /api/v1/users:</mark> Returns the users data, for the authenticated admin.
- <mark>GET /api/v1/users/:id:</mark> Returns a single user by ID.
- <mark>GET /api/v1/users/me:</mark> Returns authenticated user data.
- <mark>GET /api/v1/users/stats:</mark> Returns number of registered users in each month of the year.
- <mark>POST /api/v1/users:</mark> Cannot be used to create a new user.
- <mark>PATCH /api/v1/users/:id:</mark> Updates a single user data, for the authenticated admin.
- <mark>PATCH /api/v1/users/update-me:</mark> Updates the authenticated user's data such as name, email, username, image, etc. But cannot update authenticated user's password.
- <mark>PATCH /api/v1/users/update-email:</mark> Updates authenticated user's email address.
- <mark>DELETE /api/v1/users/:id:</mark> Deletes a single user by ID, for the authenticated admin.
- <mark>DELETE /api/v1/users/delete-me:</mark> Deletes authenticated user's data, authorized by both authenticated user and admin.

### Product Endpoints

- <mark>GET /api/v1/products:</mark> Returns a list of products.
- <mark>GET /api/v1/products/stats:</mark> Returns the products statistics by the ratings average.
- <mark>GET /api/v1/products/tags:</mark> Returns a list of products with one or more related or common tags.
- <mark>GET /api/v1/products/:id:</mark> Returns a single product by ID.
- <mark>GET /api/v1/products/count-by-category:</mark> Returns total number of products in a category.
- <mark>GET /api/v1/products/search:</mark> Returns a list of products by the product's name search query.
- <mark>GET /api/v1/products/details/:slug:</mark> Returns a single product by SLUG.
- <mark>POST /api/v1/products:</mark> Create a new product.
- <mark>PATCH /api/v1/products/:id:</mark> Updates a product by ID.
- <mark>PATCH /api/v1/products/like/:id:</mark> Handles the likes functionality of a product.
- <mark>PATCH /api/v1/products/views/:id:</mark> Increment the number of views on a product.
- <mark>DELETE /api/v1/products/:id:</mark> Deletes a product by ID.

### Order Endpoints

- <mark>GET /api/v1/orders:</mark> Returns a list of orders for the authenticated admin.
- <mark>GET /api/v1/orders/my-orders:</mark> Returns a list of orders for the authenticated user.
- <mark>GET /api/v1/orders/income:</mark> Returns the monthly income generated from a list of orders.
- <mark>GET /api/v1/orders/:id:</mark> Returns a single order by ID.
- <mark>POST /api/v1/orders:</mark> Creates a new order for the authenticated user.
- <mark>PATCH /api/v1/orders/:id:</mark> Updates an order by ID for the authenticated admin.
- <mark>DELETE /api/v1/orders/:id:</mark> Deletes an order by ID for the authenticated admin

### Cart Endpoints

- <mark>GET /api/v1/carts:</mark> Returns a list of cart items.
- <mark>GET /api/v1/carts/:id:</mark> Returns a single cart item by ID.
- <mark>POST /api/v1/carts:</mark> Create a new cart item.
- <mark>PATCH /api/v1/carts/:id:</mark> Updates a cart item by ID.
- <mark>DELETE /api/v1/carts/:id:</mark> Deletes a cart item by ID.

### Category Endpoints

- <mark>GET /api/v1/categories:</mark> Returns a list of categories for the authenticated admin.
- <mark>GET /api/v1/categories/:id:</mark> Returns a single category by ID for the authenticated admin.
- <mark>POST /api/v1/categories:</mark> Create a new category for the authenticated admin.
- <mark>PATCH /api/v1/categories/:id:</mark> Updates a category by ID for the authenticated admin.
- <mark>DELETE /api/v1/categories/:id:</mark> Deletes a category by ID for the authenticated admin.

### Review Endpoints

- <mark>GET /api/v1/reviews:</mark> Returns a list of reviews.
- <mark>GET /api/v1/reviews/top:</mark> Returns a list of reviews where rating is greater or equals to <mark>4.5</mark>.
- <mark>GET /api/v1/reviews/total-reviews/:id:</mark> Returns the total number of ratings on a product.
- <mark>GET /api/v1/reviews/:id:</mark> Returns a single review by ID for the authenticated user.
- <mark>POST /api/v1/reviews:</mark> Creates a new review for the authenticated user.
- <mark>PATCH /api/v1/reviews/:id:</mark> Updates a review by ID for the authenticated user or admin.
- <mark>DELETE /api/v1/reviews/:id:</mark> Deletes a review by ID for the authenticated user or admin.

### Checkout Endpoints

- <mark>POST /api/v1/checkout:</mark> Creates a charge on a customer's payment method.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

This project is licensed under the MIT License.
