import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useBook } from "../../../../hooks/useBook";
import { Book } from "../../../../interfaces/ResponseAPI";

import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { TableContainer, TableStyle } from "../../../../styles/tablesStyles";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { Tooltip } from "@mui/material";

import { useTranslation } from "react-i18next";
import { ModalComponent } from "../../../../components/Modal";
import { FormBook } from "../Form";
import { Delete } from "../Delete";
import { useNavigate } from "react-router";

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

  const { books, load } = useBook();
  const [bookToEdited, setBookToEdited] = useState(books[0]);
  const [bookToDelete, setBookToDelete] = useState({} as Book);

  const [sort, setSort] = useState<Book[]>(books);
  const [typeSort, setTypeSort] = useState("");
  const [asc, setAsc] = useState(true);
  var ordered = false;

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(load);
  }, [load]);

  // const navigate = useNavigate()
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
    navigate("/books");
    document.location.reload();
  };
  const handleModalDeleteOpen = () => {
    setIsModalDeleteOpen(true);
  };
  const handleModalDeleteClose = () => {
    setIsModalDeleteOpen(false);
    navigate("/books");
    document.location.reload();
  };

  const handleDeleteVerification = (book: Book) => {
    return <Delete book={book} onFinish={handleModalDeleteClose} />;
  };

  useEffect(() => {
    const handleSortTable = (id: any) => {
      var sorted = books;
      if (id === "id") {
        if (asc) {
          sorted = [...books].sort((a, b) => a.id - b.id);
        } else {
          sorted = [...books].sort((a, b) => b.id - a.id);
        }
      } else if (id === "name") {
        if (asc) {
          console.log("Dir A-Z");
          sorted = [...books].sort((a, b) => a.nome.localeCompare(b.nome));
        } else {
          console.log("Dir Z-A");
          sorted = [...books].sort((a, b) => b.nome.localeCompare(a.nome));
        }
      } else if (id === "release") {
        if (asc) {
          sorted = [...books].sort((a, b) => a.lancamento - b.lancamento);
        } else {
          sorted = [...books].sort((a, b) => b.lancamento - a.lancamento);
        }
      } else if (id === "publisher-company") {
        if (asc) {
          sorted = [...books].sort((a, b) =>
            a.editora.nome.localeCompare(b.editora.nome)
          );
        } else {
          sorted = [...books].sort((a, b) =>
            b.editora.nome.localeCompare(a.editora.nome)
          );
        }
      } else if (id === "author") {
        if (asc) {
          sorted = [...books].sort((a, b) => b.autor.localeCompare(a.autor));
        } else {
          sorted = [...books].sort((a, b) => a.autor.localeCompare(b.autor));
        }
      } else if (id === "copies") {
        if (asc) {
          sorted = [...books].sort((a, b) => a.quantidade - b.quantidade);
        } else {
          sorted = [...books].sort((a, b) => b.quantidade - a.quantidade);
        }
      } else if (id === "rented") {
        if (asc) {
          sorted = [...books].sort((a, b) => a.totalalugado - b.totalalugado);
        } else {
          sorted = [...books].sort((a, b) => b.totalalugado - a.totalalugado);
        }
      }
      setSort(sorted);
    };
    handleSortTable(typeSort);
  }, [typeSort, books, asc]);

  const searched = useMemo(
    () =>
      sort.filter(
        (data: Book) =>
          data.nome.toLowerCase().includes(search.toLowerCase()) ||
          data.id.toString().includes(search.toLowerCase()) ||
          data.lancamento.toString().includes(search.toLowerCase()) ||
          data.editora.nome.toLowerCase().includes(search.toLowerCase()) ||
          data.quantidade.toString().includes(search.toLowerCase()) ||
          data.autor.toLowerCase().includes(search.toLowerCase()) ||
          data.totalalugado.toString().includes(search.toLowerCase())
      ),
    [search, sort]
  );

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
          placeholder={t("search")}
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
          <AddCircleTwoToneIcon /> <strong>{t("books.book")}</strong>
        </button>
      </div>

      <TableStyle orderDir={asc}>
        <table aria-label="custom pagination table">
          <thead>
            <tr key="thead" className="table-head">
              <th
                id="id"
                onClick={(e) => {
                  setTypeSort(e.currentTarget.id);
                  setAsc(!asc);
                }}
              >
                ID
              </th>
              <th
                id="name"
                onClick={(e) => {
                  setTypeSort(e.currentTarget.id);
                  setAsc(!asc);
                }}
              >
                {t("name")}
                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-6.png" />
              </th>
              <th
                id="release"
                onClick={(e) => {
                  setTypeSort(e.currentTarget.id);
                  setAsc(!asc);
                }}
              >
                {t("release")}
              </th>
              <th
                id="publisher-company"
                onClick={(e) => {
                  setTypeSort(e.currentTarget.id);
                  setAsc(!asc);
                }}
              >
                {t("publisher")}
              </th>
              <th
                id="author"
                onClick={(e) => {
                  setTypeSort(e.currentTarget.id);
                  setAsc(!asc);
                }}
              >
                {t("author")}
              </th>
              <th
                id="copies"
                onClick={(e) => {
                  setTypeSort(e.currentTarget.id);
                  setAsc(!asc);
                }}
              >
                {t("copies")}
              </th>
              <th
                id="rented"
                onClick={(e) => {
                  setTypeSort(e.currentTarget.id);
                  setAsc(!asc);
                }}
              >
                {t("rented")}
              </th>
              <th id="actions">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading === true ? (
              <tr key="load" className="loading">
                <td colSpan={8}>
                  Please wait for the data to load
                  <img
                    className="gif"
                    src="https://img.icons8.com/material-two-tone/24/000000/dots-loading--v3.gif"
                    alt="loadingGIF"
                  />
                </td>
              </tr>
            ) : searched.length !== 0 ? (
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
                        <Tooltip title="Edit">
                          <EditTwoToneIcon fontSize="large" />
                        </Tooltip>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          setBookToDelete(data);
                          handleModalDeleteOpen();
                        }}
                      >
                        <Tooltip title="Delete">
                          <DeleteForeverTwoToneIcon fontSize="large" />
                        </Tooltip>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr key="load" className="loading">
                <td colSpan={8}>Object not found</td>
              </tr>
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
                colSpan={8}
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
