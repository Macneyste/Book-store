import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
 
// routes    API End points
app.get('/', (request, response) => {
    response.send('Welcome to the BSMS API');
});

// GET all Books
app.get('/api/books', (request, response) => {
    response.send('Get all Books');
});

// GET a single Book by ID
app.get('/api/books/:id', (request, response) => {
    const { id } = request.params;
    response.send(`Get Book with ID: ${id}`);
});

// POST save a book    waxa la boqana api/books
app.post('/api/books', (request, response) => {
    response.send('Save a new Book');
});

// PUT update a book by ID   waxa la boqana api/books/:id
app.put('/api/books/:id', (request, response) => {
    const { id } = request.params;
    response.send(`Update Book with ID: ${id}`);
});

// DELETE a book by ID   waxa la boqana api/books/:id
app.delete('/api/books/:id', (request, response) => {
    const { id } = request.params;
    response.send(`Delete Book with ID: ${id}`);
});