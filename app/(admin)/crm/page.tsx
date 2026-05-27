import AdminLayout from '@/components/admin-layout';
import { collaborations } from '@/data/demo';
export default function Page(){return <AdminLayout><h1 className='text-2xl font-bold mb-4'>Collaborations CRM</h1><div className='bg-white rounded border overflow-hidden'><table className='w-full'><thead><tr className='bg-slate-100'><th className='p-2 text-left'>Brand</th><th>Status</th><th>Last Conversation</th></tr></thead><tbody>{collaborations.map(c=><tr key={c.id}><td className='p-2'>{c.brand}</td><td>{c.status}</td><td>{c.lastConversation}</td></tr>)}</tbody></table></div></AdminLayout>}
