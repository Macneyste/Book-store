import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import sampleBooks from '../data/sampleBooks.js';
import Book from '../models/bookmodel.js';

dotenv.config();

// seedBooks script-kan wuxuu geliyaa sample books database-ka
// isaga oo aan tirtirin records hore u jiray.
const seedBooks = async () => {
  let insertedCount = 0;
  let skippedCount = 0;

  try {
    // Marka hore waxaan ku xirmeynaa MongoDB si aan insert/upsert u samayn karno.
    await connectDB();

    // Book walba waxaa lagu daraa oo keliya haddii title iyo author isku mid ah aysan hore u jirin.
    for (const book of sampleBooks) {
      const result = await Book.updateOne(
        {
          title: book.title,
          author: book.author,
        },
        {
          $setOnInsert: book,
        },
        {
          upsert: true,
        },
      );

      if (result.upsertedCount > 0) {
        insertedCount += 1;
      } else {
        skippedCount += 1;
      }
    }

    console.log(`Sample books inserted: ${insertedCount}`);
    console.log(`Sample books skipped: ${skippedCount}`);
  } catch (error) {
    console.error('Error while seeding sample books:', error.message);
    process.exitCode = 1;
  } finally {
    // Ugu dambayn connection-ka MongoDB waa la xirayaa si script-ku si nadiif ah u dhammaado.
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
  }
};

seedBooks();
