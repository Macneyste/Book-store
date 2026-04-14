import mongoose from "mongoose";

const connectDB = async () => {
    const mongoURI = process.env.LOCAL_MONGO_DB_URI;

    if (!mongoURI) {
        console.error("LOCAL_MONGO_DB_URI is not defined.");
        process.exit(1);
    }

    try {
        const connection = await mongoose.connect(mongoURI);

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
