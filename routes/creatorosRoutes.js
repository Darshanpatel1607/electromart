const express = require('express');
const OpenAI = require('openai');
const supabase = require('../services/supabaseClient');
const { getFollowUpPriority, isFollowUpRequired } = require('../src/utils/followUpPriority');

const router = express.Router();

router.get('/health/supabase', async (req, res) => {
  const { data, error } = await supabase.from('collaborations').select('id').limit(1);
  if (error) return res.status(500).json({ ok: false, error: error.message });
  res.json({ ok: true, sample: data });
});

router.get('/dashboard', async (req, res) => {
  const { data, error } = await supabase.from('collaborations').select('*');
  if (error) return res.status(500).json({ message: error.message });

  const followUps = data.filter((c) => c.status !== 'Completed' && getFollowUpPriority(c.last_conversation_date) !== 'None');
  const active = data.filter((c) => !['Completed', 'Archived', 'Rejected'].includes(c.status));
  const pending = data.filter((c) => c.status === 'Awaiting Response');

  res.json({
    activeCollaborations: active.length,
    followUpsRequired: followUps.length,
    pendingResponses: pending.length,
    followUps,
  });
});

router.get('/collaborations', async (req, res) => {
  const { data, error } = await supabase.from('collaborations').select('*').order('updated_at', { ascending: false });
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
});

router.post('/collaborations', async (req, res) => {
  const body = req.body;
  const follow_up_priority = getFollowUpPriority(body.last_conversation_date);
  const follow_up_required = isFollowUpRequired(body.status, body.last_conversation_date);

  const payload = {
    ...body,
    follow_up_priority,
    follow_up_required,
  };

  const { data, error } = await supabase.from('collaborations').insert(payload).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json(data);
});

router.get('/follow-ups', async (req, res) => {
  const { data, error } = await supabase.from('collaborations').select('*').eq('follow_up_required', true);
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
});

router.post('/content-calendar', async (req, res) => {
  const { data, error } = await supabase.from('content_calendar').insert(req.body).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json(data);
});

router.get('/content-calendar', async (req, res) => {
  const { data, error } = await supabase.from('content_calendar').select('*').order('publish_date', { ascending: true });
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
});

router.post('/ai/follow-up-generator', async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(400).json({ message: 'OPENAI_API_KEY not configured.' });
  }

  const { brandName, contactName, lastDiscussion, deliverables, tone = 'professional' } = req.body;
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `Create follow-up drafts for coffee creator collaboration.\nBrand: ${brandName}\nContact: ${contactName}\nLast discussion: ${lastDiscussion}\nDeliverables: ${deliverables}\nTone: ${tone}\nReturn JSON with keys: email, instagram_dm, whatsapp.`;

  const completion = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt,
  });

  res.json({ output: completion.output_text });
});

module.exports = router;
