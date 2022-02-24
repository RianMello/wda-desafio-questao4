import { PublisherCompany } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer } from './style'
// import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { usePublisher } from "../../../../hooks/usePublisher";

interface DeleteProps {
  publisher: PublisherCompany;
  onFinish: () => void;
}

export const Delete = ({ publisher, onFinish }: DeleteProps) => {
  const { removePublisher } = usePublisher();

  function deleteBook() {
    console.log("tentando pelo menos");
    removePublisher(publisher, onFinish);
    return
  }

  function deleteVerification() {
    return (
      <DeleteContainer>
        <h2>Are you sure you want to delete the record for this Publisher Company?</h2>
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
