const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Task 10: Get all books – Using async callback function
async function getAllBooks(callback) {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    callback(null, response.data);
  } catch (error) {
    callback(error);
  }
}

// Task 11: Search by ISBN – Using Promises
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/books/${isbn}`)
    .then(response => response.data)
    .catch(error => { throw error; });
}

// Task 12: Search by Author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${encodeURIComponent(author)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Task 13: Search by Title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Example usage:
(async () => {
  // Task 10
  getAllBooks((err, books) => {
    if (err) console.error('Error (all books):', err.message);
    else console.log('All Books:', books);
  });

  // Task 11
  try {
    const book = await getBookByISBN('9780143127741');
    console.log('Book by ISBN:', book);
  } catch (err) {
    console.error('Error (by ISBN):', err.message);
  }

  // Task 12
  try {
    const booksByAuthor = await getBooksByAuthor('Harper Lee');
    console.log('Books by Author:', booksByAuthor);
  } catch (err) {
    console.error('Error (by Author):', err.message);
  }

  // Task 13
  try {
    const booksByTitle = await getBooksByTitle('1984');
    console.log('Books by Title:', booksByTitle);
  } catch (err) {
    console.error('Error (by Title):', err.message);
  }
})(); 