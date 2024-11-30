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

1. Clone the repository: <mark>[git clone](https://github.com/esteemayo/react-ecommerce-store.git)</mark>
2. Change into the project directory: <mark>cd your-repo-name</mark>
3. Install dependencies: <mark>npm install</mark> or <mark>yarn install</mark>
4. Create a <mark>.env</mark> file and add the following environment variables:

- VITE_APP_STRIPE_PUBLISHABLE_KEY: Stripe publishable key
- VITE_APP_FIREBASE_API_KEY: Firebase API key
- VITE_APP_DEV_API_URL: Application development server URL
- VITE_APP_PROD_API_URL: Application production server URL

5. Start the application: <mark>npm run dev</mark> or <mark>yarn dev</mark>

## Usage

1. Open a web browser and navigate to [http://localhost:5173](http://localhost:5173)
2. Click on the "Login" button to authenticate
3. Browse the products and add items to your cart
4. Click on the "Checkout" button to place an order
5. Enter your payment information and complete the order
6. Click on the "Leave a review" button to add a review on a product
