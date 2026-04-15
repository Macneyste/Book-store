import { Router } from 'express';
import {
    deleteBook,
    getAllBooks,
    getBookById,
    saveBook,
    updateBook,
} from '../controllers/book.controller.js';

const router = Router();

// Route-kan wuxuu soo celiyaa dhammaan buugaagta.
router.get('/', getAllBooks);

// Route-kan wuxuu soo celiyaa hal book iyadoo id-ga lagu raadinayo.
router.get('/:id', getBookById);

// Route-kan wuxuu keydiyaa book cusub.
router.post('/', saveBook);

// Route-kan wuxuu cusbooneysiiyaa book jira iyadoo la adeegsanayo id-ga.
router.put('/:id', updateBook);

// Route-kan wuxuu tirtiraa book iyadoo la adeegsanayo id-ga.
router.delete('/:id', deleteBook);

export default router;
