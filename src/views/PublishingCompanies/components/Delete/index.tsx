import { PublisherCompany } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer } from './style'
// import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { usePublisher } from "../../../../hooks/usePublisher";
import { useTranslation } from "react-i18next";

interface DeleteProps {
  publisher: PublisherCompany;
  onFinish: () => void;
}

export const Delete = ({ publisher, onFinish }: DeleteProps) => {
  const { removePublisher } = usePublisher();
  const { t } = useTranslation()

  function deleteBook() {
    console.log("tentando pelo menos");
    removePublisher(publisher, onFinish);
    return
  }

  function deleteVerification() {
    return (
      <DeleteContainer>
        <h2>{t('sureDelete.deletePublisher')}</h2>
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
