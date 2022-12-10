import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {initialSeeker, SeekerAction, seekerReducer, SeekerState} from "./reducer/SeekerReducer";

type Props = {
    children: ReactNode
}

type authContext = {
    seekerState: SeekerState;
    seekerDispatch: React.Dispatch<SeekerAction>
}

const AuthContext = createContext({} as authContext);

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}: Props) => {
    const [seekerState, seekerDispatch] = useReducer(seekerReducer, initialSeeker)

    return(
        <AuthContext.Provider value={{seekerState, seekerDispatch}}>
            {children}
        </AuthContext.Provider>

    )
}