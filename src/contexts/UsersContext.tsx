import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interfaces/ResponseAPI";
import api from "../services/api";


interface UserContextProps{
    users: User[];
    addUser: (user: User) => void;
    editUser: (user: User) => void;
    removeUser: (user: User)=> void;
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

    function addUser(user: User){
        api.post('/api/usuario', user)
        .then(response => console.log(response.data))
        .catch(response => console.log(response.data))
    }

    function editUser(user: User){
        api.put('/api/usuario', user)
    }

    function removeUser(user: User){
        api.delete('/api/usuario', {data: user})
    }

    return(
        <UsersContext.Provider value={{users, addUser, editUser, removeUser}}>{children}</UsersContext.Provider>
    )
}