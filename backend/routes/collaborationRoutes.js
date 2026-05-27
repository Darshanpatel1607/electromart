const express = require('express');
const {
  createCollaboration,
  listCollaborations,
  updateCollaboration,
  getFollowUps,
} = require('../controllers/collaborationController');

const router = express.Router();

router.route('/').get(listCollaborations).post(createCollaboration);
router.get('/follow-ups', getFollowUps);
router.patch('/:id', updateCollaboration);

module.exports = router;
