import React, { useContext } from "react";
import moment from "moment";
import marker from "../../assets/marker.svg";
import { Link, useNavigate } from "react-router-dom";
import avatar1 from "../../assets/1.jpg";
import styles from "./style.module.css";
import AuthContext from "../../context/auth-context";

const TitleComponent = ({ fieldName, data, screenName }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>{screenName} Title</div>
    <div className={styles.tableValue}>{data[fieldName]}</div>
  </div>
);
const TypeComponent = ({ fieldName, data, screenName }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>{screenName} Type</div>
    <div className={styles.tableValue}>{data[fieldName]}</div>
  </div>
);
const NameComponent = ({ fieldName, data, screenName }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>{screenName} Name</div>
    <div className={styles.tableValue}>{data[fieldName]}</div>
  </div>
);
const QuestionComponent = ({ fieldName, data, screenName }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>{screenName} Question</div>
    <div className={styles.tableValue}>{data[fieldName]}</div>
  </div>
);
const AnswerComponent = ({ fieldName, data, screenName }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>{screenName} Answer</div>
    <div className={styles.tableValue}>{data[fieldName]}</div>
  </div>
);
const FutureResultComponent = ({ fieldName, data }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>Based on Future Results</div>
    <div className={styles.tableValue}>{data[fieldName] ? "Yes" : "No"}</div>
  </div>
);
const ContentPossibleAnswerComponent = ({ fieldName, data }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>Possible Answer</div>
    <div className={styles.tableValue}>
      {data[fieldName]?.map((contest, key) => contest.name).join(", ")}
    </div>
  </div>
);

const DateComponent = ({ fieldName, data }) => (
  <div className={`${styles.tableItem} ${styles.eventBoxAlignment}`}>
    <div className={styles.tableLabel}>Date </div>
    <div className={styles.tableValue}>
      {moment.utc(data[fieldName]).local().format("DD/MM/YYYY - h:mm A")}
    </div>
  </div>
);
const StartDateComponent = ({ fieldName, data }) => (
  <div className={`${styles.tableItem} ${styles.eventBoxAlignment}`}>
    <div className={styles.tableLabel}>Start Date </div>
    <div className={styles.tableValue}>
      {moment.utc(data[fieldName]).local().format("DD/MM/YYYY - h:mm A")}
    </div>
  </div>
);
const EndDateComponent = ({ fieldName, data }) => (
  <div className={`${styles.tableItem} ${styles.eventBoxAlignment}`}>
    <div className={styles.tableLabel}>End Date</div>
    <div className={styles.tableValue}>
      {moment.utc(data[fieldName]).local().format("DD/MM/YYYY - h:mm A")}
    </div>
  </div>
);

const StatusComponent = ({ fieldName, data }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>Status</div>
    <div className={styles.tableValue}>
      {data[fieldName] === "pending" || data[fieldName] === "notSent" ? (
        <div style={{ color: "#FF8A00" }}>Pending</div>
      ) : data[fieldName] === "sent" ? (
        <div style={{ color: "#399700" }}>Sent</div>
      ) : (
        data[fieldName]
      )}
    </div>
  </div>
);
const IdComponent = ({ fieldName, data }) => (
  <div className={styles.tableItem}>
    <div className={styles.tableLabel}>ID</div>
    <div className={styles.tableValue}>{data[fieldName]}</div>
  </div>
);

const ImageComponent = ({ img, data, route, imgTitle }) => {
  const { firstName, lastName } = imgTitle;

  return (
    <div className={styles.innerHeader}>
      <div className={styles.rewardName}>
        <div className={styles.rewardImageDiv}>
          <img
            height={29}
            width={33}
            className=""
            src={data[img] ?? avatar1}
            alt="Avatar"
          />
        </div>
        <div
          style={{
            marginLeft: 10,
            justifyContent: "center",
            fontWeight: 900,
            alignSelf: "center",
          }}
        >
          {lastName === undefined
            ? data[imgTitle]
            : `${data.firstName} ${data.lastName}`}
        </div>
      </div>
      <div className={styles.editButton}>
        <Link
          to={data[route]}
          state={{ events: data }}
          className={styles.editEventRoute}
        >
          {" "}
          <img src={marker} className={styles.marker} />
        </Link>
      </div>
    </div>
  );
};

const GameProgramImageComponent = ({
  img,
  data,
  route,
  imgTitle,
  editGameProgram,
}) => {
  const { firstName, lastName } = imgTitle;

  return (
    <div className={styles.innerHeader}>
      <div className={styles.rewardName}>
        <div className={styles.rewardImageDiv}>
          <img
            height={29}
            width={33}
            className=""
            src={data[img] ?? avatar1}
            alt="Avatar"
          />
        </div>
        <div
          style={{
            marginLeft: 10,
            justifyContent: "center",
            fontWeight: 900,
            alignSelf: "center",
          }}
        >
          {lastName === undefined
            ? data[imgTitle]
            : `${data.firstName} ${data.lastName}`}
        </div>
      </div>
      <div className={styles.editButton}>
        <img
          src={marker}
          className={styles.markerGameProgram}
          onClick={editGameProgram}
        />
      </div>
    </div>
  );
};

const HeaderComponent = ({ data, route, header }) => (
  <div className={styles.innerHeader}>
    <span>{header}</span>
    <div className={styles.editButton}>
      <Link
        to={data[route]}
        state={{ events: data }}
        className={styles.editEventRoute}
      >
        {" "}
        <img src={marker} className={styles.marker} />
      </Link>
    </div>
  </div>
);

