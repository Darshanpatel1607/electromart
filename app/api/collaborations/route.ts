import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { computeFollowUp } from '@/lib/followups';

export async function GET() {
  const { data, error } = await supabase.from('collaborations').select('*').order('id', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const computed = computeFollowUp(body.last_conversation_date, body.status);
  const payload = { ...body, follow_up_required: computed.followUpRequired, follow_up_priority: computed.followUpPriority };
  const { data, error } = await supabase.from('collaborations').insert(payload).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
