import React from 'react'
import { useGlobalCtx } from '../contexts/GlobalProvider'
import ModalWrapper from './ModalWrapper';

export default function Modal() {
    const { modal } = useGlobalCtx();
    return (
        <div id='modal-container'>
            {
                Object.keys(modal).map((k) => <ModalWrapper key={k} modalName={k} />)
            }
        </div>
    )
}
