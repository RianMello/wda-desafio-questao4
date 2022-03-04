import { useContext } from "react"
import { UsersContext } from "../contexts/UsersContext"

export function useUser(){
    const { users, load, addUser, editUser, removeUser} = useContext(UsersContext)
    return { users,load, addUser, editUser, removeUser }
}