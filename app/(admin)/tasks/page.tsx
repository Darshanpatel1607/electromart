import AdminLayout from '@/components/admin-layout';
import { tasks } from '@/data/demo';
export default function Page(){return <AdminLayout><h1 className='text-2xl font-bold mb-4'>Tasks</h1><div className='grid gap-3'>{tasks.map(t=><div key={t.id} className='bg-white p-3 rounded border'><p className='font-medium'>{t.name}</p><p className='text-sm'>{t.priority} • {t.status}</p></div>)}</div></AdminLayout>}
