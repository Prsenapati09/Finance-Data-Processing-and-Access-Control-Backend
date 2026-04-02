const Record = require('../models/finance.model');

// CREATE RECORD 
exports.createRecord = async (req, res) => {
  try {
    const newRecord = await Record.create({
      ...req.body,
      user: req.user.id // Attach the Admin who created it
    });
    res.status(201).json({ status: 'success', data: { record: newRecord } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// VIEW RECORDS 
exports.getAllRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    let filter = {};

    // ROLE LOGIC: Viewers only see their own records
    if (req.user.role === 'Viewer') {
      filter.user = req.user.id;
    }

    // FILTERING LOGIC: Date, Category, Type
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await Record.find(filter).sort('-date');
    res.status(200).json({ status: 'success', results: records.length, data: { records } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE RECORD 
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ status: 'success', data: { record } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE RECORD 
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};