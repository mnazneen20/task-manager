import React, { useState } from 'react'
import userImg from '../assets/user.jpg'
import { Check, ListBullets, NoteBlank, SignOut } from 'phosphor-react'
import { useGlobalCtx } from '../contexts/GlobalProvider';

export default function Sidebar({ selected, setSelected }) {
    const { user, logout, tasks } = useGlobalCtx();
    return (
        <div className='bg-black border border-grey/30 rounded-xl min-w-[250px] relative flex flex-col'>
            <div className='flex gap-6 items-center px-6 py-12'>
                <img src={userImg} alt="user pic" className='h-24 w-24 rounded-full border-2 border-whitish' />
                <h1 className='text-3xl'>{user.username}</h1>
            </div>
            <ul className='md:mt-20 pb-10'>
                <li className={`cursor-pointer flex gap-3 text-lg font-semibold pl-2 py-2 ${selected === 'all' ? 'bg-green-600/10 border-r-4 border-green-600' : ''}`}
                    onClick={() => setSelected('all')}
                >
                    <ListBullets size={20} weight='bold' />
                    <span>All tasks</span>
                    <span>({tasks.length || 0})</span>
                </li>

                <li className={`cursor-pointer flex gap-3 text-lg font-semibold pl-2 py-2 ${selected === 'completed' ? 'bg-green-600/10 border-r-4 border-green-600' : ''}`}
                    onClick={() => setSelected('completed')}
                >
                    <Check size={20} weight='bold' />
                    <span>Completed tasks</span>
                    <span>({tasks.filter(m => m.status === 'completed').length || 0})</span>
                </li>
                <li className={`cursor-pointer flex gap-3 text-lg font-semibold pl-2 py-2 ${selected === 'pending' ? 'bg-green-600/10 border-r-4 border-green-600' : ''}`}
                    onClick={() => setSelected('pending')}
                >
                    <NoteBlank size={20} weight='bold' />
                    <span>Todo tasks</span>
                    <span>({tasks.filter(m => m.status === 'pending').length || 0})</span>
                </li>
            </ul>
            <button className='w-full flex justify-center gap-3 bg-blackest/30 p-3 mt-auto'
                onClick={logout}
            >
                <SignOut size={24} />
                <p>Log Out</p>
            </button>
        </div>
    )
}
