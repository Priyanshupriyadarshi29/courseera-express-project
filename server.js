const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = 'COURSE_SECRET_KEY';

// In-memory data
let books = {
  '9780143127741': {
    isbn: '9780143127741',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    reviews: {}
  },
  '9780439139601': {
    isbn: '9780439139601',
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    reviews: {}
  },
  '9780061120084': {
    isbn: '9780061120084',
    title: '1984',
    author: 'George Orwell',
    reviews: {}
  }
};

let users = [];

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token required' });
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
  res.json(Object.values(books));
});

// Task 2: Get the books based on ISBN
app.get('/books/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (book) return res.json(book);
  res.status(404).json({ message: 'Book not found' });
});

// Task 3: Get all books by Author
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author;
  const result = Object.values(books).filter(b => b.author.toLowerCase() === author.toLowerCase());
  res.json(result);
});

// Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
  const title = req.params.title;
  const result = Object.values(books).filter(b => b.title.toLowerCase() === title.toLowerCase());
  res.json(result);
});

// Task 5: Get book Review
app.get('/books/:isbn/review', (req, res) => {
  const book = books[req.params.isbn];
  if (book) return res.json(book.reviews);
  res.status(404).json({ message: 'Book not found' });
});

// Task 6: Register New user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
  if (users.find(u => u.username === username)) return res.status(409).json({ message: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: 'User registered successfully' });
});

// Task 7: Login as a Registered user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Task 8: Add/Modify a book review (Registered users)
app.put('/books/:isbn/review', authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const username = req.user.username;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.reviews[username] = review;
  res.json({ message: 'Review added/modified', reviews: book.reviews });
});

// Task 9: Delete book review added by that particular user
app.delete('/books/:isbn/review', authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (!book.reviews[username]) return res.status(404).json({ message: 'Review not found for user' });
  delete book.reviews[username];
  res.json({ message: 'Review deleted', reviews: book.reviews });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 