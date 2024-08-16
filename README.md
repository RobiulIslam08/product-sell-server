# Product Search and Filtering Backend

This is the backend server for a product search and filtering application. The server is built using Node.js and Express.js, and it connects to a MongoDB database to store and retrieve product data.

## Features

- **Product APIs**: RESTful APIs for fetching, searching, filtering, and sorting products.
- **Pagination**: Server-side pagination for efficient data loading.
- **Authentication**: Firebase authentication integration for user management.

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB & Mongoose**: Database and ORM
- **Firebase Admin SDK**: For authentication
- **dotenv**: For environment variables

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

## API Endpoints

- `GET /products`: Get all products with pagination, search, filtering, and sorting.
  - Query Parameters:
    - `page`: Page number (default is 1)
    - `limit`: Number of products per page (default is 10)
    - `search`: Search query for product names (optional)
    - `brand`: Filter by brand name (optional)
    - `category`: Filter by category name (optional)
    - `priceRange`: Filter by price range, e.g., `100-500` (optional)
    - `sortBy`: Sort by field (`price` or `date`, default is `date`)
    - `sortOrder`: Sort order (`asc` or `desc`, default is `desc`)
- `GET /`: A simple route to test if the API is running.
