import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import scheduleRoutes from './routes/schedule.routes.js'
import cors from 'cors';
dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', scheduleRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
