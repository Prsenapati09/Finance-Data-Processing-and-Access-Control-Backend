const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Create a new user
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Create user (Password hashing is handled in the User Model pre-save hook)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const newUser = await User.create({
      name,
      email,
      password:hashPassword,
      role: role || 'Viewer' // Default role if none provided
    });

    if (!newUser){
      res.status(400).json({
        status:"False"
      })
    }

    res.status(201).json({
      status: 'success',
      message:"User register Sucessfully"
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message:"Something wrong"
    });
    console.log(err)
  }
};

// LOGIN: Verify user and return token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'Incorrect Username ' });
    }

    if (user.status === 'Inactive') {
      return res.status(403).json({ message: 'Your account is deactivated' });
    }

    const comparePassword = await bcrypt.compare(password,user.password)

    if (!comparePassword){
      return res.status(404).json({ message: 'Incorrect Password' });

    }
    const Payload = {
      id:user.id,
      name:user.name,
      password:user.password,
      email:user.password,
      role:user.role,
      status:user.role
    }
    // Send token
    const token = await jwt.sign(Payload,process.env.JWT_SEC)

    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};