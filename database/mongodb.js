import mongoose from "mongoose";

import { DATABASE_URL, NODE_ENV } from "../config/env.js"; 

// if Connection to MongoDB fails
if (!DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.<development/production>.local");
}

// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
    }
    catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectToMongoDB;