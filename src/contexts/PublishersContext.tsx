import { createContext, ReactNode, useEffect, useState } from "react";
import { PublisherCompany } from "../interfaces/ResponseAPI";
import api from "../services/api";

interface ProviderProps {
  children: ReactNode;
}

interface PublishersContextProps {
    load: boolean;
  publishers: PublisherCompany[];
  addPublisher: (publisher: PublisherCompany, onFinish: () => void) => void;
  removePublisher: (publisher: PublisherCompany, onFinish: () => void) => void;
  editPublisher: (publisher: PublisherCompany, onFinish: () => void) => void;
}

export const PublishersContext = createContext<PublishersContextProps>(
  {} as PublishersContextProps
);

export function PublishersProvider({ children }: ProviderProps) {
  const [publishers, setPublishers] = useState<PublisherCompany[]>([]);

  const [load, setLoad] = useState(true)

  useEffect(() => {
    api
    .get("api/editoras")
    .then((res) => {
        setLoad(false)
        setPublishers(res.data)
    });
  }, []);

  function addPublisher(publisher: PublisherCompany, onFinish: () => void) {
    api
      .post("/api/editora", publisher)
      .then(() => onFinish())
      .catch((err) => alert("Incorrect data, check it and try again"));
  }
  function removePublisher(publisher: PublisherCompany, onFinish: () => void) {
    api
      .delete("/api/editora", { data: publisher })
      .then(() => onFinish())
      .catch((err) => console.log(err));
  }
  function editPublisher(publisher: PublisherCompany, onFinish: () => void) {
    api
      .put("/api/editora", publisher)
      .then(() => onFinish())
      .catch((err) => alert(err));
  }

  return (
    <PublishersContext.Provider
      value={{ load, publishers, addPublisher, removePublisher, editPublisher }}
    >
      {children}
    </PublishersContext.Provider>
  );
}
