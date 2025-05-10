import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
connectDB();



// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
  {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --------------------------------------------------------------------------------------------------------


// import routes
import userRoutes from './routes/userRoutes.js';





app.use('/api/v1/auth', userRoutes);



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
