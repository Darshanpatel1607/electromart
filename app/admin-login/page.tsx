'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin(){
  const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const router=useRouter();
  const submit=async(e:React.FormEvent)=>{e.preventDefault(); setLoading(true); setError(''); const r=await fetch('/api/admin-login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})}); setLoading(false); if(!r.ok){setError('Invalid password'); return;} router.push('/dashboard');};
  return <main className='max-w-md mx-auto p-8'><h1 className='text-2xl font-bold mb-4'>Admin Login</h1><form onSubmit={submit} className='space-y-3'><input className='border p-2 w-full rounded' type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Admin password' /><button className='bg-slate-900 text-white px-4 py-2 rounded' disabled={loading}>{loading?'Signing in...':'Sign In'}</button>{error&&<p className='text-red-600 text-sm'>{error}</p>}</form></main>
}
