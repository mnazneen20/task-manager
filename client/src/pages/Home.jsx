import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import { useNavigate } from 'react-router-dom';
import { useGlobalCtx } from '../contexts/GlobalProvider';

export default function Home() {
    let [selected, setSelected] = useState('all');
    const { user } = useGlobalCtx();
    // console.log(user)
    useEffect(() => { }, [user])
    return (
        <div className="w-full h-screen flex md:flex-row flex-col gap-6 p-5">
            <Sidebar selected={selected} setSelected={setSelected} />
            <Container selected={selected} />
        </div>
    )
}
