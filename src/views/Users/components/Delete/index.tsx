import { useRent } from "../../../../hooks/useRent";
import { useUser } from "../../../../hooks/useUser";
import { User } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer } from "./style";

interface DeleteProps {
  user: User;
  onFinish: () => void;
}

export const Delete = ({ user, onFinish }: DeleteProps) => {
  const { removeUser } = useUser();
  const { rents } = useRent();

  function deleteBook() {
    console.log("tentando pelo menos");
    removeUser(user);
    onFinish();
  }

  function deleteVerification() {
    const canDelete = rents.find((rent) => rent.usuario_id.id === user.id);
    if (canDelete !== undefined) {
      return (
        <DeleteContainer>
          <h1 className="impediment">
            This book cannot be deleted at the moment, as we have a book rented
          </h1>
        </DeleteContainer>
      );
    }
    return (
      <DeleteContainer>
        <h2>Are you sure you want to delete the record for this User?</h2>
        <div className="buttons-container">
          <button className="btn-Delete" onClick={() => onFinish()}>
            No
          </button>
          <button className="btn-noDelete" onClick={() => deleteBook()}>
            Yes
          </button>
        </div>
      </DeleteContainer>
    );
  }

  return <>{deleteVerification()}</>;
};
