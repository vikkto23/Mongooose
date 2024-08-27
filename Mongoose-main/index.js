import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import personRoutes from './routes/personRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MongoDB URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Routes
app.use('/person', personRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
