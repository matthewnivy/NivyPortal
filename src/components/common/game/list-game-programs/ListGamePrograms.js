import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import marker from "../../../../assets/marker.svg";
import moment from "moment";
import deleteIcon from "../../../../assets/delete-icon.svg";
import AuthContext from "../../../../context/auth-context";
import { useNavigate, useNavigation } from "react-router-dom";

const ListGamePrograms = ({
  modalScreen,
  setModal,
  data,
  loading,
  tableTitle,
  setData,
  deleteGameProgram,
}) => {
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);
  const columns = [
    {
      name: <div className={`tableHeader`}>Opponent Team Image</div>,
      selector: (row) => (
        <div className={"tableContent"}>
          <img src={row.image} />
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className={`tableHeader`}>Opponent Team Name</div>,
      selector: (row) => <div className={"tableContent"}>{row.title}</div>,
      sortable: true,
    },
    {
      name: <div className={`tableHeader`}>Date</div>,
      id: "lastName",
      selector: (row) => (
        <div className={"tableContent"}>
          {moment.utc(row.date).local().format("DD/MM/YYYY")}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className={`tableHeader`}>Actions</div>,
      selector: (row) => (
        <div className="d-flex flex-row align-items-center my-2 mx-auto">
          <div
            className={`customizedButtonGameProgram`}
            id="edit-vendorGameProgram"
            style={{
              borderRadius: 8,
              fontWeight: 400,
              cursor: "pointer",
            }}
            onClick={() => editGameProgram(row)}
          >
            <img src={marker} className="me-1" />
            Edit
          </div>
          <div
            className={`customizedButton`}
            id="edit-vendor"
            style={{
              borderRadius: 8,
              fontWeight: 400,
              width: 80,
              background: "red",
              cursor: "pointer",
              minWidth: "1vw",
            }}
            onClick={() => deleteGameProgram(row.id)}
          >
            <img src={deleteIcon} className="deleteicon me-1" />
            <span className="deleteIconText"> Delete </span>
          </div>
        </div>
      ),
    },
  ];

  const editGameProgram = (gameProgram) => {
    navigation("/manageGames/new");
    authCtx.setSelectedGameProgram(gameProgram);
  };

  return (
    <div
      className="mb-3 campaign-table-display"
      style={{
        background: "white",
        padding: 0,
        borderRadius: 20,
        border: "2px solid #BCBCBC",
      }}
    >
      <div className="flexBetween my-3 mx-4">
        <div
          className="ms-1"
          style={{
            color: "#8C8C8C",
            fontSize: 18,
          }}
        >
          {tableTitle}
        </div>
      </div>
      <div className="mb-4">
        <DataTable
          data={data}
          columns={columns}
          progressPending={loading}
          progressComponent={
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={"100vw"} height={47} />
              <Skeleton variant="rounded" width={"100vw"} height={47} />
              <Skeleton variant="rectangular" width={"100vw"} height={47} />
              <Skeleton variant="rounded" width={"100vw"} height={47} />
              <Skeleton variant="rectangular" width={"100vw"} height={47} />
              <Skeleton variant="rounded" width={"100vw"} height={47} />
              <Skeleton variant="rectangular" width={"100vw"} height={47} />
              <Skeleton variant="rounded" width={"100vw"} height={47} />
            </Stack>
          }
        />
      </div>
    </div>
  );
};

export default ListGamePrograms;