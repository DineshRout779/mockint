const {
  getUser,
  getUserById,
  bookSlot,
  getMyInterviews,
} = require('../controllers/user');
const { isSignedIn, hasAuthorization } = require('../controllers/auth');

const router = require('express').Router();

router.param('userId', getUserById);

// get user
router.get('/:userId', isSignedIn, getUser);

//get my interviews
router.get('/:userId/interviews', getMyInterviews);

module.exports = router;
