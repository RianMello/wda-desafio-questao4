import { createContext, ReactNode, useEffect, useState } from "react"
import { Rent } from "../interfaces/ResponseAPI"
import api from "../services/api"

interface RentsContextProps{
    rents: Rent[];
    addRent: (rent: Rent) => void;
    editRent: (rent: Rent) => void;
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
        .post('api/aluguel', rent)
        .then(() => console.log("deletado!"))
        .catch(()=> console.log("deu erro aqui em"))
    }
    function removeRent(rent: Rent){
        api
        .delete('api/aluguel', {data: rent})
        .then(() => console.log("deletado!"))
        .catch(()=> console.log("deu erro aqui em"))
    }
    function editRent(rent: Rent){
        api
        .put('api/aluguel', rent)
        .then(res => console.log(res.data, 'deu certo'))
        .catch(err => console.log(err, "deu ruim"))
    }

    return(
        <RentsContext.Provider
            value={{rents, addRent, removeRent, editRent}}
        >
            {children}
        </RentsContext.Provider>
    )
}