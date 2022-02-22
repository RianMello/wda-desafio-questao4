import { useEffect, useMemo, useState } from "react";
import { useRent } from '../../../../hooks/useRent'
import { Rent } from "../../../../interfaces/ResponseAPI";
// import * as dayjs from "dayjs"

import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { TableContainer, TableStyle } from "../../../../styles/tablesStyles";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

import { ModalComponent } from "../../../../components/Modal";
import { Delete } from "../Delete";
import { FormRent } from "../Forms";

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

  const { rents } = useRent()
  const [rentToEdited, setRentToEdited] = useState(rents[0]);
  const [rentToDelete, setRentToDelete] = useState({} as Rent);

  useEffect(() => {
    if (rents) {
      setLoading(false);
    }
  }, [rents]);

  const searched = useMemo(
    () =>
    rents.filter(
        (data: Rent) =>
          data.data_aluguel.toString().includes(search.toLowerCase()) ||
          data.data_previsao.toString().includes(search.toLowerCase()) ||
          data.data_devolucao.toString().includes(search.toLowerCase()) ||
          data.id.toString().includes(search.toLowerCase()) ||   
          data.livro_id.nome.toLowerCase().includes(search.toLowerCase()) ||
          data.usuario_id.nome.toLowerCase().includes(search.toLowerCase())
          
      ),
    [search, rents]
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
  };

  const handleDeleteVerification = (rent: Rent) => {
    return <Delete rent={rent} onFinish={handleModalDeleteClose} />;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rents.length) : 0;

  // const dates = new Date()

  return (
    <TableContainer>
      <ModalComponent
        isDeleteModal={false}
        isOpen={isModalOpen}
        onRequestClose={handleModalFormClose}
      >
        <FormRent onFinish={handleModalFormClose} rent={rentToEdited} />
      </ModalComponent>
      <ModalComponent
        isDeleteModal={true}
        isOpen={isModalDeleteOpen}
        onRequestClose={handleModalDeleteClose}
      >
        {handleDeleteVerification(rentToDelete)}
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
            setRentToEdited({} as Rent);
          }}
        >
          <AddCircleTwoToneIcon /> <strong>Rent</strong>
        </button>
      </div>

      <TableStyle>
        <table aria-label="custom pagination table">
          <thead>
            <tr className="table-head">
              <th id="id">ID</th>
              <th id="author">User who rented</th>
              <th id="copies">Rented book</th>
              <th id="rentalDate">Rental date</th>
              <th id="returnDate">Return date</th>
              <th id="expectedDate">Expected date</th>
              <th id="situation">Situation</th>
              <th id="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading === true ? (
              <p>Please wait for the data to load...</p>
            ) : (
              (rowsPerPage > 0
                ? searched.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : searched
              ).map((data: Rent) => {
                const dateRent = new Date(data.data_aluguel)
                const dateReturn = new Date(data.data_devolucao)
                const dateExpected = new Date(data.data_previsao)
                const dateRentFormated = dateRent.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
                const dateReturnFormated = dateReturn.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
                const dateExpectedFormated = dateExpected.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
                return (
                  <tr key={data.id}>
                    <td style={{ width: 80 }}>#{data.id}</td>
                    <td style={{ width: 120 }} align="right">
                      {data.usuario_id.nome}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {data.livro_id.nome}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {dateRentFormated}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {dateReturnFormated}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {dateExpectedFormated}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      pendente...
                    </td>
                    <td style={{ width: 120 }} align="right">
                      <button
                      className="btn-edit"
                        onClick={() => {
                          handleModalFormOpen();
                          setRentToEdited(data);
                        }}
                      >
                        <EditTwoToneIcon color="primary" fontSize="large" />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          setRentToDelete(data);
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
                <td colSpan={3} />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="pagination">
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={rents.length + 1}
                count={rents.length}
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
