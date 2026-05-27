'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin-layout';
import { computeFollowUp } from '@/lib/followups';

export default function Page(){const [data,setData]=useState<any>({collabs:[],calendar:[]}); useEffect(()=>{(async()=>{const [c,cal]=await Promise.all([fetch('/api/collaborations'),fetch('/api/content-calendar')]); setData({collabs:await c.json(),calendar:await cal.json()});})();},[]); const followCount=(data.collabs||[]).filter((c:any)=>computeFollowUp(c.last_conversation_date,c.status).followUpRequired).length;
return <AdminLayout><h1 className='text-2xl font-bold mb-4'>Dashboard</h1><div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-6'>{[['Active Collaborations',data.collabs.length],['Follow-Ups Required',followCount],['Pending Responses',data.collabs.filter((c:any)=>c.status==='Awaiting Response').length],['Scheduled Content',data.calendar.filter((c:any)=>c.status==='Scheduled').length]].map(([l,v])=><div key={String(l)} className='bg-white p-4 rounded border'><p className='text-sm text-slate-500'>{l}</p><p className='text-2xl font-semibold'>{v}</p></div>)}</div></AdminLayout>}
