export type CollaborationType = 'Paid' | 'Barter' | 'Affiliate' | 'Long-Term Partnership';
export type CollaborationStatus =
  | 'New Lead'
  | 'Contacted'
  | 'Awaiting Response'
  | 'Negotiating'
  | 'Approved'
  | 'Product Shipped'
  | 'Content In Progress'
  | 'Completed'
  | 'Rejected'
  | 'Archived';

export type FollowUpPriority = 'None' | 'Low' | 'Medium' | 'High';

export interface Collaboration {
  id?: number;
  collaboration_id?: string;
  brand_name: string;
  company_name?: string;
  contact_person_name?: string;
  designation?: string;
  email_address?: string;
  phone_number?: string;
  whatsapp_number?: string;
  instagram_handle?: string;
  website_url?: string;
  linkedin_profile_url?: string;
  collaboration_type?: CollaborationType;
  estimated_value?: number;
  budget?: number;
  deliverables?: string;
  first_contact_date?: string;
  last_conversation_date: string;
  next_follow_up_date?: string;
  notes?: string;
  topics_discussed?: string;
  status?: CollaborationStatus;
  follow_up_required?: boolean;
  follow_up_priority?: FollowUpPriority;
  created_at?: string;
  updated_at?: string;
}

export interface ContentCalendarItem {
  id?: number;
  content_title: string;
  topic?: string;
  category?: string;
  description?: string;
  target_platform?: string;
  publish_date?: string;
  publish_time?: string;
  url?: string;
  status?: 'Idea' | 'Research' | 'Script' | 'Shooting' | 'Editing' | 'Scheduled' | 'Published';
  created_at?: string;
}
