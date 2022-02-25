import dayjs from "dayjs";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Rent } from "../interfaces/ResponseAPI";
import api from "../services/api";

interface RentsContextProps {
  rents: Rent[];
  addRent: (rent: Rent, onFinish: ()=> void) => void;
  editRent: (rent: Rent, onFinish: ()=> void) => void;
  removeRent: (rent: Rent, onFinish: ()=> void) => void;
  handleSituationRent: (rent: Rent) => string | undefined;
}

interface RentsProviderProps {
  children: ReactNode;
}

export const RentsContext = createContext<RentsContextProps>(
  {} as RentsContextProps
);

export function RentsProvider({ children }: RentsProviderProps) {
  const [rents, setRents] = useState<Rent[]>([]);

  useEffect(() => {
    api
      .get("api/alugueis")
      .then((res) => setRents(res.data))
      .catch((err) => alert(err));
  }, []);

  function addRent(rent: Rent, onFinish: ()=> void) {
    api
      .post("api/aluguel", rent)
      .then(() =>{ 
        onFinish()
      })
      .catch(() => console.log(rent));
  }
  function removeRent(rent: Rent, onFinish: ()=> void) {
    api
      .delete("api/aluguel", { data: rent })
      .then(() => onFinish)
      .catch(() => console.log("deu erro aqui em"));
  }
  function editRent(rent: Rent, onFinish: ()=> void) {
    api
      .put("api/aluguel", rent)
      .then(() => onFinish())
      .catch((err) => console.log(err, "deu ruim"));
  }

  function handleSituationRent(rent: Rent) {
    const today = dayjs().format("YYYY-MM-DD");
    const compareToday = dayjs(today);
    const devolution = dayjs(rent.data_devolucao);
    const deadline = dayjs(rent.data_previsao);

    const returned = compareToday.diff(devolution);
    const dif = devolution.diff(deadline);

    var situation = "devolvido no prazo"

    if (returned > 0) {
      if (rent.data_devolucao !== undefined) {
        if (dif > 0) {
          situation = "devolvido em atraso";
          return situation;
        } else if (dif < 0 || dif === 0) {
          situation = "devolvido no prazo"
        }
        return situation;
      }
    } else if (returned < 0 || returned === 0) {
        situation = "Não devolvido"
      return situation;
    }
    return situation;
  }

  return (
    <RentsContext.Provider value={{ rents, addRent, removeRent, editRent, handleSituationRent }}>
      {children}
    </RentsContext.Provider>
  );
}
