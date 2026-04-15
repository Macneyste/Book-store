import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Book from './models/bookmodel.js';
dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
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
app.post('/api/books', async (request, response) => {
    const bookData = request.body ?? {};
    const { title, author, description, language, price, cover_image_url } = bookData;

    if (!title || !author || !description || !language || price === undefined) {
        return response.status(400).json({
            message: 'Please provide all required fields: title, author, description, language, price',
        });
    }

    try {
        const newBook = await Book.create({
            title,
            author,
            description,
            language,
            price,
            cover_image_url,
        });

        return response.status(201).json(newBook);
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
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
