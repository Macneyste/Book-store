import mongoose from 'mongoose';
import Book from '../models/bookmodel.js';

// Function-kan wuxuu soo celiyaa dhammaan buugaagta ku jirta database-ka.
export const getAllBooks = async (request, response) => {
    try {
        // Halkan waxaan ka soo qaadeynaa dhammaan books-ka ku jira database-ka.
        // lean() wuxuu ka dhigaa response-ka mid sahlan oo degdeg ah maadaama aan kaliya akhrineyno xogta.
        const books = await Book.find({}).lean();

        return response.status(200).json(books);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

// Function-kan wuxuu soo saaraa hal book iyadoo lagu raadinayo id-ga URL-ka ku jira.
export const getBookById = async (request, response) => {
    // Halkan waxaan ka qaadaneynaa id-ga laga soo diray URL-ka.
    const { id } = request.params;

    // Haddii id-ga uusan ahayn MongoDB ObjectId sax ah, request-ka waa la diidayaa.
    if (!mongoose.isValidObjectId(id)) {
        return response.status(400).json({ message: 'Invalid book id' });
    }

    try {
        // Halkan waxaan ku raadineynaa hal book anagoo adeegsaneyna Mongoose method-ka findById().
        // lean() wuxuu soo celinayaa plain object, taas oo ku fiican marka aan response ahaan u dirayno xogta.
        const book = await Book.findById(id).lean();

        // Haddii book-ga la waayo, 404 ayaa la celinayaa.
        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

// Function-kan wuxuu keydiyaa book cusub oo laga soo diray request body-ga.
export const saveBook = async (request, response) => {
    // Halkan waxaan ka qaadaneynaa xogta uu user-ku soo diray.
    const bookData = request.body ?? {};
    const {
        title,
        author,
        description,
        language,
        price,
        cover_image_url,
    } = bookData;

    // Haddii xogaha muhiimka ahi dhiman yihiin, request-ka waa la diidayaa.
    if (!title || !author || !description || !language || price === undefined) {
        return response.status(400).json({
            message: 'Please provide all required fields: title, author, description, language, price',
        });
    }

    try {
        // Halkan book cusub ayaa lagu abuurayaa database-ka.
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
};

// Function-kan wuxuu cusbooneysiiyaa book jira iyadoo la adeegsanayo id-ga.
export const updateBook = async (request, response) => {
    const { id } = request.params;

    // Halkan waxaan ka qaadaneynaa xogta cusub ee lagu update gareynayo book-ga.
    const updateData = request.body ?? {};

    // Haddii id-ga uusan sax ahayn, request-ka waa la diidayaa.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ message: 'Invalid book id' });
    }

    // Haddii body-gu madhan yahay, lama hayo wax la update gareeyo.
    if (Object.keys(updateData).length === 0) {
        return response.status(400).json({
            message: 'Please provide at least one field to update',
        });
    }

    try {
        // Halkan waxaan ku update gareyneynaa book-ga la helay.
        // new: true wuxuu soo celinayaa xogta cusub, runValidators-na wuxuu hubiyaa schema-ga.
        const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        // Haddii book-ga la update gareynayo uusan jirin, 404 ayaa la celinayaa.
        if (!updatedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json(updatedBook);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

// Function-kan wuxuu tirtiraa book iyadoo lagu saleynayo id-ga.
export const deleteBook = async (request, response) => {
    const { id } = request.params;

    // Haddii id-ga uusan sax ahayn, request-ka waa la diidayaa.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ message: 'Invalid book id' });
    }

    try {
        // Halkan waxaan ku tirtireynaa book-ga id-giisa lagu helay.
        const deletedBook = await Book.findByIdAndDelete(id);

        // Haddii book-ga la tirtirayo la waayo, 404 ayaa la celinayaa.
        if (!deletedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }

        // Haddii tirtiriddu guuleysato, fariin guul ah ayaa la celinayaa.
        return response.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};
