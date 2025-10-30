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
const crossOptions={
  origin:["http://localhost:5173","https://www.neuroplan.me"],
  methods:"GET,POST,PUT,PATCH",
  credentials:true
}
app.use(cors(crossOptions));
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', scheduleRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
