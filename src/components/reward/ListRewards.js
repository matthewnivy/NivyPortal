import React, { Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
// import EditReward from "./EditReward";
import avatar1 from "../../assets/1.jpg";
import DataTable from "react-data-table-component";
import Loader from "react-loaders";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "./reward-phone-number/style.css";
import marker from "../../assets/marker.svg";

const ListRewards = ({ rewards, toggle, modal, loading }) => {
  console.log(rewards);
  const columns = [
    {
      name: <div className="reward_head_cells">ID</div>,
      selector: (row) => row.rewardId || "N/A",
      sortable: true,
    },
    {
      name: <div className="reward_head_cells">Reward Name</div>,
      id: "lastName",
      selector: (row) => row.rewardName || "N/A",
      sortable: true,
    },

    {
      name: <div className="reward_head_cells">Reward Type</div>,
      selector: (row) => row.rewardType || "N/A",
      sortable: true,
    },

    {
      name: <div className="reward_head_cells">Reward Image</div>,
      selector: (row) =>
        row.rewardImage ? (
          <img
            width={40}
            className="rounded-circle"
            src={row.rewardImage}
            alt="Avatar"
            onError={(e) => {
              e.target.src = avatar1;
            }}
          />
        ) : (
          "N/A"
        ),
      sortable: true,
    },

    {
      name: <div className="reward_head_cells">Reward Amount</div>,
      selector: (row) => {
        const rewardCouponAmmountUnit = row.rewardCouponAmmountUnit || "N/A";
        const rewardCouponAmmount = row.rewardCouponAmmount || "";
        return rewardCouponAmmount !== ""
          ? `${rewardCouponAmmountUnit} ${rewardCouponAmmount}`
          : "N/A";
      },
      sortable: true,
    },

    {
      name: <div className="reward_head_cells">Points required</div>,
      selector: (row) => row.rewardCost || "N/A",
      sortable: true,
    },

    {
      name: <div className="reward_head_cells">Vendors Applicable</div>,
      selector: (row) => row.rewardCouponVendors || "N/A",
      sortable: true,
    },

    {
      name: <div className="reward_head_cells">Status</div>,
      selector: (row) => <div className="reward_status_cell">Active</div>,
      sortable: true,
    },

    {
      name: <div className="reward_head_cells">Action</div>,
      cell: () => (
        <div className={`customizedButton me-1`} id="edit-vendor">
          <img src={marker} className="me-1" />
          Edit
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    // {
    //   name: "Actions",
    //   selector: (row) => (
    //     // <Button onClick={() => console.log(row.eventName)}>EDIT</Button>
    //     // <EditReward
    //     //   key={row.orderNumber}
    //     //   toggle={toggle}
    //     //   modal={modal}
    //     //   rewardId={row.rewardId}
    //     // />
    //   ),
    //   sortable: true,
    // },
  ];

  const customStyle = {
    cells: {
      style: {
        fontSize: "15px",
        color: "var(--text-color)",
        fontWeight: "lighter",
        padding: "22px",
      },
    },
  };

  return (
    <Fragment>
      <Card className="mb-3 card">
        <CardHeader className="rewardheader_bg">
          <div className="mt-4 rewardheader ">Rewards</div>
        </CardHeader>
        <div className="mb-4">
          <DataTable
            data={rewards}
            columns={columns}
            customStyles={customStyle}
            progressPending={loading}
            progressComponent={
              <Stack spacing={1}>
                <Skeleton variant="rectangular" width={"81.5vw"} height={47} />
                <Skeleton variant="rounded" width={"81.5vw"} height={47} />
                <Skeleton variant="rectangular" width={"81.5vw"} height={47} />
                <Skeleton variant="rounded" width={"81.5vw"} height={47} />
                <Skeleton variant="rectangular" width={"81.5vw"} height={47} />
                <Skeleton variant="rounded" width={"81.5vw"} height={47} />
                <Skeleton variant="rectangular" width={"81.5vw"} height={47} />
                <Skeleton variant="rounded" width={"81.5vw"} height={47} />
              </Stack>
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default ListRewards;