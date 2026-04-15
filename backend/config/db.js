import mongoose from 'mongoose';

// connectDB function-kan waa meesha backend-ku uga xirmayo MongoDB.
// Wuxuu akhriyaa LOCAL_MONGO_DB_URI oo ku jira .env.
const connectDB = async () => {
  const mongoURI = process.env.LOCAL_MONGO_DB_URI;

  // Haddii env variable-ku maqan yahay, app-ku ma sii socon karo sababtoo ah
  // database la'aan CRUD operations-ku ma shaqaynayaan.
  if (!mongoURI) {
    console.error('LOCAL_MONGO_DB_URI is not defined.');
    process.exit(1);
  }

  try {
    // mongoose.connect() wuxuu sameynayaa connection-ka dhabta ah ee MongoDB.
    const connection = await mongoose.connect(mongoURI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    // Haddii connection-ku dhaco, error-ka waan soo bandhigaynaa
    // kadibna process-ka waan joojinaynaa si app-ku uusan half-working u noqon.
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
