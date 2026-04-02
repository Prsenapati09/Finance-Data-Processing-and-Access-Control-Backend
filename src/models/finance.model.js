const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: [true, 'Please provide an amount'],
    min: [0, 'Amount cannot be negative']
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['income', 'expense'] 
  },
  category: { 
    type: String, 
    required: [true, 'Please specify a category'],
    index: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  description: { 
    type: String, 
    trim: true 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);