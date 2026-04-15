import Book from '../models/bookmodel.js';

export const getAllBooks = async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json(books);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

export const getBookById = async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

export const saveBook = async (request, response) => {
    const bookData = request.body ?? {};
    const {
        title,
        author,
        description,
        language,
        price,
        cover_image_url,
    } = bookData;

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
};

export const updateBook = async (request, response) => {
    const { id } = request.params;
    const updateData = request.body ?? {};

    if (Object.keys(updateData).length === 0) {
        return response.status(400).json({
            message: 'Please provide at least one field to update',
        });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json(updatedBook);
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
};

export const deleteBook = async (request, response) => {
    const { id } = request.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
};
