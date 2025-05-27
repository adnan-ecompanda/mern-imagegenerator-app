import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World API');
});
app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});