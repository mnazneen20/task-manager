import { Calendar, Plus } from 'phosphor-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useGlobalCtx } from '../contexts/GlobalProvider'

export default function CreateTask({ taskid }) {
    const { user, setTasks, close } = useGlobalCtx();
    const { register, setValue, handleSubmit } = useForm();
    const onsubmit = (data) => {
        data.user = user._id;
        if (!taskid) {
            fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/task`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setTasks((prev) => [...prev, data.task])
                })
                .catch(err => console.log(err))
                .finally(() => {
                    close('createtask');
                })
        } else {
            fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/task/${taskid}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setTasks((prev) => prev.map((item) => {
                        if (item._id === data.task._id) return { ...data.task };
                        else return item;
                    }))
                })
                .catch(err => console.log(err))
                .finally(() => {
                    close('createtask');
                })
        }
    }

    useEffect(() => {
        if (taskid) {
            fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/task/${taskid}`)
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    setValue('title', data.title);
                    setValue('task', data.task);
                    setValue('due', data.due.substring(0, 10));
                })
                .catch((err) => console.log(err))
        }
    }, []);

    return (
        <div className='p-10 bg-blacker rounded-xl max-w-[580px] w-[580px]'>
            <h2 className='text-xl pb-4'>Create a Task</h2>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" className='bg-black py-2 px-4 rounded text-whitish/70' {...register('title', { required: true })} />
                </div>
                <div className='flex flex-col gap-2 mt-6'>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" rows="5" className='bg-black py-2 px-4 rounded text-whitish/70' {...register('task', { required: true })}></textarea>
                </div>
                <div className='flex flex-col gap-2 mt-6 relative'>
                    <label htmlFor="date">Date</label>
                    <input type='date' id='date' className='bg-black py-2 px-4 rounded text-whitish/70' {...register('due', { required: true })} />
                    <Calendar size={20} className='absolute right-4 top-10 pointer-events-none z-10 bg-black' />
                </div>
                <button className='text-right font-medium text-lg bg-purple-500 rounded-lg flex gap-3 p-2 px-3 items-center ml-auto mt-6'>
                    <Plus size={22} weight='bold' />
                    <span>{taskid ? "Update" : "Create Task"}</span>
                </button>
            </form>
        </div>
    )
}
