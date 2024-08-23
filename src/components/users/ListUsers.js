// import { faEdit, faTrashCan, faEye } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DataTable from "react-data-table-component";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader } from "reactstrap";
// import EditButton from "../../assets/utils/images/edit-button.png";
// import { deleteExistingUser } from "../../utils/ApiHandler";
// import { notify } from "../../utils/Notification";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import avatar1 from "../../assets/1.jpg";
import marker from "../../assets/marker.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { UsersApi } from "../../utils/api";
import styles from "../../global.module.css";

const ListUsers = ({ data, loading, tableTitle, setData, getUsersList }) => {
  console.log(data, "DATA");

  const usersApi = new UsersApi();
  const columns = [
    {
      name: <div className="table-title- mx-auto">Image</div>,
      selector: (row) => (
        <img
          width={40}
          className="rounded-circle table-title- mx-auto"
          src={row.profileImage ? row.profileImage : avatar1}
          alt="Avatar"
        />
      ),
      width: "7%",
    },
    {
      name: <div className="table-title- mx-auto">Account Title</div>,
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: <div className="table-title- mx-auto">Managed Venues</div>,
      selector: (row) => row.venueIds,
      sortable: true,
    },
    {
      name: <div className="table-title- mx-auto">Managed Vendors</div>,
      selector: (row) => row.managedVendors,
      sortable: true,
    },
  ];

  columns.push({
    name: <div className={`tableTitle2 mx-auto`}>Actions</div>,
    selector: (row) => (
      <div className="d-flex flex-row align-items-center justify-content-center my-2 w-100">
        <Link
          to={row.id}
          state={{ user: row }}
          style={{
            textDecoration: "none",
          }}
        >
          {/* {console.log(row.managedVendors)} */}
          <div className={`customizedButton`} id="edit-vendor">
            <img src={marker} />
            &nbsp; Edit
          </div>
        </Link>

        <div
          className={`customizedButton`}
          id="edit-vendor"
          onClick={() => deleteAccountHandler(row.id)}
        >
          <DeleteIcon />
        </div>
      </div>
    ),
  });

  const editCampaignsHandler = (campaignId) => {
    console.log(campaignId);
    // let url = `/#/campaigns/$campaignId`;
    // window.location.assign(`/#/campaigns/${campaignId}`);
  };

  const deleteAccountHandler = (accountId) => {
    console.log(accountId);
    deleteAccount(accountId);
    setData((data) => data.filter((account) => account.id !== accountId));
  };

  const deleteAccount = async (accountId) => {
    let response = await usersApi.deleteExistingUser({
      AssociateId: accountId,
    });
    if (response.success) {
      // notify(response.content, "success");
    } else {
      // notify("Unexpected error", "error");
    }
  };
  return (
    <Card className="mb-3">
      <CardHeader className="card-header-tab">
        <div className="card-header-title font-size-lg text-capitalize fw-normal table-title">
          {tableTitle}
        </div>
      </CardHeader>
      <div className="mb-4">
        <DataTable
          data={data}
          columns={columns}
          progressPending={loading}
          progressComponent={
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={"82.32vw"} height={47} />
              <Skeleton variant="rounded" width={"82.32vw"} height={47} />
              <Skeleton variant="rectangular" width={"82.32vw"} height={47} />
              <Skeleton variant="rounded" width={"82.32vw"} height={47} />
              <Skeleton variant="rectangular" width={"82.32vw"} height={47} />
              <Skeleton variant="rounded" width={"82.32vw"} height={47} />
              <Skeleton variant="rectangular" width={"82.32vw"} height={47} />
              <Skeleton variant="rounded" width={"82.32vw"} height={47} />
            </Stack>
          }
        />
      </div>
    </Card>
  );
};

export default ListUsers;