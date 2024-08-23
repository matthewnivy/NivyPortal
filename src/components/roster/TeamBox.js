// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClock, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import teams from "../../assets/teams.svg";
import teamMateOne from "../../assets/team-mate-one.png";
import teamMateTwo from "../../assets/team-mate-two.png";
import { useState } from "react";
import { Card, CardBody, Tooltip, Button } from "reactstrap";
import React, { Fragment } from "react";
import marker from "../../assets/marker.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import styles from "./TeamBox.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomTableComponent from "../events/CustomTableComponent";

const renderTeamDetails = ({ rosterEntries }) => {
  return (
    <>
      <div className="horizontal-line mx-4"></div>
      {rosterEntries?.map((rosterEntry) => (
        <CardBody>
          <div
            className={`d-flex order-box py-2 my-2 ${styles.rosterEntryBox}`}
          >
            <div className={styles.rosterEntryBoxTwo}>
              <img
                src={rosterEntry?.image ? rosterEntry?.image : teamMateOne}
                width={114}
                height={114}
              />
            </div>
            <div className="d-flex flex-column justify-content-between py-1">
              <div className={styles.rosterEntryBoxThree}>
                {rosterEntry?.name}
              </div>
              <div className={styles.rosterEntryBoxFour}>
                Player Number : {rosterEntry?.number}
              </div>
              <div className={styles.rosterEntryBoxFive}>
                Player Position : {rosterEntry?.position}
              </div>
            </div>
            <div className={styles.manageTeam}>
              <div
                className={`${styles.customizedButtons} ${styles.padding} ${styles.rosterButtonOne}`}
                id="edit-vendor"
                //   onClick={() => editCategoryHandler(category)}
              >
                <img src={deleteIcon} />
                <pre>{"  "}</pre>
                Delete
              </div>

              <div
                className={`${styles.customizedButtons} ${styles.padding} ${styles.rosterButtonTwo}`}
                id="edit-vendor"
                // onClick={() => editCategoryHandler(category)}
              >
                <img src={marker} />
                <pre>{"  "}</pre>
                Edit
              </div>
            </div>
          </div>
        </CardBody>
      ))}
    </>
  );
};
const TeamBox = ({ setIsOpen, roster }) => {
  let [showTeamDetails, setShowOrderDetails] = useState(false);

  const showDetailHandler = () => {
    console.log("show");
    setShowOrderDetails(true);
  };

  const hideDetailHandler = () => {
    setShowOrderDetails(false);
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toolTipToggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Fragment>
      <div className="order-box my-4">
        <div className="Title">
          <div
            className="order-box-contents"
            style={{ justifyContent: "space-between", padding: 37 }}
          >
            {!showTeamDetails && (
              <>
                <AddIcon
                  onClick={showDetailHandler}
                  sx={{ fontSize: 60 }}
                  id="showTeamDetails"
                />
                {document.getElementById("showTeamDetails") && (
                  <Tooltip
                    isOpen={tooltipOpen}
                    target="showTeamDetails"
                    toggle={toolTipToggle}
                  >
                    Show Roster Details
                  </Tooltip>
                )}
              </>
            )}
            {showTeamDetails && (
              <>
                <RemoveIcon
                  onClick={hideDetailHandler}
                  sx={{ fontSize: 60 }}
                  id="hideOrderDetails"
                />
                {document.getElementById("hideOrderDetails") && (
                  <Tooltip
                    isOpen={tooltipOpen}
                    target="hideOrderDetails"
                    toggle={toolTipToggle}
                  >
                    Hide Roster Details
                  </Tooltip>
                )}
              </>
            )}

            <span className={`${styles.teamName} ${styles.mlSix}`}>
              {roster?.teamName}
            </span>
            <div
              className={`${styles.teamCount} ${styles.mlSix} ${styles.customizedCardTitle} `}
            >
              <img src={teams} className={`me-2 ${styles.teamIcon}`} />
              <span
                style={{
                  fontSize: 35,
                }}
              >
                {roster?.rosterEntries?.length}
              </span>
            </div>
            <div
              className={`${styles.customizedCardTitle} ${styles.addRoster} ${styles.mlSix}`}
              onClick={() => setIsOpen(true)}
            >
              + Add Roaster Entry
            </div>
          </div>
        </div>

        {showTeamDetails && renderTeamDetails(roster)}
      </div>
    </Fragment>
  );
};
export default TeamBox;
