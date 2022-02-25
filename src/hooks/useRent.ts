import { RentsContext } from "../contexts/RentsContext";
import { useContext } from "react";

export function useRent(){
    const context = useContext(RentsContext)
    const { load, rents, addRent, removeRent, editRent, handleSituationRent} = context;

    return { load, rents, addRent, removeRent, editRent, handleSituationRent }
}
