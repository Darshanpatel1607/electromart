import AdminLayout from '@/components/admin-layout';
import { calendar } from '@/data/demo';
export default function Page(){return <AdminLayout><h1 className='text-2xl font-bold mb-4'>Content Calendar</h1><div className='bg-white rounded border p-3'><ul>{calendar.map(c=><li key={c.id} className='py-1'>{c.date} — {c.title} ({c.status})</li>)}</ul></div></AdminLayout>}
