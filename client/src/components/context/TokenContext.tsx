import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {gapi} from "gapi-script";
// import {start, OnSuccess ,onFailure} from "./GoogleAuthHandler";

type Props = {
    children: ReactNode
}

type Token = string | null;

type User = {
    name: string,
    token: Token
}

type tokenContext = {
    user: User | null,
    setUser: (user:User) => void,
    GLogin:() => void,
    GLogout:() => void,
    login:(token:Token) => void,
    logout:() => void,
    signup:(token:Token) => void
}

const TokenContext = createContext({} as tokenContext);

export const useTokenContext = () => {
    return useContext(TokenContext)
};

export const TokenProvider = ({children}: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<Token | null>("")

    const GLogin = () => {
        // useEffect(()=>{
        //     gapi.load("client:auth2", start())
        // }, [])
    };

    const GLogout = () => {
        setToken(null)
    }

    const login = () => {
        setToken(null)
    }

    const logout = () => {
        setToken(null)
    }

    const signup = () => {
        setToken(null)
    }

    return (
        <TokenContext.Provider value={{user, setUser, GLogin, GLogout, login,logout, signup}}>
            {children}
        </TokenContext.Provider>
    )
};
