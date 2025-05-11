import User from '../models/User.js';
import { asyncHandler, createResponse, AppError, validateRequest } from '../utils/asyncUtils.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendVerification from '../services/sendVerification.js';
import router from '../routes/userRoutes.js';


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

  // Check if user is verified
  if (!user.isVerified) {
    throw new AppError('User not verified', 401);
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {

    throw new AppError('Invalid credentials', 401);
  }

  // Generate JWT token here if needed
  const token = jwt.sign({ id: user._id, name: user.name, role:user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
  if (!token) {
    throw new AppError('Error generating token', 500);
  }

  // console.log(token);
  // Respond with user info
  res.cookie('token', token, {
    httpOnly: true,
    secure: true, // Set to true in production 
    sameSite: 'None', // Set to 'None' for cross-origin requests
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });



  return res.status(200).json(createResponse({
    success: true,
    message: 'Login successful',
    data: {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    meta: {
      tokenExpiry: '24h' // or dynamically from config
    }
  }));
});


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,role } = req.body;

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
    if (existingUser.isVerified) {
      throw new AppError('User already exists', 400);
    }
    else{
      //delete existing user if not verified
      await User.deleteOne({email});
      console.log('User not verified, deleting user');
    }
  }


  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    throw new AppError('Error hashing password', 500);
  }

  // Create new user
  const newUser = new User({ name, email, password: hashedPassword , role });

  await newUser.save();``
  if (!newUser) {
    throw new AppError('Error creating user', 500);
  }
  

  //send email verification link
  const verificationToken = jwt.sign({name,email}, process.env.JWT_SECRET, { expiresIn: '24h' });
  if (!verificationToken) {
    throw new AppError('Error generating token', 500);
  }

  // Send verification email
  await sendVerification(email, verificationToken);

  // Respond with user info
  return res.status(201).json(createResponse({
    success: true,
    message: 'Verificaton Link sent to your email',

  }));
})


const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      throw new AppError('Invalid or expired token', 400);
    }

    // Find user by email
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    // Update user to verified
    user.isVerified = true;
    await user.save();  

   return res.status(200).json(createResponse({
      success: true,
      message: 'Email verified successfully',
      data: {
        userId: user._id,
        name: user.name,
        email: user.email
      }
    }));
  });
});


const authenticateUser = asyncHandler((req, res) => {


  const user = req.user;
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.status(200).json(createResponse({
    success: true,
    message: 'User authenticated successfully',
    data: user,
  }));
})


const logoutUser = asyncHandler((req, res) => {
  res.clearCookie('token');
  console.log('User logged out');
  return res.status(200).json(createResponse({
    success: true,
    message: 'Logout successful'
  }));
});

export {loginUser, registerUser, verifyEmail, authenticateUser, logoutUser};
