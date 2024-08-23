import DataTable from "react-data-table-component";
import { Loader } from "react-loaders";
import moment from "moment";
import { Link } from "react-router-dom";
import marker from "../../assets/marker.svg";
import styles from "./style.module.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Pagination } from "reactstrap";
import "./style.module.css";

const columns = [
  {
    name: <div className={`${styles.tableHeader_Event}`}>Event Type</div>,
    selector: (row) => (
      <div className={styles.tableContent}>{row.eventType}</div>
    ),
    sortable: true,
  },
  {
    name: <div className={`${styles.tableHeader_Event}`}>Event Title</div>,
    selector: (row) => (
      <div className={styles.tableContent}>{row.eventName}</div>
    ),
    sortable: true,
  },
  {
    name: <div className={styles.tableHeader_Event}>Event Date and Time</div>,
    selector: (row) => (
      <>
        <div className="d-flex flex-row">
          <div className="d-flex flex-row align-items-center justify-content-between my-2 mx-auto">
            <div className={styles.tableContent}>
              {moment
                .utc(row.eventStartDateTime)
                .local()
                .format("DD/MM/YYYY - h:mm A")}
            </div>
          </div>
          <div className="">
            <Link
              to={row.id}
              state={{ events: row }}
              style={{
                textDecoration: "none",
              }}
            >
              <div className={`customizedButton`} id="edit-vendor">
                <img src={marker} className="me-1" />
                Edit
              </div>
            </Link>
          </div>
        </div>
      </>
    ),
    sortable: true,
    width: "40%",
  },
];

const ListEvents = ({ loading, eventsList }) => {
  return (
    <div className={styles.card_event}>
      <div
        className="mx-4 my-3"
        style={{
          color: "#8C8C8C",
          fontSize: 18,
        }}
      >
        Upcoming Events
      </div>
      <div className="mb-4">
        <DataTable
          data={eventsList}
          columns={columns}
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
    </div>
  );
};

export default ListEvents;