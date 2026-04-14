import mongoose from "mongoose";

// schema for book
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true, 
    },
    cover_image_url: {type: String},
      price:{type: Number, required: true},}, {
    timestamps: true,
});
{timestamps: true} // this will automatically add createdAt and updatedAt fields

// model for book
const Book = mongoose.model('Book', bookSchema);

export default Book;