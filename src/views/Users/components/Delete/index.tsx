import { useRent } from "../../../../hooks/useRent";
import { useUser } from "../../../../hooks/useUser";
import { User } from "../../../../interfaces/ResponseAPI";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { DeleteContainer, InpedimentDelete } from "./style";
import { useTranslation } from "react-i18next";

interface DeleteProps {
  user: User;
  onFinish: () => void;
}

export const Delete = ({ user, onFinish }: DeleteProps) => {
  const { removeUser } = useUser();
  const { rents, handleSituationRent } = useRent();
  const { t } = useTranslation()

  function deleteUser() {
    removeUser(user, onFinish);
  }

  function deleteVerification() {
    const canDelete = rents.find(
      (rent) =>
        rent.usuario_id.id === user.id &&
        handleSituationRent(rent) === "Não devolvido"
    );
    if (canDelete !== undefined) {
      return (
        <InpedimentDelete>
          <GppMaybeIcon className="iconInpediment" />
          <h1 className="impediment">
            {t('impediment.impedimentUser')}
          </h1>
        </InpedimentDelete>
      );
    }
    return (
      <DeleteContainer>
        <h2>{t('sureDelete.deleteUser')}</h2>
        <div className="buttons-container">
          <button className="btn-Delete" onClick={() => onFinish()}>
            {t('options.no')}
          </button>
          <button className="btn-noDelete" onClick={() => deleteUser()}>
          {t('options.yes')}
          </button>
        </div>
      </DeleteContainer>
    );
  }

  return <>{deleteVerification()}</>;
};
