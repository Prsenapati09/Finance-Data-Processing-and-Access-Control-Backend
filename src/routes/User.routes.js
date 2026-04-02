const express = require('express');
const router = express.Router();
const userController = require('../controller/User.controller');
const authorize = require('../middleware/role.middleware');
const { protect } = require('../middleware/Auth.middleware');

// Everything below this line requires login
router.use(protect);

// Only Admins can manage users
router.route('/').get(authorize('Admin'), userController.getAllUsers);

router.patch('/:id',authorize('Admin'), userController.updateUserAccount);

module.exports = router;