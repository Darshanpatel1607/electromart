export type FollowUpPriority = 'None' | 'Low' | 'Medium' | 'High';

export function computeFollowUp(lastConversationDate: string | null, status?: string | null) {
  if (!lastConversationDate || status === 'Completed') {
    return { followUpRequired: false, followUpPriority: 'None' as FollowUpPriority, inactiveDays: 0 };
  }
  const today = new Date();
  const last = new Date(lastConversationDate);
  const ms = today.getTime() - last.getTime();
  const inactiveDays = Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  let followUpPriority: FollowUpPriority = 'None';
  if (inactiveDays >= 7 && inactiveDays <= 7) followUpPriority = 'Low';
  else if (inactiveDays >= 8 && inactiveDays <= 14) followUpPriority = 'Medium';
  else if (inactiveDays >= 15) followUpPriority = 'High';
  return { followUpRequired: followUpPriority !== 'None', followUpPriority, inactiveDays };
}
