import { useTranslation } from "react-i18next";
import { useRent } from "../../../../hooks/useRent";
import { Rent } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer } from "./style";

interface DeleteProps {
  rent: Rent;
  onFinish: () => void;
}
export function Delete({ rent, onFinish }: DeleteProps) {
  const { removeRent } = useRent();
  const { t } = useTranslation()

  function deleteBook() {
    console.log("tentando pelo menos");
    removeRent(rent, onFinish);
  }

  return (
    <DeleteContainer>
      <h2>{t('sureDelete.deleteRent')}</h2>
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
