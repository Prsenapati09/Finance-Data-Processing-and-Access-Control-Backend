const User = require('../models/User.model');

// ADMIN ONLY: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 'success', results: users.length, data: { users } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN ONLY: Update User Role or Status
exports.updateUserAccount = async (req, res) => {
  try {
    const { role, status } = req.body;

    // Prevent non-admins from changing roles
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { role, status }, 
      { new: true,
      runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      status: 'success',
      data: { user: updatedUser } 
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid data provided" });
  }
};