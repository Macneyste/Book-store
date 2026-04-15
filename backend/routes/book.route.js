import { Router } from 'express';
import {
    deleteBook,
    getAllBooks,
    getBookById,
    saveBook,
    updateBook,
} from '../controllers/book.controller.js';

const router = Router();

// Get all books end-point
router.get('/', getAllBooks);

// Get single book end-point
router.get('/:id', getBookById);

// Create book end-point
router.post('/', saveBook);

// Update book end-point
router.put('/:id', updateBook);

// Delete book end-point
router.delete('/:id', deleteBook);

export default router;
