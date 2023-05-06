const { isSignedIn } = require('../controllers/auth');
const {
  bookSlot,
  createSlot,
  getInterviewById,
  getInterview,
} = require('../controllers/interview');
const { getUserById } = require('../controllers/user');

const router = require('express').Router();

router.param('interviewId', getInterviewById);
router.param('userId', getUserById);

// get user
router.get('/:interviewId', getInterview);

// create a slot
router.post('/:userId', isSignedIn, createSlot);

//book slot
router.put('/:interviewId/:userId', isSignedIn, bookSlot);

module.exports = router;
