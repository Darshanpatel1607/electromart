'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin-layout';
import { computeFollowUp } from '@/lib/followups';

export default function Page(){const [items,setItems]=useState<any[]>([]);const [msg,setMsg]=useState('');const [loading,setLoading]=useState(true);
useEffect(()=>{(async()=>{const r=await fetch('/api/collaborations'); const d=await r.json(); setItems(d||[]); setLoading(false);})();},[]);
async function generate(item:any){const r=await fetch('/api/follow-up-generator',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({brandName:item.brand_name,contactName:item.contact_person_name,lastDiscussion:item.notes||'Pending response',deliverables:item.deliverables||'1 Reel'})}); const d=await r.json(); setMsg(d.output||d.message||d.error);}
const followups=items.map(i=>({...i,...computeFollowUp(i.last_conversation_date,i.status)})).filter(i=>i.followUpRequired);
return <AdminLayout><h1 className='text-2xl font-bold mb-4'>Follow-Ups</h1>{loading?<p>Loading...</p>:<div className='space-y-3'>{followups.map(c=><div key={c.id} className='bg-white rounded border p-3 flex justify-between items-center'><div><p className='font-medium'>{c.brand_name}</p><p className='text-sm'>{c.inactiveDays} days inactive • {c.followUpPriority}</p></div><button onClick={()=>generate(c)} className='px-3 py-2 rounded bg-slate-900 text-white'>Generate</button></div>)}{followups.length===0&&<p>No follow-ups required.</p>}<pre className='bg-slate-100 p-3 rounded text-sm whitespace-pre-wrap'>{msg}</pre></div>}</AdminLayout>}
