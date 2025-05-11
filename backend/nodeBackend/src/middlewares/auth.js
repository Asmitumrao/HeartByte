import { AppError } from '../utils/asyncUtils.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authentication middleware
const auth = async(req, res, next) => {
  


  // get token from cookie
  const token = req.cookies.token;
  // console.log(token);
  
  if (!token) {
    throw new AppError('No token, authorization denied', 401);
  }

  //get user from token
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);



    // Find user by id
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    // console.log(user);
  
    req.user = user;
    next();
  } catch (err) {
    throw new AppError('Token is not valid', 401);
  }
};

export default auth;
