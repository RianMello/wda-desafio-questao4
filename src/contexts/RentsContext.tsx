import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Rent } from "../interfaces/ResponseAPI";
import api from "../services/api";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import dayjs from "dayjs";

interface RentsContextProps {
  rents: Rent[];
  load: boolean;
  addRent: (rent: Rent, onFinish: () => void) => void;
  editRent: (rent: Rent, onFinish: () => void) => void;
  removeRent: (rent: Rent, onFinish: () => void) => void;
  handleSituationRent: (rent: Rent) => { label: string; icon: ReactElement };
}

interface RentsProviderProps {
  children: ReactNode;
}

export const RentsContext = createContext<RentsContextProps>(
  {} as RentsContextProps
);

export function RentsProvider({ children }: RentsProviderProps) {
  const [rents, setRents] = useState<Rent[]>([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    api
      .get("api/alugueis")
      .then((res) => {
        setLoad(false);
        setRents(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  function addRent(rent: Rent, onFinish: () => void) {
    api
      .post("api/aluguel", rent)
      .then(() => {
        onFinish();
      })
      .catch(() => alert("Incorrect data, check it and try again"));
  }
  function removeRent(rent: Rent, onFinish: () => void) {
    api
      .delete("api/aluguel", { data: rent })
      .then(() => onFinish())
      .catch(() => console.log("deu erro aqui em"));
  }
  function editRent(rent: Rent, onFinish: () => void) {
    api
      .put("api/aluguel", rent)
      .then(() => onFinish())
      .catch((err) => console.log(err, "deu ruim"));
  }

  function handleSituationRent(rent: Rent) {
    var situation = {
      label: "Não devolvido",
      icon: <CheckBoxOutlineBlankIcon />,
    };

    var dateRet = new Date(Date.parse(rent.data_devolucao));
    var datePrazo = new Date(Date.parse(rent.data_previsao));

    if (rent.data_devolucao) {
      if (datePrazo <= dateRet) {
        situation = {
          label: `Devolvido com atraso, na data: ${dayjs(
            rent.data_devolucao
          ).format("YYYY/MM/DD")}!`,
          icon: <CheckBoxIcon sx={{ color: "red" }} />,
        };
      } else if (datePrazo >= dateRet) {
        situation = {
          label: `Devolvido na data: ${dayjs(rent.data_devolucao).format(
            "YYYY/MM/DD"
          )}!`,
          icon: <CheckBoxIcon sx={{ color: "green" }} />,
        };
      }
    } else {
      situation = {
        label: "Não devolvido",
        icon: <CheckBoxOutlineBlankIcon />,
      };
    }
    return situation;
  }

  return (
    <RentsContext.Provider
      value={{
        load,
        rents,
        addRent,
        removeRent,
        editRent,
        handleSituationRent,
      }}
    >
      {children}
    </RentsContext.Provider>
  );
}
