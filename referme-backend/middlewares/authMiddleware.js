// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch the user using the decoded ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user object to the request
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

export default authMiddleware;