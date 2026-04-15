import mongoose from 'mongoose';

// bookSchema-kan wuxuu qeexayaa qaabka book document kasta uu ku yeelanayo MongoDB.
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
  cover_image_url: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  // timestamps-ku waxay si otomaatig ah u abuuraan createdAt iyo updatedAt.
  timestamps: true,
});

// Book model-kan ayaa controllers-ku ku sameeyaan create, read, update, iyo delete.
const Book = mongoose.model('Book', bookSchema);

export default Book;
