const getFollowUpPriority = (lastConversationDate, now = new Date()) => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const inactivityDays = Math.floor((now - new Date(lastConversationDate)) / msPerDay);

  if (inactivityDays > 15) return 'High';
  if (inactivityDays >= 8) return 'Medium';
  if (inactivityDays >= 7) return 'Low';
  return 'None';
};

const shouldRequireFollowUp = (status, lastConversationDate, now = new Date()) => {
  if (!lastConversationDate) return false;
  if (status === 'Completed') return false;

  return getFollowUpPriority(lastConversationDate, now) !== 'None';
};

module.exports = { getFollowUpPriority, shouldRequireFollowUp };
