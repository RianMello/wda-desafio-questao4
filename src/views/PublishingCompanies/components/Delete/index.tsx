import { PublisherCompany } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer } from "./style";
// import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { usePublisher } from "../../../../hooks/usePublisher";
import { useTranslation } from "react-i18next";
import { useRent } from "../../../../hooks/useRent";
import { InpedimentDelete } from "../Delete/style";

interface DeleteProps {
  publisher: PublisherCompany;
  onFinish: () => void;
}

export const Delete = ({ publisher, onFinish }: DeleteProps) => {
  const { rents, handleSituationRent } = useRent();
  const { removePublisher } = usePublisher();
  const { t } = useTranslation();

  function deleteBook() {
    console.log("tentando pelo menos");
    removePublisher(publisher, onFinish);
    return;
  }

  function deleteVerification() {
    const canDelete = rents.find(
      (rent) =>
        rent.livro_id.editora.id === publisher.id &&
        handleSituationRent(rent).label === "Não devolvido"
    );

    if (canDelete !== undefined) {
      return (
        <InpedimentDelete>
          <h1 className="impediment">{t("publisher.impedimentPub")}</h1>
        </InpedimentDelete>
      );
    }
    return (
      <DeleteContainer>
        <h2>{t("sureDelete.deletePublisher")}</h2>
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
