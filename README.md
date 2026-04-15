# Book Store Management System

A full-stack book management application built with **React**, **Vite**, **Tailwind CSS**, **Zustand**, **Express**, and **MongoDB**. The project allows users to create, read, update, delete, and view details of books through a clean frontend and a REST API backend.

## Overview

This project is organized into two main parts:

- **Backend**: Express REST API with MongoDB and Mongoose
- **Frontend**: React application built with Vite, styled using Tailwind CSS

The application currently supports:

- Viewing all books
- Viewing a single book details page
- Adding a new book
- Updating an existing book
- Deleting a book
- Confirmation dialog before delete
- Zustand-based client state management
- Vite proxy configuration for frontend-to-backend API communication

## Tech Stack

### Frontend

- React 18
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Zustand

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose 8
- dotenv
- cors
- nodemon

## Project Structure

```text
BSMS/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── book.controller.js
│   ├── models/
│   │   └── bookmodel.js
│   ├── routes/
│   │   └── book.route.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## Environment Variables

### Backend `.env`

Create a `.env` file in the project root:

```env
PORT=3000
LOCAL_MONGO_DB_URI=mongodb://localhost:27017/bookstore_management_system
```

### Frontend optional environment

If you want to change the Vite proxy target, you can add this inside `frontend/.env`:

```env
VITE_API_PROXY_TARGET=http://127.0.0.1:3000
```

If this variable is not provided, the frontend proxy defaults to:

```env
http://127.0.0.1:3000
```

## Installation

### 1. Install backend dependencies

From the project root:

```bash
npm install
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

## Running the Project

### Start the backend

From the project root:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

### Start the frontend

Open a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Frontend Routes

| Route | Description |
|---|---|
| `/` | Home page showing all books |
| `/add-book` | Page for adding a new book |
| `/books/:id` | Single book details page |

## REST API Endpoints

Base URL:

```text
http://localhost:3000/api/books
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | Get all books |
| `GET` | `/api/books/:id` | Get a single book by ID |
| `POST` | `/api/books` | Create a new book |
| `PUT` | `/api/books/:id` | Update an existing book |
| `DELETE` | `/api/books/:id` | Delete a book |

## Request Body for Create and Update

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "description": "A practical guide to building good habits and breaking bad ones.",
  "language": "English",
  "price": 20,
  "cover_image_url": "https://example.com/book-cover.jpg"
}
```

## Book Model

The MongoDB book document contains:

| Field | Type | Required |
|---|---|---|
| `title` | `String` | Yes |
| `author` | `String` | Yes |
| `description` | `String` | Yes |
| `language` | `String` | Yes |
| `price` | `Number` | Yes |
| `cover_image_url` | `String` | No |
| `createdAt` | `Date` | Auto |
| `updatedAt` | `Date` | Auto |

## Backend Architecture

### `backend/server.js`

Responsible for:

- loading environment variables
- connecting to MongoDB
- enabling CORS
- parsing JSON requests
- registering `/api/books` routes
- starting the Express server

### `backend/config/db.js`

Responsible for:

- reading `LOCAL_MONGO_DB_URI`
- connecting the backend to MongoDB using Mongoose

### `backend/routes/book.route.js`

Responsible for:

- mapping HTTP methods and paths to controller functions

### `backend/controllers/book.controller.js`

Responsible for:

- fetching all books
- fetching one book by ID
- creating a book
- updating a book
- deleting a book
- handling validation and API responses

### `backend/models/bookmodel.js`

Responsible for:

- defining the Mongoose schema
- enforcing required book fields
- automatically adding timestamps

## Frontend Architecture

### `frontend/src/store/useBookStore.js`

Responsible for:

- global book state management with Zustand
- fetching all books
- fetching one book by ID
- creating a book
- updating a book
- deleting a book
- handling loading and error states

### `frontend/src/components`

Main reusable UI components:

- `Navbar.jsx`
- `BookCard.jsx`
- `ConfirmationDialog.jsx`
- `UpdateBookModal.jsx`

### `frontend/src/pages`

Main pages:

- `HomePage.jsx`
- `AddBookPage.jsx`
- `BookDetailsPage.jsx`

## Proxy Configuration

The frontend uses a Vite proxy so that API calls such as:

```js
fetch('/api/books')
```

are forwarded to the backend server automatically.

Current proxy setup:

- frontend dev server: `http://localhost:5173`
- backend API target: `http://127.0.0.1:3000`

This removes the need to hardcode the backend URL inside frontend components.

## Available Scripts

### Root scripts

```bash
npm run dev
npm start
npm run seed:books
```

### Frontend scripts

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## Current Features Implemented

- Full CRUD for books
- Book details page
- Update book modal
- Delete confirmation dialog
- Cover image URL support
- Responsive UI with Tailwind CSS
- Zustand store for centralized state management
- Frontend routing with React Router
- Proxy-based local API communication

## Requirements

To run this project smoothly, make sure you have:

- Node.js 18 or later
- npm
- MongoDB running locally

## Notes

- The backend expects MongoDB to be running before the server starts.
- The backend reads environment variables from the root `.env` file.
- The frontend communicates with the backend through the configured Vite proxy.
- Book cover images are loaded from the `cover_image_url` field.

## Author

Prepared for the **BSMS Book Store Management System** project.
