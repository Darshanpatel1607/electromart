import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD || 'creatoros-admin';
  if (password !== expected) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_auth', '1', { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
