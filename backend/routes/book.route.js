import { Router } from 'express';
import {
    deleteBook,
    getAllBooks,
    getBookById,
    saveBook,
    updateBook,
} from '../controllers/book.controller.js';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', saveBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
