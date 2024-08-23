import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ListContests = ({
  contests,
  toggle,
  modal,
  loading,
  getUpcomingContestsHandler,
  getOldContestsHandler,
  tableTitle
}) => {
  console.log(contests);
  const columns = [
    {
      name: "ID #",
      selector: (row) => `# ${row.id}`,
      sortable: true,
    },

    {
      name: "Contest Name",
      id: "lastName",
      selector: (row) => row.contestName,
      sortable: true,
    },

    {
      name: "Question",
      id: "lastName",
      selector: (row) => row.contestQuestion,
      sortable: true,
    },

    {
      name: "Based on Future Result",
      id: "lastName",
      selector: (row) => (row.bContestBasedOnFutureResult ? "YES" : "NO"),
      sortable: true,
    },

    {
      name: "Start Date",
      selector: (row) => row.contestStartDateTime,
      sortable: true,
    },

    {
      name: "End Date",
      selector: (row) => row.contestEndDateTime,
      sortable: true,
    },

    {
      name: "Contest Answer",
      selector: (row) => row.contestAnswer,
      sortable: true,
    },

    {
      name: "Points Required",
      selector: (row) =>
        Math.max(
          ...row.contestPossibleAnswers?.map((contest) => contest.rewardPoints)
        ),
      sortable: true,
    },

    {
      name: "Possible Answers",
      selector: (row) =>
        row.contestPossibleAnswers?.map((contest, key) => {
          if (key == row.contestPossibleAnswers.length - 1)
            return `${contest.name}`;
          return `${contest.name}, `;
        }),
      sortable: true,
    },

    // {
    //   name: "Reward Points",
    //   selector: (row) => row.contestPossibleAnswers,
    //   sortable: true,
    // },

    // {
    //   name: "Actions",
    //   selector: (row) => (
    //     // <Button onClick={() => console.log(row.eventName)}>EDIT</Button>
    //     <EditReward
    //       key={row.orderNumber}
    //       toggle={toggle}
    //       modal={modal}
    //       rewardId={row.rewardId}
    //     />
    //   ),
    //   sortable: true,
    // },
  ];
  return (
    <Fragment>
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
              onClick={getUpcomingContestsHandler}
              className="activeButton me-3"
            >
              Upcoming
            </button>
            <button
              id="oldCampaigns"
              onClick={getOldContestsHandler}
              className="nonActiveButton"
            >
              History
            </button>
          </div>
        </div>
        <div className="mb-4">
          <DataTable
            data={contests}
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
    </Fragment>
  );
};

export default ListContests;
