import { RentsContext } from "../contexts/RentsContext";
import { useContext } from "react";

export function useRent(){
    const context = useContext(RentsContext)
    const { rents, addRent, removeRent, editRent, handleSituationRent} = context;

    return { rents, addRent, removeRent, editRent, handleSituationRent }
}
