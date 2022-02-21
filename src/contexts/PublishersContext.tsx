import { AxiosRequestConfig } from "axios"
import { createContext, ReactNode, useEffect, useState } from "react"
import { PublisherCompany } from "../interfaces/ResponseAPI"
import api from "../services/api"

interface ProviderProps{
    children: ReactNode;
}

interface PublishersContextProps{
    publishers: PublisherCompany[];
    addPublisher: (publisher: PublisherCompany)=>void;
    removePublisher: (publisher: AxiosRequestConfig<PublisherCompany>)=>void;
    editPublisher: (publisher: PublisherCompany)=>void;
}

export const PublishersContext = createContext<PublishersContextProps>({} as PublishersContextProps)

export function PublishersProvider({children}: ProviderProps){
    const [publishers, setPublishers] = useState<PublisherCompany[]>([])

    useEffect(()=>{
       api
       .get('api/editoras')
       .then(res => setPublishers(res.data))
    },[])
    
    function addPublisher(publisher: PublisherCompany){
        api.post('/api/editora', publisher)
        .then(()=> console.log('sucess'))
        .catch(err => console.log(err))
    }
    function removePublisher(publisher: AxiosRequestConfig<PublisherCompany>){
        api.delete('/api/editora', publisher)
        .then(()=> console.log('sucess'))
        .catch(err => console.log(err))
    }
    function editPublisher(publisher: PublisherCompany){
        api.put('/api/editora', publisher)
        .then(()=> console.log('sucess'))
        .catch(err => console.log(err))
    }
    
    return(
        <PublishersContext.Provider value={{publishers, addPublisher, removePublisher, editPublisher}}>{children}</PublishersContext.Provider>
    )
}