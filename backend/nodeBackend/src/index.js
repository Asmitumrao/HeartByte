import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

// Connect to MongoDB
connectDB();



// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
const client =process.env.CLIENT_URL;
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://vercel.com/asmit-umraos-projects/heart-byte/BfjnJ8S8CaMDg5tbrPfjH7cxUrFc",
    "https://heart-byte.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev')); 

// --------------------------------------------------------------------------------------------------------


// import routes
import userRoutes from './routes/userRoutes.js';
import modelRoutes from './routes/modelRoutes.js';





app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/predict',modelRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Check if the error is an instance of AppError
  if (err.isOperational) {
    return res.status(err.statusCode).json({ 
      success: false,
      message: err.message 
    });
  }
  
  // Generic server error
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!' 
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
