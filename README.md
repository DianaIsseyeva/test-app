## Overview

This is the frontend for an application built using the React framework. The application includes a product catalog, user registration, login, and a shopping cart. The backend is implemented using Strapi.

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

# Technologies Used

This project leverages a variety of modern technologies and libraries to ensure a robust and efficient development process. Below are the key dependencies and their purposes:

- RTK Query: A powerful data fetching and caching tool built on top of Redux Toolkit.
- Ant Design: A comprehensive UI component library based on Ant Design specifications, providing pre-designed components for faster UI development.
- Axios: A promise-based HTTP client for making requests to the Strapi backend.
- Socket.io-client: A library for real-time, bidirectional and event-based communication between the browser and the server using WebSockets.
- Typescript: A typed superset of JavaScript that compiles to plain JavaScript, adding static types for better development experience.

# License

This project is licensed under the MIT License.
