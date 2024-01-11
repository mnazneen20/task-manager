import { useState } from "react";

export default function useModal() {
    const [modal, setModal] = useState({});
    const open = (key, jsx) => {
        setModal((prev) => (
            { ...prev, [key]: jsx }
        ))
    }

    const close = (key) => {
        setModal((prev) => {
            const cloneprev = { ...prev };
            delete cloneprev[key];
            return cloneprev;
        })
    }

    return {
        modal,
        open,
        close
    }
}