import { AxiosRequestConfig } from "axios";
import { useBook } from "../../../../hooks/useBook";
import { useRent } from "../../../../hooks/useRent";
import { Book } from "../../../../interfaces/ResponseAPI";
import { DeleteContainer } from './style'

interface DeleteProps {
  book: Book;
  onFinish: () => void;
}

export const Delete = ({ book, onFinish }: DeleteProps) => {
  const { rents } = useRent();
  const { removeBook } = useBook();

  function deleteBook() {
    console.log('tentando pelo menos')
    removeBook(book);
    onFinish();
  }

  function deleteVerification() {
    rents.map((rent) => {
      if (rent.livro_id.id === book.id) {
        return (
          <DeleteContainer>
            <h1 className="impediment">
              This book cannot be deleted at the moment, as we have a rented copy
            </h1>
          </DeleteContainer>
        );
      }
    });
    return (
        <DeleteContainer>
          <h2>Are you sure you want to delete this book from the logs?</h2>
          <div className="buttons-container">
            <button className="btn-noDelete" onClick={onFinish}>No</button>
            <button className="btn-Delete" onClick={() => deleteBook()}>Yes</button>
          </div>
          
        </DeleteContainer>
      );
  }

  return (<>{deleteVerification()}</>);
};
