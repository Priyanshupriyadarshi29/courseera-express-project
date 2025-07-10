# Coursera Express Project - Book Shop API

## Overview
This project is an Express.js API for a book shop, supporting user registration, login, book listing, search, and review management. It also includes a Node.js client script using Axios to demonstrate API usage.

## Features
- List all books
- Search books by ISBN, author, or title
- View book reviews
- Register and login users
- Add, modify, and delete book reviews (registered users)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   The server runs on `http://localhost:3000` by default.

3. **Run the client script:**
   ```bash
   npm run test
   ```
   This will execute the sample Axios methods in `client.js`.

## API Endpoints

### General Users
- `GET /books` — Get all books
- `GET /books/:isbn` — Get book by ISBN
- `GET /books/author/:author` — Get books by author
- `GET /books/title/:title` — Get books by title
- `GET /books/:isbn/review` — Get reviews for a book
- `POST /register` — Register a new user (JSON: `{ username, password }`)
- `POST /login` — Login (JSON: `{ username, password }`)

### Registered Users (require Bearer token)
- `PUT /books/:isbn/review` — Add/modify review (JSON: `{ review }`)
- `DELETE /books/:isbn/review` — Delete your review

## Notes
- All data is stored in-memory (resets on server restart).
- Use a tool like Postman or Insomnia to test endpoints manually.
- For protected routes, include the JWT token in the `Authorization` header as `Bearer <token>`.

## Submission
- Push your code to GitHub and submit the repository link as required. 