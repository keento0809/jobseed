import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {Seeker} from "../../types/Seeker";
import Seeker1 from "../../data/Seeker"
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

type Props = {
    children: ReactNode
};

type seekerContext = {
    seeker: Seeker | undefined,
    setSeeker : Dispatch<SetStateAction <Seeker | undefined>>,
    updateSeeker : (seeker_id: string, data: Seeker) => void
}

const seekerContext = createContext({} as seekerContext);

export const useSeekerContext = () => {
    return useContext(seekerContext)
}

export const SeekerProvider = ({children} :Props) => {
    const [seeker, setSeeker] = useState<Seeker | undefined>(Seeker1);
    const [cookies] = useCookies();

    const updateSeeker = async (seeker_id: string, data: Seeker) => {
        try {
            let res = await axios({
                method: "patch",
                url: `http://localhost:8080/seekers/${seeker_id}`,
                data,
                withCredentials: true,
                headers: {
                authorization: `Bearer ${cookies.JWT_TOKEN}`
            }
        })
            console.log(res.data.updatingSeeker.rows[0])
            setSeeker(res.data.updatingSeeker.rows[0])
        } catch (e : any) {
            console.log(e.message)
        }
    }

    return(
        <seekerContext.Provider value={{seeker, setSeeker, updateSeeker}}>
            {children}
        </seekerContext.Provider>
    )
}