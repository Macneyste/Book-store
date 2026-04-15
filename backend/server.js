import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookRoutes from './routes/book.route.js';

// dotenv wuxuu akhriyaa PORT iyo LOCAL_MONGO_DB_URI si app-ku uga faa'iidaysto .env.
dotenv.config();

// app-kan waa instance-ka ugu weyn ee Express oo dhan.
const app = express();

// PORT-kan wuxuu ka imanayaa .env, haddii uusan jirinna 3000 ayaa la isticmaalayaa.
const PORT = process.env.PORT || 3000;

// cors-kan wuxuu u oggolaanayaa frontend-ka local-ka ah inuu backend-ka wici karo.
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
}));

// express.json() wuxuu noo beddelaa request body-ga JSON si aan ugu akhrin karno req.body.
app.use(express.json());

// Route-kan wuxuu ururinayaa dhammaan CRUD endpoints-ka books-ka.
app.use('/api/books', bookRoutes);

// startServer function-kan wuxuu marka hore xiraa database-ka,
// kadibna wuxuu shidayaa server-ka Express.
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer();
