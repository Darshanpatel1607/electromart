import Link from 'next/link';
const items=[['/dashboard','Dashboard'],['/crm','CRM'],['/follow-ups','Follow-Ups'],['/tasks','Tasks'],['/calendar','Calendar'],['/','Public Site']];
export default function Sidebar(){return <aside className='w-60 bg-slate-900 text-white min-h-screen p-4'><h2 className='font-bold mb-4'>CreatorOS</h2><nav className='space-y-2'>{items.map(([h,l])=><Link key={h} href={h} className='block text-slate-200 hover:text-white'>{l}</Link>)}</nav></aside>}
