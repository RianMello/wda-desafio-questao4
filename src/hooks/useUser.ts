import { useContext } from "react"
import { UsersContext } from "../contexts/UsersContext"

export function useUser(){
    const { users, addUser, editUser, removeUser} = useContext(UsersContext)
    return { users, addUser, editUser, removeUser }
}