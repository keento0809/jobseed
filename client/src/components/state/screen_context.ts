import { createContext, useContext } from "react"

export type GlobalContent = {
    innerWidth: number;
    innerHeight: number;

}

export const screen_global_content = createContext<GlobalContent>({
    innerWidth:768,
    innerHeight: 100
})

export const useGlobalContent = () => createContext(screen_global_content);