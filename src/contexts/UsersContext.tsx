import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interfaces/ResponseAPI";
import api from "../services/api";


interface UserContextProps{
    users: User[];
    load: boolean;
    addUser: (user: User, onFinish: () => void) => void;
    editUser: (user: User, onFinish: () => void) => void;
    removeUser: (user: User, onFinish: () => void)=> void;
}
interface UserProviderProps{
    children: ReactNode;
}

export const UsersContext = createContext<UserContextProps>({} as UserContextProps)

export function UserProvider({children}: UserProviderProps){

    const [users, setUsers] = useState<User[]>([])
    const [load, setLoad] = useState(true)

    useEffect(() =>{
        api
        .get('/api/usuarios')
        .then(response => {
            setUsers(response.data)
            setLoad(false)
        })
    },[])

    function addUser(user: User, onFinish: () => void){
        api.post('/api/usuario', user)
        .then(()=> onFinish())
        .catch(()=> alert("Incorrect data, check it and try again"))
    }

    function editUser(user: User, onFinish: () => void){
        api.put('/api/usuario', user)
        .then(()=> onFinish())
    }

    function removeUser(user: User, onFinish: () => void){
        api.delete('/api/usuario', {data: user})
        .then(()=> onFinish())
    }

    return(
        <UsersContext.Provider value={{users, load, addUser, editUser, removeUser}}>{children}</UsersContext.Provider>
    )
}