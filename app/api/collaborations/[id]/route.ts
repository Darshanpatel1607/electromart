import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { computeFollowUp } from '@/lib/followups';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const computed = computeFollowUp(body.last_conversation_date, body.status);
  const payload = { ...body, follow_up_required: computed.followUpRequired, follow_up_priority: computed.followUpPriority, updated_at: new Date().toISOString() };
  const { data, error } = await supabase.from('collaborations').update(payload).eq('id', params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase.from('collaborations').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
