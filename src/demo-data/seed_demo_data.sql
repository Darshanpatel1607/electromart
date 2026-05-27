insert into collaborations (brand_name, contact_person_name, email_address, collaboration_type, last_conversation_date, status, follow_up_required, follow_up_priority)
values
('Roast Republic', 'Maya', 'maya@roastrep.com', 'Paid', current_date - 10, 'Awaiting Response', true, 'Medium'),
('Bean Rituals', 'Alex', 'alex@beanrituals.com', 'Barter', current_date - 5, 'Negotiating', false, 'None'),
('Crema Craft', 'Riya', 'riya@cremacraft.com', 'Affiliate', current_date - 18, 'Contacted', true, 'High');

insert into content_calendar (content_title, topic, target_platform, publish_date, status)
values
('3 Espresso Mistakes', 'Espresso', 'Instagram Reel', current_date + 2, 'Scheduled'),
('Home Latte Art Basics', 'Latte Art', 'YouTube Short', current_date + 5, 'Idea');

insert into tasks (task_name, assigned_user, priority, due_date, status)
values
('Send follow-up to Roast Republic', 'Admin', 'High', current_date + 1, 'Pending'),
('Shoot espresso B-roll', 'Admin', 'Medium', current_date + 3, 'In Progress');
