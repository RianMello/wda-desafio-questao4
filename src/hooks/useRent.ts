import { RentsContext } from "../contexts/RentsContext";
import { useContext } from "react";

export function useRent(){
    const context = useContext(RentsContext)
    const { rents } = context;

    return { rents }
}
