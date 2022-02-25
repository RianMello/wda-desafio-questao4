import { useRent } from "../../../../hooks/useRent";
import { useUser } from "../../../../hooks/useUser";
import { User } from "../../../../interfaces/ResponseAPI";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { DeleteContainer, InpedimentDelete } from "./style";

interface DeleteProps {
  user: User;
  onFinish: () => void;
}

export const Delete = ({ user, onFinish }: DeleteProps) => {
  const { removeUser } = useUser();
  const { rents, handleSituationRent } = useRent();

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
            This user's record cannot be deleted yet as he has an unreturned
            book
          </h1>
        </InpedimentDelete>
      );
    }
    return (
      <DeleteContainer>
        <h2>Are you sure you want to delete the record for this User?</h2>
        <div className="buttons-container">
          <button className="btn-Delete" onClick={() => onFinish()}>
            No
          </button>
          <button className="btn-noDelete" onClick={() => deleteUser()}>
            Yes
          </button>
        </div>
      </DeleteContainer>
    );
  }

  return <>{deleteVerification()}</>;
};
