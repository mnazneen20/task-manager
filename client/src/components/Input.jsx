import React from 'react'

export default function Input({ type = 'text', id, icon, placeholder, register, ...props }) {
    return (
        <div className='relative'>
            <span className='text-whitish/70 absolute top-2 left-2'>
                {icon}
            </span>
            <input
                type={type}
                className={`bg-black border border-whitish/80 py-2 w-full pl-10 pr-2 rounded-md focus:outline-none`}
                id={id}
                placeholder={placeholder}
                name={id}
                autoComplete='off'
                {...register()}
                {...props}
            />
        </div>
    )
}
