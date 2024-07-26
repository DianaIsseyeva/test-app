## Overview

This is the frontend for a simple PWA application built using the React framework. The application includes a product catalog, user registration, login, and a shopping cart. The backend is implemented using Strapi.

## Requirements

- Node.js
- npm (or yarn)

# Getting Started

Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/DianaIsseyeva/test-app.git
cd test-app
npm install
```

# Running the Application

To start the application, use the following command:

```bash
npm start
```

This will run the app in development mode. Open http://localhost:3000 to view it in your browser.

# Building for Production

To build the app for production, use:

```bash
npm run build
```

This will create a build directory with the production build of your app.

# Features

## User Authentication

- Register: Users can create an account with a username, email, and password.
- Login: Registered users can log in to access their shopping cart and other features.

## Product Catalog

- Displays a list of available products with details such as title, price, and image.
- Product info window: Detailed view of a selected product.

## Shopping Cart

- Users can add and remove products from their shopping cart.
- The cart is updated in real-time using WebSocket.

## WebSocket Integration

The application connects to a WebSocket server to receive real-time updates for the following events:

- Product created
- Product updated
- Product deleted

# License

This project is licensed under the MIT License.
