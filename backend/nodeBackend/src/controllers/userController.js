import User from '../models/User.js';
import { asyncHandler, createResponse, AppError, validateRequest } from '../utils/asyncUtils.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request using utility
  const errors = validateRequest(req.body, {
    email: { required: true, isEmail: true },
    password: { required: true }
  });

  if (errors.length > 0) {
    return res.status(400).json(createResponse({
      success: false,
      message: 'Validation failed',
      errors,
      statusCode: 400
    }));
  }

  // Find user by email
  
  const user = await User.findOne({ email });
  if (!user) {
    // console.log('User not found');
    throw new AppError('User not found', 401);
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {

    throw new AppError('Invalid credentials', 401);
  }

  // Generate JWT token here if needed
  const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
  if (!token) {
    throw new AppError('Error generating token', 500);
  }

  // Respond with user info
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development'?false:true, // Set to true in production 
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });





  return res.status(200).json(createResponse({
    success: true,
    message: 'Login successful',
    data: {
      userId: user._id,
      name: user.name,
      email: user.email
    },
    meta: {
      tokenExpiry: '24h' // or dynamically from config
    }
  }));
});




const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate request using utility
  const errors = validateRequest(req.body, {
    name: { required: true },
    email: { required: true, isEmail: true },
    password: { required: true }
  });

  if (errors.length > 0) {
    return res.status(400).json(createResponse({
      success: false,
      message: 'Validation failed',
      errors,
      statusCode: 400
    }));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 400);
  }


  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    throw new AppError('Error hashing password', 500);
  }



  // Create new user
  const newUser = new User({ name, email, password:hashedPassword });
  await newUser.save();

  // Generate JWT token here if needed
  const token = jwt.sign({ id: newUser._id,name:name }, process.env.JWT_SECRET, { expiresIn: '24h' });
  if (!token) {
    throw new AppError('Error generating token', 500);
  }

  // Respond with user info
  return res.status(201).json(createResponse({
    success: true,
    message: 'User registered successfully',
    data: {
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email
    }
  }));
})

export {loginUser, registerUser};
