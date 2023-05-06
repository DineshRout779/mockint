const Interview = require('../models/Interview');

exports.getInterviewById = async (req, res, next, id) => {
  try {
    let interview = await Interview.findById(id).populate(
      'created_by',
      '_id name'
    );

    if (!interview) {
      return res.status(404).json({
        error: 'interview not found',
      });
    }

    req.interview = interview;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getInterview = (req, res) => {
  return res.json(req.interview);
};

exports.createSlot = async (req, res) => {
  const newInterview = new Interview(req.body);
  const { date, time, type } = req.body;

  console.log('inside create');

  if (!date || !time || !type) {
    return res.status(400).json({
      error: 'All fields are required!',
    });
  }

  try {
    let savedInterview = await newInterview.save();
    return res.status(201).json(savedInterview);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.bookSlot = async (req, res) => {
  try {
    if (!req.interview.isBooked) {
      if (req.interview.created_by._id != req.user._id) {
        const updatedInterview = await Interview.findByIdAndUpdate(
          req.interview._id,
          { $set: { booked_by: req.user._id, isBooked: true } },
          { new: true }
        );
        res.status(200).json(updatedInterview);
      } else {
        console.log('You are not allowed to book your own interview! LOL!!');
      }
    } else {
      console.log('Already booked!');
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
