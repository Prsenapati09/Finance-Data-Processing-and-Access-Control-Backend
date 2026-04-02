const Record = require('../models/finance.model');
const mongoose = require('mongoose');

exports.getDashboardSummary = async (req, res) => {
  try {
    let filter = {};
    
    if (req.user.role === 'Viewer') {
      filter.user = new mongoose.Types.ObjectId(req.user.id);
    }

    // using mongoDB aggrigation pipeline for better quiring
    const totals = await Record.aggregate([
      { $match: filter },
      { 
        $group: { 
          _id: "$type", 
          total: { $sum: "$amount" } 
        } 
      }
    ]);

    const income = totals.find(t => t._id === 'income')?.total || 0;
    const expense = totals.find(t => t._id === 'expense')?.total || 0;

    const categoryTotals = await Record.aggregate([
      { $match: filter },
      { 
        $group: { 
          _id: "$category", 
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        } 
      },
      { $sort: { total: -1 } }
    ]);

    
    const monthlyTrends = await Record.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { 
            month: { $month: "$date" }, 
            year: { $year: "$date" },
            type: "$type" 
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 } // Last 12 months
    ]);

    const recentActivity = await Record.find(filter)
      .sort('-date')
      .limit(5)
      .select('amount type category date description');

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalIncome: income,
          totalExpense: expense,
          netBalance: income - expense
        },
        categoryTotals,
        monthlyTrends,
        recentActivity
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};