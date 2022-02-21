import { useContext } from "react"
import { UsersContext } from "../contexts/UsersContext"

export function useUser(){
    const { users } = useContext(UsersContext)
    return { users }
}