import { useEffect, useMemo, useState } from "react";
import { useUser } from "../../../../hooks/useUser";
import { User } from "../../../../interfaces/ResponseAPI";

import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { TableContainer, TableStyle } from "../../../../styles/tablesStyles";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

import { ModalComponent } from "../../../../components/Modal";

// import { FormBook } from "../Form";
// import { Delete } from "../Delete";

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

  const { users } = useUser();
  const [userToEdited, setUserToEdited] = useState(users[0]);
  const [userToDelete, setUserToDelete] = useState({} as User);

  useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

  const searched = useMemo(
    () =>
      users.filter(
        (data: User) =>
          data.nome.toLowerCase().includes(search.toLowerCase()) ||
          data.id.toString().includes(search.toLowerCase()) ||
          data.endereco.toString().includes(search.toLowerCase()) ||
          data.email.toLowerCase().includes(search.toLowerCase()) ||
          data.cidade.toLowerCase().includes(search.toLowerCase())
      ),
    [search, users]
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

  const handleDeleteVerification = (user: User) => {
    return "delete";
    // return <Delete book={book} onFinish={handleModalDeleteClose} />;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <TableContainer>
      <ModalComponent
        isDeleteModal={false}
        isOpen={isModalOpen}
        onRequestClose={handleModalFormClose}
      >
        {/* <FormBook onFinish={handleModalFormClose} book={bookToEdited} /> */}
      </ModalComponent>
      <ModalComponent
        isDeleteModal={true}
        isOpen={isModalDeleteOpen}
        onRequestClose={handleModalDeleteClose}
      >
        {handleDeleteVerification(userToDelete)}
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
            setUserToEdited({} as User);
          }}
        >
          <AddCircleTwoToneIcon /> <strong>User</strong>
        </button>
      </div>

      <TableStyle>
        
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th id="id">Id</th>
              <th id="nome">Name</th>
              <th id="endereco">Address</th>
              <th id="email">Email</th>
              <th id="city">City</th>
              <th id="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading === true ? (
              <p>Aguarde enquanto os dados são carregados</p>
            ) : (
              (rowsPerPage > 0
                ? searched.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : searched
              ).map((data: User) => (
                <tr key={data.id}>
                  <td style={{ width: 80 }}> #{data.id}</td>
                  <td style={{ width: 120 }} align="right">
                    {data.nome}
                  </td>
                  <td style={{ width: 120 }} align="right">
                    {data.endereco}
                  </td>
                  <td style={{ width: 120 }} align="right">
                    {data.email}
                  </td>
                  <td style={{ width: 120 }} align="right">
                    {data.cidade}
                  </td>
                  <td style={{ width: 120 }} align="right">
                    <button
                      className="btn-edit"
                      onClick={() => {
                        handleModalFormOpen();
                        setUserToEdited(data);
                      }}
                    >
                      <EditTwoToneIcon color="primary" fontSize="large" />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        setUserToDelete(data);
                        handleModalDeleteOpen();
                      }}
                    >
                      <DeleteForeverTwoToneIcon fontSize="large" />
                    </button>
                  </td>
                </tr>
              ))
            )}

            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={7}
                count={users.length}
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
