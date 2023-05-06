const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    booked_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', InterviewSchema);
