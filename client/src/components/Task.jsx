import { CheckSquareOffset, Circle, NotePencil, Trash } from 'phosphor-react'
import React from 'react'
import CreateTask from './CreateTask'
import { useGlobalCtx } from '../contexts/GlobalProvider'

export default function Task({ item }) {
    const { open, setTasks } = useGlobalCtx();

    const handleDelete = (id) => {
        const permission = confirm('This action can not be undone. Do you want to proceed?');
        if (!permission) return;
        fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/task/${id}`, {
            method: "DELETE",
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                setTasks((prev) => prev.filter((item) => item._id !== id));
            }
        })
            .catch((err) => console.log(err))
    }

    const handleCompleted = (id) => {
        fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/complete/${id}`, {
            method: "PATCH",
            credentials: "include",
        }).then((res) => res.json())
            .then(data => {
                setTasks((prev) => prev.map((item) => {
                    if (item._id === data.task._id) return { ...data.task };
                    else return item;
                }))
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className='w-[280px] h-[208px] bg-[#828282]/10 border border-grey/50 rounded-xl p-4'>
            <h3 className='text-2xl font-medium pb-1'>{item.title}</h3>
            <p className='line-clamp-3'>{item.task}</p>
            <p className='pt-6 pb-2 ml-1 flex justify-between'>
                {new Date(item.due).toDateString()}
                <span className='text-sm flex items-center gap-1'>
                    <Circle className={item.status === 'completed' ? 'text-green-500' : 'text-red-500'} weight='fill' size={12} />
                    {item.status}
                </span>
            </p>
            <div className='flex justify-between'>
                {
                    item.status === 'completed' ? <></> :
                        <button className={`cursor-pointer rounded-full py-[5px] px-4 bg-red-500`} onClick={() => handleCompleted(item._id)}>
                            Mark as complete
                        </button>
                }

                <section className='flex gap-3 text-whitish/80'>
                    {
                        item.status === 'completed' ?
                            <></>
                            :
                            <span title='Edit task'><NotePencil className='cursor-pointer' weight='fill' size={24} onClick={() => open('createtask', <CreateTask taskid={item._id} />)} /></span>
                    }
                    <span title='Delete task'><Trash className='cursor-pointer' weight='fill' size={24} onClick={() => handleDelete(item._id)} /></span>
                </section>
            </div>
        </div >
    )
}
