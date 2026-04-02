const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analytics.controller');
const { protect } = require('../middleware/Auth.middleware');
const authorize = require('../middleware/role.middleware');

// Dashboard summary is accessible to everyone (but filtered by role internally)
router.get('/summary', protect, authorize('Admin', 'Analyst', 'Viewer'), analyticsController.getDashboardSummary);

module.exports = router;