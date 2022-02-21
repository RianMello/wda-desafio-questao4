import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interfaces/ResponseAPI";
import api from "../services/api";


interface UserContextProps{
    users: User[];
}

interface UserProviderProps{
    children: ReactNode;
}

export const UsersContext = createContext<UserContextProps>({} as UserContextProps)

export function UserProvider({children}: UserProviderProps){

    const [users, setUsers] = useState<User[]>([])

    useEffect(() =>{
        api
        .get('/api/usuarios')
        .then(response => setUsers(response.data))
    })

    return(
        <UsersContext.Provider value={{users}}>{children}</UsersContext.Provider>
    )
}