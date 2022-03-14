import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { usePublisher } from "../../../../hooks/usePublisher";
import { PublisherCompany } from "../../../../interfaces/ResponseAPI";

import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { TableContainer, TableStyle } from "../../../../styles/tablesStyles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

import { ModalComponent } from "../../../../components/Modal";
import { FormPublisher } from "../Form";
import { Delete } from "../Delete";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

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

  const { publishers, load } = usePublisher();
  const [publisherToEdited, setPublisherToEdited] = useState(publishers[0]);
  const [publisherToDelete, setPublisherToDelete] = useState(publishers[0]);
  const { t } = useTranslation();

  const [sort, setSort] = useState<PublisherCompany[]>(publishers);
  const [typeSort, setTypeSort] = useState("");
  const [asc, setAsc] = useState(false);
  const [desc, setDesc] = useState(false);

  useEffect(() => {
    setLoading(load);
  }, [load]);

  type SortProps = {
    id: string;
    label: string;
    ordered: boolean;
    direction: {
      asc: string | ReactElement;
      desc: string | ReactElement;
    };
  };

  const thSort: SortProps[] = [
    {
      id: "id",
      label: "ID",
      ordered: false,
      direction: {
        asc: <ArrowUpwardIcon sx={{ color: "black" }} />,
        desc: <ArrowDownwardIcon sx={{ color: "black" }} />,
      },
    },
    {
      id: "name",
      label: t("name"),
      ordered: false,
      direction: {
        asc: <ArrowUpwardIcon sx={{ color: "black" }} />,
        desc: <ArrowDownwardIcon sx={{ color: "black" }} />,
      },
    },
    {
      id: "cidade",
      label: t("cityMain"),
      ordered: false,
      direction: {
        asc: <ArrowUpwardIcon sx={{ color: "black" }} />,
        desc: <ArrowDownwardIcon sx={{ color: "black" }} />,
      },
    },
  ];

  const [sortSelector, setSortSelector] = useState(thSort);

  const searched = useMemo(
    () =>
      sort.filter(
        (data: PublisherCompany) =>
          data.nome.toLowerCase().includes(search.toLowerCase()) ||
          data.id.toString().includes(search.toLowerCase()) ||
          data.cidade.toLowerCase().includes(search.toLowerCase())
      ),
    [search, sort]
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

  const handleDeleteVerification = (publisher: PublisherCompany) => {
    return <Delete publisher={publisher} onFinish={handleModalDeleteClose} />;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - publishers.length) : 0;

  const sortOrNo = useCallback((ref: string, ord: string) => {
    console.log(ref);
    console.log(ord);
    if (ord === "asc") {
      setAsc(true);
      setSortSelector((oldState: SortProps[]) => {
        return oldState.map((old) => {
          if (old.id !== ref && old.ordered === true) {
            return { ...old, ordered: false };
          }
          if (old.id === ref) {
            return { ...old, ordered: true };
          }
          return { ...old, ordered: false };
        });
      });
    } else if (ord === "desc") {
      setAsc(false);
      setDesc(true);
      setSortSelector((oldState: SortProps[]) => {
        return oldState.map((old) => {
          if (old.id !== ref && old.ordered === false) {
            return { ...old, ordered: false };
          }
          if (old.id === ref) {
            return { ...old, ordered: true };
          }
          return { ...old, ordered: false };
        });
      });
    } else if (ord === "alt") {
      setAsc(false);
      setDesc(false);
      setSortSelector((oldState: SortProps[]) => {
        return oldState.map((old) => {
          if (old.id === ref && old.ordered === true) {
            return { ...old, ordered: false };
          }
          return { ...old, ordered: false };
        });
      });
    }
  }, []);

  const handleSortTable = useCallback(
    (id: any) => {
      var sorted = publishers;
      if (id === "id") {
        if (asc) {
          sorted = [...publishers].sort((a, b) => a.id - b.id);
        } else if (desc) {
          sorted = [...publishers].sort((a, b) => b.id - a.id);
        }
      } else if (id === "name") {
        if (asc) {
          sorted = [...publishers].sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (desc) {
          sorted = [...publishers].sort((a, b) => b.nome.localeCompare(a.nome));
        }
      } else if (id === "cidade") {
        if (asc) {
          sorted = [...publishers].sort((a, b) =>
            a.cidade.localeCompare(b.cidade)
          );
        } else if (desc) {
          sorted = [...publishers].sort((a, b) =>
            b.cidade.localeCompare(a.cidade)
          );
        }
      }
      setSort(sorted);
    },
    [asc, desc, publishers]
  );

  useEffect(() => {
    handleSortTable(typeSort);
  }, [publishers, asc, desc, typeSort, handleSortTable]);

  return (
    <TableContainer>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={handleModalFormClose}
        isDeleteModal={false}
        title="Edit"
      >
        <FormPublisher
          onFinish={handleModalFormClose}
          publisher={publisherToEdited}
        />
      </ModalComponent>
      <ModalComponent
        isDeleteModal={true}
        isOpen={isModalDeleteOpen}
        onRequestClose={handleModalDeleteClose}
        title="Edit"
      >
        {handleDeleteVerification(publisherToDelete)}
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
            setPublisherToEdited({} as PublisherCompany);
          }}
        >
          <AddCircleTwoToneIcon /> <strong>{t("publisher")}</strong>
        </button>
      </div>

      <TableStyle asc={asc} desc={desc}>
        <table aria-label="custom pagination table">
          <thead>
            <tr key="thead" className="table-head">
              {sortSelector.map((th) => {
                console.log(th.ordered);
                const handleIcon = () => {
                  if (th.ordered) {
                    if (asc) {
                      return th.direction.asc;
                    }
                    if (desc) {
                      return th.direction.desc;
                    }
                  } else if (asc === false && desc === false) {
                    return <ShuffleIcon sx={{ color: "black" }} />;
                  }
                  return <ShuffleIcon className="notSorted" />;
                };
                return (
                  <th
                    id={th.id}
                    onClick={(e) => {
                      setTypeSort(e.currentTarget.id);
                      if (desc === false && asc === false) {
                        sortOrNo(e.currentTarget.id, "asc");
                      }
                      if (asc === true && desc === false) {
                        sortOrNo(e.currentTarget.id, "desc");
                      }
                      if (desc === true && asc === false) {
                        sortOrNo(e.currentTarget.id, "alt");
                      }
                    }}
                  >
                    <div className="sortIndicator">
                      {th.label}
                      <span>{handleIcon()}</span>
                    </div>
                  </th>
                );
              })}
              <th id="actions">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading === true ? (
              <tr key="load" className="loading">
                <td colSpan={4}>
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
              ).map((data: PublisherCompany) => {
                return (
                  <tr key={data.id}>
                    <td> #{data.id}</td>
                    <td align="right">{data.nome}</td>
                    <td align="right">{data.cidade}</td>
                    <td align="right">
                      <div className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => {
                            handleModalFormOpen();
                            setPublisherToEdited(data);
                          }}
                        >
                          <Tooltip title="Edit">
                            <EditTwoToneIcon fontSize="large" />
                          </Tooltip>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            setPublisherToDelete(data);
                            handleModalDeleteOpen();
                          }}
                        >
                          <Tooltip title="Delete">
                            <DeleteForeverTwoToneIcon fontSize="large" />
                          </Tooltip>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr key="load" className="loading">
                <td colSpan={8}>Object not found!</td>
              </tr>
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
                colSpan={4}
                count={publishers.length}
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
