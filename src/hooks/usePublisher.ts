import { useContext } from "react";
import { PublishersContext } from "../contexts/PublishersContext";

export function usePublisher(){
    const context = useContext(PublishersContext)
    const { load, publishers, addPublisher, removePublisher, editPublisher } = context
    return { load, publishers, addPublisher, removePublisher, editPublisher }
}