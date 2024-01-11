import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useGlobalCtx } from '../contexts/GlobalProvider'

export default function ModalWrapper({ modalName }) {
    const { modal, close } = useGlobalCtx();
    const modalRef = useRef();

    useEffect(() => {
        const handleModal = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                close(modalName);
            }
        }
        document.addEventListener('mousedown', handleModal);
        return () => document.removeEventListener('mousedown', handleModal);
    }, []);

    return (
        ReactDOM.createPortal(
            <div className='absolute top-0 left-0 bg-black/60 h-full w-full flex justify-center items-center'>
                <div className='h-max w-max' ref={modalRef}>{modal[modalName]}</div>
            </div>,
            document.querySelector('#modal-container')
        )
    )
}