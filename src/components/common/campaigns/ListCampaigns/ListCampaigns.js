// import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DataTable from "react-data-table-component";
// import Loader from "react-loaders";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import marker from "../../../../assets/marker.svg";
// import EditButton from "../../assets/utils/images/edit-button.png";
// import { notify } from "../../utils/Notification";
import moment from "moment";
import "./ListCampaigns.css";
const ListCampaigns = ({
  data,
  getUpcomingCampaignsHandler,
  getOldCampaignsHandler,
  loading,
  tableTitle,
  setData,
}) => {
  const columns = [
    {
      name: <div className={`tableHeader`}>Campaign Name</div>,
      selector: (row) => (
        <div className={"tableContent"}>{row.compaignName}</div>
      ),
      sortable: true,
    },
    {
      name: <div className={`tableHeader`}>Subject</div>,
      selector: (row) => <div className={"tableContent"}>{row.title}</div>,
      sortable: true,
    },
    {
      name: <div className={`tableHeader`}>Date and Time</div>,
      id: "lastName",
      selector: (row) => (
        <div className={"tableContent"}>
          {moment.utc(row.startDateTime).local().format("DD/MM/YYYY - h:mm A")}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className={`tableHeader`}>Status</div>,
      selector: (row) => (
        <div className="d-flex flex-row align-items-center justify-content-between my-2 mx-auto">
          <div
            style={{
              fontSize: 16,
            }}
          >
            {row.campaignStatus == "pending" ||
            row.campaignStatus == "notSent" ? (
              <div style={{ color: "#FF8A00" }}>Pending</div>
            ) : row.campaignStatus == "sent" ? (
              <div style={{ color: "#399700" }}>Sent</div>
            ) : (
              row.campaignStatus
            )}
          </div>
          {tableTitle == "Upcoming Campaigns" && (
            <div className="">
              <Link
                to={row.id}
                state={row}
                style={{
                  textDecoration: "none",
                }}
              >
                <div
                  className={`customizedButton`}
                  id="edit-vendor"
                  style={{
                    borderRadius: 8,
                    fontWeight: 400,
                    width: 80,
                  }}
                >
                  <img src={marker} className="me-1" />
                  Edit
                </div>
              </Link>
            </div>
          )}
        </div>
      ),

      sortable: true,
    },
  ];

  const editCampaignsHandler = (campaignId) => {
    console.log(campaignId);
    // let url = `/#/campaigns/$campaignId`;
    // window.location.assign(`/#/campaigns/${campaignId}`);
  };

  const deleteCampaignsHandler = (campaignId) => {
    console.log(campaignId);
    deleteCampaign(campaignId);
    setData((data) => data.filter((campaign) => campaign.id === campaignId));
    getUpcomingCampaignsHandler();
  };

  const deleteCampaign = async (campaignId) => {
    let response;
    // let response = await deleteExistingCampaign(campaignId);
    if (response.success) {
      // notify(response.content, "success");
    } else {
      // notify("Unexpected error", "error");
    }
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
        <div className="d-inline-block">
          <button
            id="newCampaigns"
            onClick={getUpcomingCampaignsHandler}
            className="activeButton me-3"
          >
            Upcoming
          </button>
          <button
            id="oldCampaigns"
            onClick={getOldCampaignsHandler}
            className="nonActiveButton"
          >
            History
          </button>
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

export default ListCampaigns;