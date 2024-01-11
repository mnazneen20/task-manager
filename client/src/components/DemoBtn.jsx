import React from 'react'

export default function DemoBtn({ handleBtnSubmit, disable }) {
    return (
        <button className='w-full bg-blue-500 p-2 rounded-md' disabled={disable} onClick={handleBtnSubmit}>{disable ? '...' : 'Login as Demo User'}</button>
    )
}
