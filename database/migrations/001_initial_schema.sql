-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  profile_image_url VARCHAR(500),
  company_name VARCHAR(255),
  industry VARCHAR(100),
  bio TEXT,
  phone VARCHAR(20),
  location VARCHAR(255),
  website VARCHAR(500),
  role VARCHAR(50) DEFAULT 'user', -- user, admin, team_lead
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended
  email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  last_login TIMESTAMP,
  two_factor_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  company_name VARCHAR(255),
  job_title VARCHAR(150),
  industry VARCHAR(100),
  website VARCHAR(500),
  linkedin_url VARCHAR(500),
  source VARCHAR(100), -- website, referral, cold_outreach, social_media, other
  status VARCHAR(50) DEFAULT 'lead', -- lead, prospect, customer, archived
  engagement_score INT DEFAULT 0,
  notes TEXT,
  tags VARCHAR(500), -- comma-separated tags
  custom_fields JSONB,
  last_contacted TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  INDEX user_contacts_idx (user_id),
  INDEX contact_status_idx (status),
  INDEX contact_email_idx (email)
);

-- Follow-ups Table
CREATE TABLE IF NOT EXISTS follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50), -- email, phone, meeting, task, other
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, cancelled, rescheduled
  priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high, urgent
  scheduled_date TIMESTAMP NOT NULL,
  completed_date TIMESTAMP,
  reminder_sent BOOLEAN DEFAULT false,
  outcome TEXT,
  next_follow_up_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX user_followups_idx (user_id),
  INDEX contact_followups_idx (contact_id),
  INDEX followup_status_idx (status),
  INDEX followup_scheduled_idx (scheduled_date)
);

-- Content Events (Calendar) Table
CREATE TABLE IF NOT EXISTS content_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- blog, podcast, video, webinar, social_post, email_campaign, event, other
  platform VARCHAR(100), -- twitter, linkedin, instagram, facebook, tiktok, youtube, blog, email, other
  status VARCHAR(50) DEFAULT 'planned', -- planned, in_progress, published, cancelled, draft
  scheduled_date TIMESTAMP NOT NULL,
  published_date TIMESTAMP,
  content_link VARCHAR(500),
  image_url VARCHAR(500),
  attachments JSONB,
  tags VARCHAR(500),
  priority VARCHAR(50) DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  INDEX user_events_idx (user_id),
  INDEX event_status_idx (status),
  INDEX event_scheduled_idx (scheduled_date)
);

-- Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  event_type VARCHAR(100), -- contact_viewed, contact_added, followup_created, email_sent, etc
  event_metadata JSONB,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX user_analytics_idx (user_id),
  INDEX analytics_timestamp_idx (timestamp)
);

-- Communication History Table
CREATE TABLE IF NOT EXISTS communication_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  type VARCHAR(50), -- email, phone, meeting, message, note
  subject VARCHAR(255),
  content TEXT,
  attachments JSONB,
  direction VARCHAR(20), -- inbound, outbound
  status VARCHAR(50), -- draft, sent, received, failed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX user_communications_idx (user_id),
  INDEX contact_communications_idx (contact_id)
);

-- Portfolio Items Table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  project_url VARCHAR(500),
  technologies VARCHAR(500), -- comma-separated
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  INDEX user_portfolio_idx (user_id)
);

-- Documents/Media Kit Table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  document_type VARCHAR(100), -- media_kit, case_study, white_paper, proposal, contract, other
  file_url VARCHAR(500) NOT NULL,
  file_size BIGINT,
  mime_type VARCHAR(100),
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  INDEX user_documents_idx (user_id)
);

-- Team Members Table (for future multi-user support)
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  invited_by UUID NOT NULL REFERENCES users(id),
  role VARCHAR(50), -- owner, admin, member, viewer
  status VARCHAR(50) DEFAULT 'pending', -- pending, active, inactive
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, workspace_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_contacts_user_created ON contacts(user_id, created_at DESC);
CREATE INDEX idx_followups_user_scheduled ON follow_ups(user_id, scheduled_date);
CREATE INDEX idx_content_events_user_date ON content_events(user_id, scheduled_date DESC);
CREATE INDEX idx_analytics_user_timestamp ON analytics(user_id, timestamp DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_followups_updated_at BEFORE UPDATE ON follow_ups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_events_updated_at BEFORE UPDATE ON content_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
