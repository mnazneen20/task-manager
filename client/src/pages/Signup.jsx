import React from 'react'
import Input from '../components/Input'
import { At, EnvelopeSimple, Lock, Queue } from 'phosphor-react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onsubmit = (data) => {
        fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.user._id)
                    navigate('/login');
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className='w-full h-screen flex justify-center items-center text-white p-8'>
            <div className='max-w-[360px] border-2 border-whitish/80 pt-10 px-6 rounded-xl'>
                <h1 className='text-xl font-extrabold pb-8 flex gap-4'><Queue size={25} weight='fill' /> TaskManager</h1>
                <p className='text-lg font-medium'>Join the comminity that helps build your dreams.</p>
                <form className='flex flex-col gap-4 pt-10' onSubmit={handleSubmit(onsubmit)}>
                    <Input id={'email'} placeholder={'Email'} icon={<EnvelopeSimple size={20} weight='fill' />} register={() => register('email', { required: true })} />
                    <Input id={'username'} placeholder={'Username'} icon={<At size={20} weight='fill' />} register={() => register('username', { required: true })} />
                    <Input id={'password'} type='password' placeholder={'Password'} icon={<Lock size={20} weight='fill' />} register={() => register('password', { required: true })} />
                    <button className='w-full bg-blue-500 p-2 rounded-md'>Signup</button>
                </form>
                <div className='text-center pt-24 pb-6'>
                    <p>Already have an account? <a className='text-blue-500' href='/login'>Login</a></p>
                </div>
            </div>
        </div>
    )
}