import { useRent } from "../../../../hooks/useRent";
import { Rent } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer } from "./style";

interface DeleteProps {
  rent: Rent;
  onFinish: () => void;
}
export function Delete({ rent, onFinish }: DeleteProps) {
  const { removeRent } = useRent();

  function deleteBook() {
    console.log("tentando pelo menos");
    removeRent(rent, onFinish);
  }

  return (
    <DeleteContainer>
      <h2>Are you sure you want to delete this rental record?</h2>
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
