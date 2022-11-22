import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {Seeker} from "../../types/Seeker";
import Seeker1 from "../../data/Seeker"

type Props = {
    children: ReactNode
};

type seekerContext = {
    seeker: Seeker | undefined,
    setSeeker : Dispatch<SetStateAction <Seeker | undefined>>
}

const seekerContext = createContext({} as seekerContext);

export const useSeekerContext = () => {
    return useContext(seekerContext)
}

export const SeekerProvider = ({children} :Props) => {
    const [seeker, setSeeker] = useState<Seeker | undefined>(Seeker1);
    return(
        <seekerContext.Provider value={{seeker, setSeeker}}>
            {children}
        </seekerContext.Provider>
    )
}