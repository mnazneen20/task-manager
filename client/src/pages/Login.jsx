import React, { useState } from 'react'
import Input from '../components/Input'
import { EnvelopeSimple, Lock, Queue } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useGlobalCtx } from '../contexts/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import DemoBtn from '../components/DemoBtn';

export default function Login() {
    const [disable, setDisable] = useState(false);
    const { register, handleSubmit } = useForm();
    const { login, setTasks } = useGlobalCtx();
    const navigate = useNavigate()
    const onsubmit = (data) => {
        fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.user._id) {
                    login(data.user);
                    setTasks(data.user.tasks)
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                navigate('/')
            })
    }
    const handleBtnSubmit = () => {
        setDisable(true);
        const data = {
            email: "demo@gmail.com",
            password: "demo@gmail.com"
        }
        onsubmit(data)
    }
    return (
        <div className='w-full h-screen flex justify-center items-center text-white p-8'>
            <div className='w-[360px] border-2 border-whitish/80 pt-10 px-6 rounded-xl'>
                <h1 className='text-xl font-extrabold pb-8 flex gap-4'><Queue size={25} weight='fill' /> TaskManager</h1>
                <p className='text-lg font-medium'>Welcome!</p>
                <form className='flex flex-col gap-4 pt-10' onSubmit={handleSubmit(onsubmit)}>
                    <Input id={'email'} placeholder={'Email'} icon={<EnvelopeSimple size={20} weight='fill' />} register={() => register('email', { required: true })} />
                    <Input id={'password'} type='password' placeholder={'Password'} icon={<Lock size={20} weight='fill' />} register={() => register('password', { required: true })} />
                    <button type='submit' className='w-full bg-blue-500 p-2 rounded-md'>Login</button>
                    <DemoBtn handleBtnSubmit={handleBtnSubmit} disable={disable} />
                </form>
                <div className='text-center pt-24 pb-6'>
                    <p>Don't have an account? <a className='text-blue-500' href='/signup'>SignUp</a></p>
                </div>
            </div>
        </div>
    )
}