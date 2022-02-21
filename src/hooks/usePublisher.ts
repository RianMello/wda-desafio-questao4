import { useContext } from "react";
import { PublishersContext } from "../contexts/PublishersContext";

export function usePublisher(){
    const context = useContext(PublishersContext)
    const { publishers, addPublisher, removePublisher, editPublisher } = context
    return { publishers, addPublisher, removePublisher, editPublisher }
}