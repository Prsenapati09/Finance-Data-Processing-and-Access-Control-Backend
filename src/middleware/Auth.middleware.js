const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

exports.protect = async (req, res, next) => {
  try {
    let token;

    //  Check if token exists in the header 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        message: "You are not logged in. Please log in to get access." 
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SEC);

    // Check if user still exists 
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ 
        message: "The user belonging to this token no longer exists." 
      });
    }

    // Check if user is Active
    if (currentUser.status === 'Inactive') {
      return res.status(403).json({ 
        message: "Your account is deactivated. Please contact an admin." 
      });
    }

    //  Attach user to the request object
    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ 
      message: "Invalid token or session expired. Please log in again." 
    });
  }
};