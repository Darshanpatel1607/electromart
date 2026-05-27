const getFollowUpPriority = (lastConversationDate, now = new Date()) => {
  if (!lastConversationDate) return 'None';

  const inactivityDays = Math.floor((now - new Date(lastConversationDate)) / (1000 * 60 * 60 * 24));

  if (inactivityDays > 15) return 'High';
  if (inactivityDays >= 8) return 'Medium';
  if (inactivityDays >= 7) return 'Low';
  return 'None';
};

const isFollowUpRequired = (status, lastConversationDate) => {
  if (status === 'Completed') return false;
  return getFollowUpPriority(lastConversationDate) !== 'None';
};

module.exports = { getFollowUpPriority, isFollowUpRequired };
