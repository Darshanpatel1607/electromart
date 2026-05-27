'use client';
import { useState } from 'react';
import AdminLayout from '@/components/admin-layout';
import { collaborations } from '@/data/demo';
export default function Page(){const [msg,setMsg]=useState(''); const item=collaborations[0];
async function generate(){const r=await fetch('/api/follow-up-generator',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({brandName:item.brand,contactName:'Manager',lastDiscussion:'Pending response',deliverables:'1 Reel'})}); const d=await r.json(); setMsg(d.output||d.message);}
return <AdminLayout><h1 className='text-2xl font-bold mb-4'>Follow-Ups</h1><div className='space-y-3'>{collaborations.map(c=><div key={c.id} className='bg-white rounded border p-3 flex justify-between'><div><p className='font-medium'>{c.brand}</p><p className='text-sm'>{c.priority} priority</p></div><button onClick={generate} className='px-3 py-2 rounded bg-slate-900 text-white'>Generate</button></div>)}<pre className='bg-slate-100 p-3 rounded text-sm whitespace-pre-wrap'>{msg}</pre></div></AdminLayout>}
