const express = require('express');
const router = express.Router();
const recordController = require('../controller/finance.controller');
const { protect } = require('../middleware/Auth.middleware');
const authorize = require('../middleware/role.middleware');

router.use(protect); // All record routes require a valid login

router.route('/')
  .get(authorize('Admin', 'Analyst', 'Viewer'), recordController.getAllRecords)
  .post(authorize('Admin'), recordController.createRecord);

router.route('/:id')
  .patch(authorize('Admin'), recordController.updateRecord)
  .delete(authorize('Admin'), recordController.deleteRecord);

module.exports = router;