import { AxiosRequestConfig } from "axios"
import { createContext, ReactNode, useEffect, useState } from "react"
import { Rent } from "../interfaces/ResponseAPI"
import api from "../services/api"

interface RentsContextProps{
    rents: Rent[];
    addRent: (rent: Rent) => void;
    removeRent: (rent:Rent) => void;
}

interface RentsProviderProps{
    children: ReactNode;
}

export const RentsContext = createContext<RentsContextProps>({} as RentsContextProps)

export function RentsProvider({children}: RentsProviderProps){

    const [rents, setRents] = useState<Rent[]>([])

    useEffect(()=>{
        api
        .get('api/alugueis')
        .then(res => setRents(res.data))
        .catch(err => alert(err))
    })

    function addRent(rent: Rent){
        api
        .post('api/alugueis', rent)
        .then(() => console.log("deletado!"))
        .catch(()=> console.log("deu erro aqui em"))
    }
    function removeRent(rent: Rent){
        api
        .delete('api/alugueis', rent as AxiosRequestConfig)
        .then(() => console.log("deletado!"))
        .catch(()=> console.log("deu erro aqui em"))
    }

    return(
        <RentsContext.Provider
            value={{rents, addRent, removeRent}}
        >
            {children}
        </RentsContext.Provider>
    )
}