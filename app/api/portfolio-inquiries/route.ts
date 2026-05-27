import { NextResponse } from 'next/server'; import { supabase } from '@/lib/supabase';
export async function GET(){ const {data,error}=await supabase.from('portfolio_inquiries').select('*').order('id',{ascending:false}); if(error) return NextResponse.json({error:error.message},{status:500}); return NextResponse.json(data);} 
export async function POST(req:Request){ const body=await req.json();
  const { data, error } = await supabase.from('portfolio_inquiries').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await supabase.from('collaborations').insert({ brand_name: body.company_name || 'Website Inquiry', contact_person_name: body.contact_name, email_address: body.email, budget: body.budget || 0, deliverables: body.deliverables, notes: body.campaign_brief, status: 'New Lead', last_conversation_date: new Date().toISOString().slice(0,10) });
  return NextResponse.json(data, { status: 201 });
}
