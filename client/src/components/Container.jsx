import React, { useEffect, useState } from 'react'
// import { tasks } from '../assets/data'
import Task from './Task'
import { Plus } from 'phosphor-react'
import { useGlobalCtx } from '../contexts/GlobalProvider'
import CreateTask from './CreateTask'

export default function Container({ selected }) {
    const { open, tasks } = useGlobalCtx();
    let mytasks = tasks;
    if (selected === 'completed') {
        mytasks = tasks.filter((item) => item.status === 'completed')
    }
    else if (selected === 'pending') {
        mytasks = tasks.filter((item) => item.status === 'pending')
    }
    return (
        <div className='w-full bg-black border border-grey/30 rounded-xl flex flex-col py-4 px-6'>
            <div className='relative'>
                <h1 className='text-3xl font-bold pt-4 pb-6'>All Tasks</h1>
                <span className='bg-green-600 h-1 w-16 block rounded-full absolute bottom-4'></span>
            </div>
            <div className='max-h-full flex flex-wrap gap-4 overflow-y-scroll'>
                {
                    mytasks.length === 0 ? <></>
                        :
                        mytasks.map(m => <Task key={m._id} item={m} />)
                }
                <div className='w-[280px] h-[208px] bg-[#828282]/10 border border-grey/60 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#828282]/40' onClick={() => open('createtask', <CreateTask />)}>
                    <p className='flex gap-3 items-center text-grey'>
                        <Plus size={20} weight='bold' />
                        <span>Add New Task</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
