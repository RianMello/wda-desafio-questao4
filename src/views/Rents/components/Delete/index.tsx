import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useRent } from "../../../../hooks/useRent";
import { Rent } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer } from "./style";

interface DeleteProps {
  rent: Rent;
  onFinish: () => void;
}
export function Delete({ rent, onFinish }: DeleteProps) {
  const { editRent } = useRent();
  const { t } = useTranslation();
  const today = dayjs().format("YYYY-MM-DD");

  function returnBook() {
    console.log("tentando pelo menos");
    const returnedBook: Rent = {
      id: rent.id,
      data_aluguel: rent.data_aluguel,
      data_devolucao: today,
      data_previsao: rent.data_previsao,
      livro_id: rent.livro_id,
      usuario_id: rent.usuario_id,
    };
    editRent(returnedBook, onFinish);
  }

  return (
    <DeleteContainer>
      <h2>{t("sureDelete.returnBook")}</h2>
      <div className="buttons-container">
        <button className="btn-Delete" onClick={() => onFinish()}>
          {t("sureDelete.options.no")}
        </button>
        <button className="btn-noDelete" onClick={() => returnBook()}>
          {t("sureDelete.options.yes")}
        </button>
      </div>
    </DeleteContainer>
  );
}
