import { useBook } from "../../../../hooks/useBook";
import { useRent } from "../../../../hooks/useRent";
import { Book } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer, InpedimentDelete } from "./style";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { useTranslation } from "react-i18next";

interface DeleteProps {
  book: Book;
  onFinish: () => void;
}

export const Delete = ({ book, onFinish }: DeleteProps) => {
  const { rents } = useRent();
  const { removeBook } = useBook();

  const { t } = useTranslation()

  function deleteBook() {
    console.log("tentando pelo menos");
    removeBook(book, onFinish);
    return
  }

  function deleteVerification() {
    const canDelete = rents.find((rent) => rent.livro_id.id === book.id);
    if (canDelete !== undefined) {
      return (
        <InpedimentDelete>
          <GppMaybeIcon className="iconInpediment" fontSize="inherit"/>
          <h1 className="impediment">
          {t('impediment.impedimentBook')}
          </h1>
        </InpedimentDelete>
      );
    }
    return (
      <DeleteContainer>
        <h2>{t('sureDelete.deleteBook')}</h2>
        <div className="buttons-container">
          <button className="btn-Delete" onClick={() => onFinish()}>
            {t('options.no')}
          </button>
          <button className="btn-noDelete" onClick={() => deleteBook()}>
            {t('options.yes')}
          </button>
        </div>
      </DeleteContainer>
    );
  }

  return <>{deleteVerification()}</>;
};
