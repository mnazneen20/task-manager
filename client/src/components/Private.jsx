import React, { useEffect } from 'react'
import { useGlobalCtx } from '../contexts/GlobalProvider'
import { Navigate } from 'react-router-dom';

export default function Private({ children }) {
    const { user, loading } = useGlobalCtx();
    useEffect(() => { }, [loading])
    if (!loading && !user) return <Navigate to={'/login'} />
    else return (
        <div>
            {
                loading ? <div><p>loading</p></div> : children
            }
        </div>
    )
}