const AmountComponent = ({ fieldName, data, screenName }) => {
  return (
    <div className={styles.tableItem}>
      <div className={styles.tableLabel}>{screenName} Amount</div>
      <div className={styles.tableValue}>{selector(data)}</div>
    </div>
  );
};
const selector = (row) => {
  const rewardCouponAmmountUnit = row.rewardCouponAmmountUnit || "N/A";
  const rewardCouponAmmount = row.rewardCouponAmmount || "";
  return rewardCouponAmmount !== ""
    ? `${rewardCouponAmmountUnit} ${rewardCouponAmmount}`
    : "N/A";
};
const PointsComponent = ({ fieldName, data }) => {
  return (
    <div className={styles.tableItem}>
      <div className={styles.tableLabel}>Points required</div>
      <div className={styles.tableValue}>{data[fieldName]}</div>
    </div>
  );
};

const ContestPointsComponent = ({ fieldName, data }) => {
  return (
    <div className={styles.tableItem}>
      <div className={styles.tableLabel}>Points Required</div>
      <div className={styles.tableValue}>
        {data[fieldName]?.length > 0
          ? Math.max(...data[fieldName].map((contest) => contest.rewardPoints))
          : "No data available"}
      </div>
    </div>
  );
};

const VendorsComponent = ({ fieldName, data }) => {
  return (
    <div className={styles.tableItem}>
      <div className={styles.tableLabel}>Vendors Applicable</div>
      <div className={styles.tableValue}>{data[fieldName]}</div>
    </div>
  );
};

const VenuesComponent = ({ fieldName, data }) => {
  return (
    <div className={styles.tableItem}>
      <div className={styles.tableLabel}>Managed Venues</div>
      <div className={styles.tableValue}>{data[fieldName]}</div>
    </div>
  );
};

const UsersVendorsComponent = ({ fieldName, data }) => {
  return (
    <div className={styles.tableItem}>
      <div className={styles.tableLabel}>Managed Vendors</div>
      <div className={styles.tableValue}>{data[fieldName]}</div>
    </div>
  );
};
const CustomTableComponent = ({
  title,
  type,
  date,
  data,
  startdate,
  enddate,
  status,
  id,
  headerImage,
  amount,
  header,
  editButtonRoute,
  points,
  vendors,
  venues,
  usersvendors,
  imageTitle,
  firstname,
  lastname,
  tableTitle,
  screenName,
  name,
  question,
  answer,
  contestpoints,
  futureresult,
  possibleanswer,
  gameprogrameditbuttonroute,
  gameProgramimage,
}) => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

  const editGameProgram = (gameProgram) => {
    navigation("/manageGames/new");
    authCtx.setSelectedGameProgram(gameProgram);
  };
  return (
    <div className={styles.container}>
      {tableTitle && <div className={styles.upcomingHeading}>{tableTitle}</div>}
      {data.map((row, index) => (
        <div className={styles.innerContainer} key={index}>
          {header && (
            <HeaderComponent
              route={editButtonRoute}
              data={row}
              header={header}
            />
          )}
          {headerImage && (
            <ImageComponent
              img={headerImage}
              route={editButtonRoute}
              data={row}
              imgTitle={imageTitle}
              firstname={firstname}
              lastname={lastname}
            />
          )}
          {gameprogrameditbuttonroute && (
            <GameProgramImageComponent
              img={gameProgramimage}
              editGameProgram={() => {
                editGameProgram(row);
              }}
              data={row}
              imgTitle={gameprogrameditbuttonroute}
              firstname={firstname}
              lastname={lastname}
            />
          )}
          {title && (
            <TitleComponent
              fieldName={title}
              data={row}
              screenName={screenName}
            />
          )}
          {id && <IdComponent fieldName={id} data={row} />}
          {name && (
            <NameComponent
              fieldName={name}
              data={row}
              screenName={screenName}
            />
          )}
          {question && (
            <QuestionComponent
              fieldName={question}
              data={row}
              screenName={screenName}
            />
          )}
          {type && (
            <TypeComponent
              fieldName={type}
              data={row}
              screenName={screenName}
            />
          )}
          {date && <DateComponent fieldName={date} data={row} />}
          {startdate && <StartDateComponent fieldName={startdate} data={row} />}
          {enddate && <EndDateComponent fieldName={enddate} data={row} />}
          {answer && (
            <AnswerComponent
              fieldName={question}
              data={row}
              screenName={screenName}
            />
          )}
          {points && (
            <PointsComponent
              fieldName={points}
              data={row}
              screenName={screenName}
            />
          )}
          {futureresult && (
            <FutureResultComponent
              fieldName={possibleanswer}
              data={row}
              screenName={screenName}
            />
          )}
          {status && <StatusComponent fieldName={status} data={row} />}
          {amount && (
            <AmountComponent
              fieldName="amount"
              data={row}
              screenName={screenName}
            />
          )}

          {possibleanswer && (
            <ContentPossibleAnswerComponent
              fieldName={possibleanswer}
              data={row}
            />
          )}
          {contestpoints && (
            <ContestPointsComponent fieldName={contestpoints} data={row} />
          )}
          {vendors && <VendorsComponent fieldName={vendors} data={row} />}
          {venues && <VenuesComponent fieldName={venues} data={row} />}
          {usersvendors && (
            <UsersVendorsComponent fieldName={usersvendors} data={row} />
          )}
        </div>
      ))}
    </div>
  );
};
export default CustomTableComponent;