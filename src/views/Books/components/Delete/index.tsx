import { useBook } from "../../../../hooks/useBook";
import { useRent } from "../../../../hooks/useRent";
import { Book } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer, InpedimentDelete } from "./style";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useTranslation } from "react-i18next";

interface DeleteProps {
  book: Book;
  onFinish: () => void;
}

export const Delete = ({ book, onFinish }: DeleteProps) => {
  const { rents, handleSituationRent } = useRent();
  const { removeBook } = useBook();

  const { t } = useTranslation();

  function deleteBook() {
    removeBook(book, onFinish);
    return;
  }

  function deleteVerification() {
    const canDelete = rents.find(
      (rent) =>
        rent.livro_id.id === book.id &&
        handleSituationRent(rent).label === "Não devolvido"
    );
    if (canDelete !== undefined) {
      return (
        <InpedimentDelete>
          <h1 className="impediment">{t("book.impedimentBook")}</h1>
        </InpedimentDelete>
      );
    }
    return (
      <DeleteContainer>
        <h2>{t("sureDelete.deleteBook")}</h2>
        <div className="buttons-container">
          <button className="btn-Delete" onClick={() => onFinish()}>
            {t("sureDelete.options.no")}
          </button>
          <button className="btn-noDelete" onClick={() => deleteBook()}>
            {t("sureDelete.options.yes")}
          </button>
        </div>
      </DeleteContainer>
    );
  }

  return <>{deleteVerification()}</>;
};
