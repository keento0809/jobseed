import {createContext} from "react";

type User = {
    name: string;
    email: string;
    avatar? : string;
}

const UserContext = createContext({} as User)