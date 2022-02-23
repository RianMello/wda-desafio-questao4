import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interfaces/ResponseAPI";
import api from "../services/api";


interface UserContextProps{
    users: User[];
    addUser: (user: User, onFinish: () => void) => void;
    editUser: (user: User, onFinish: () => void) => void;
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

    function addUser(user: User, onFinish: () => void){
        api.post('/api/usuario', user)
        .then(()=> onFinish())
        .catch(()=> alert("Não deu"))
    }

    function editUser(user: User, onFinish: () => void){
        api.put('/api/usuario', user)
    }

    function removeUser(user: User){
        api.delete('/api/usuario', {data: user})
    }

    return(
        <UsersContext.Provider value={{users, addUser, editUser, removeUser}}>{children}</UsersContext.Provider>
    )
}