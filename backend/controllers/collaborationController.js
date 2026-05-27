const Collaboration = require('../models/Collaboration');
const { getFollowUpPriority, shouldRequireFollowUp } = require('../utils/followUpLogic');

const buildCollaborationId = () => `COL-${Date.now()}`;

const createCollaboration = async (req, res) => {
  const payload = { ...req.body, collaborationId: buildCollaborationId() };
  const followUpRequired = shouldRequireFollowUp(payload.status, payload.lastConversationDate);

  payload.followUpRequired = followUpRequired;
  payload.followUpPriority = followUpRequired ? getFollowUpPriority(payload.lastConversationDate) : 'None';

  const collaboration = await Collaboration.create(payload);
  res.status(201).json(collaboration);
};

const listCollaborations = async (req, res) => {
  const filter = {};

  if (req.query.status) filter.status = req.query.status;
  if (req.query.brandName) filter.brandName = new RegExp(req.query.brandName, 'i');
  if (req.query.followUpRequired === 'true') filter.followUpRequired = true;

  const data = await Collaboration.find(filter).sort({ updatedAt: -1 });
  res.json(data);
};

const updateCollaboration = async (req, res) => {
  const existing = await Collaboration.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Collaboration not found' });

  Object.assign(existing, req.body);
  existing.followUpRequired = shouldRequireFollowUp(existing.status, existing.lastConversationDate);
  existing.followUpPriority = existing.followUpRequired ? getFollowUpPriority(existing.lastConversationDate) : 'None';

  const updated = await existing.save();
  res.json(updated);
};

const getFollowUps = async (req, res) => {
  const data = await Collaboration.find({ followUpRequired: true, status: { $ne: 'Completed' } }).sort({
    lastConversationDate: 1,
  });

  res.json(data);
};

module.exports = {
  createCollaboration,
  listCollaborations,
  updateCollaboration,
  getFollowUps,
};
