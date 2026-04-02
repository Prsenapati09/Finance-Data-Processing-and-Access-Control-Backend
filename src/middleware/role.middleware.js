const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    //Check if user exists 
    if (!req.user) {
      return res.status(401).json({ message: "You are not logged in." });
    }

    //Check if account is Active
    if (req.user.status === 'Inactive') {
      return res.status(403).json({ message: "Your account is inactive. Please contact an admin." });
    }

    // Check if role is authorized
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Permission denied. Role '${req.user.role}' cannot perform this action.` 
      });
    }
    next()
  };
};

module.exports = authorize;