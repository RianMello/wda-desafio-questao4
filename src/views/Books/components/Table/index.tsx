import { useEffect, useMemo, useState } from "react";
import { useBook } from "../../../../hooks/useBook";
import { Book } from "../../../../interfaces/ResponseAPI";

import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { TableContainer, TableStyle } from "../../../../styles/tablesStyles";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

import { ModalComponent } from "../../../../components/Modal";
import { FormBook } from "../Form";
import { Delete } from "../Delete";

const blue = {
  200: "#A5D8FF",
  400: "#3399FF",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
    & .MuiTablePaginationUnstyled-spacer {
      display: none;
    }
    & .MuiTablePaginationUnstyled-toolbar {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
    & .MuiTablePaginationUnstyled-selectLabel {
      margin: 0;
    }
    & .MuiTablePaginationUnstyled-select {
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      border-radius: 50px;
      background-color: transparent;
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
      }
      &:focus {
        outline: 1px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
      }
    }
    & .MuiTablePaginationUnstyled-displayedRows {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
    & .MuiTablePaginationUnstyled-actions {
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      border-radius: 50px;
      text-align: center;
    }
    & .MuiTablePaginationUnstyled-actions > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
      }
      &:focus {
        outline: 1px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
      }
    }
    `
);

export function Table() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const { books } = useBook();
  const [bookToEdited, setBookToEdited] = useState(books[0]);
  const [bookToDelete, setBookToDelete] = useState({} as Book);

  useEffect(() => {
    if (books) {
      setLoading(false);
    }
  },[books]);

  const searched = useMemo(
    () =>
      books.filter(
        (data: Book) =>
          data.nome.toLowerCase().includes(search.toLowerCase()) ||
          data.id.toString().includes(search.toLowerCase()) ||
          data.lancamento.toString().includes(search.toLowerCase()) ||
          data.editora.nome.toLowerCase().includes(search.toLowerCase()) ||
          data.quantidade.toString().includes(search.toLowerCase()) ||
          data.autor.toLowerCase().includes(search.toLowerCase()) ||
          data.totalalugado.toString().includes(search.toLowerCase())
      ),
    [search, books]
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalFormOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalFormClose = () => {
    setIsModalOpen(false);
    document.location.reload();
  };
  const handleModalDeleteOpen = () => {
    setIsModalDeleteOpen(true);
  };
  const handleModalDeleteClose = () => {
    setIsModalDeleteOpen(false);
    document.location.reload();
  };

  const handleDeleteVerification = (book: Book) => {
    return <Delete book={book} onFinish={handleModalDeleteClose} />;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  return (
    <TableContainer>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={handleModalFormClose}
        isDeleteModal={false}
      >
        <FormBook onFinish={handleModalFormClose} book={bookToEdited} />
      </ModalComponent>
      <ModalComponent
        isDeleteModal={true}
        isOpen={isModalDeleteOpen}
        onRequestClose={handleModalDeleteClose}
      >
        {handleDeleteVerification(bookToDelete)}
      </ModalComponent>
      <div className="header-table-actions">
        <input
          className="search-input"
          type="text"
          placeholder={"Search..."}
          value={search}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setSearch(target.value);
          }}
        />
        <button
          className="btn-new"
          onClick={() => {
            handleModalFormOpen();
            setBookToEdited({} as Book);
          }}
        >
          <AddCircleTwoToneIcon /> <strong>Book</strong>
        </button>
      </div>

      <TableStyle>
        <table aria-label="custom pagination table">
          <thead>
            <tr key="thead" className="table-head">
              <th id="id">Id</th>
              <th id="name">Name</th>
              <th id="release">Release</th>
              <th id="publisher-company">Publisher</th>
              <th id="author">Author</th>
              <th id="copies">Copies</th>
              <th id="rented">Rented</th>
              <th id="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading === true ? (
              <tr key="load"><td>Please wait for the data to load...</td></tr>
              
            ) : (
              (rowsPerPage > 0
                ? searched.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : searched
              ).map((data: Book) => {
                return (
                  <tr key={data.id}>
                    <td style={{ width: 80 }}> #{data.id}</td>
                    <td style={{ width: 120 }} align="right">
                      {data.nome}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {data.lancamento}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {data.editora.nome}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {data.autor}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {data.quantidade}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {data.totalalugado}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      <button
                      className="btn-edit"
                        onClick={() => {
                          handleModalFormOpen();
                          setBookToEdited(data);
                        }}
                      >
                        <EditTwoToneIcon color="primary" fontSize="large" />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          setBookToDelete(data);
                          handleModalDeleteOpen();
                        }}
                      >
                        <DeleteForeverTwoToneIcon fontSize="large" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}

            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={8} />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="pagination">
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={books.length + 1}
                count={books.length}
                rowsPerPage={rowsPerPage}
                page={page}
                componentsProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  } as any,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </TableStyle>
    </TableContainer>
  );
}
