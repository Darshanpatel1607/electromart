import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ message: 'OPENAI_API_KEY missing' }, { status: 400 });
  const body = await req.json();
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Create concise follow-up drafts as JSON with keys email, instagram_dm, whatsapp for ${body.brandName}. Last discussion: ${body.lastDiscussion}. Deliverables: ${body.deliverables}.`;
  const resp = await client.responses.create({ model: 'gpt-4.1-mini', input: prompt });
  return NextResponse.json({ output: resp.output_text });
}
