import { AppError } from '../utils/asyncUtils.js';
import jwt from 'jsonwebtoken';

// Authentication middleware
const auth = (req, res, next) => {
  


  // get token from cookie
  const token = req.cookies.token;
  // console.log(token);
  
  if (!token) {
    throw new AppError('No token, authorization denied', 401);
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const user = {
      id: decoded.id,
      name: decoded.name
    }
    req.user = user;
    next();
  } catch (err) {
    throw new AppError('Token is not valid', 401);
  }
};

export default auth;
