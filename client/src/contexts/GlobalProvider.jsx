import { createContext, useContext } from "react";
import useModal from "../hooks/useModal";
import useUser from "../hooks/useUser";

const context = createContext();

export default function GlobalProvider({ children }) {
    const value = { ...useModal(), ...useUser() }
    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
};

export const useGlobalCtx = () => useContext(context);