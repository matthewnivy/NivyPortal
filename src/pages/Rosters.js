import React, { Fragment, useEffect, useState } from "react";
import { Card, Container } from "reactstrap";
import TeamBox from "../components/roster/TeamBox";
import PageTitle from "../components/common/page-title/PageTitle";
import { RostersApi } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
// import Modal from "../components/common/custom-modal/CustomModal";
// import CustomModal from "../components/common/custom-modal/CustomModal";
// import ManageRoster from "../components/roster/manage-roster/ManageRoster";
// import TeamBox from "../components/roster/team-box/TeamBox";
// import OrderBox from "../components/vendors/order-box/OrderBox";
// import { useFetch } from "../hooks";
// import PageTitle from "../Layout/AppMain/PageTitle";
// import { getRostersList } from "../utils/ApiHandler";
// import { endpoints, rosterBaseURL } from "../utils/urls";
const Rosters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(true);
  const [rosters, setRosters] = useState([]);
  const [modalScreen, setModalScreen] = useState("manageRosters");
  const rostersApi = new RostersApi();
  const navigate = useNavigate();
  useEffect(() => {
    setPending(true);
    const getRostersListHandler = async (organizationId) => {
      let response = await rostersApi.fetchRostersList({
        organizationId: organizationId,
      });
      console.log(response);
      if (response.success) {
        setRosters(response.content);
      }
      setPending(false);
    };
    getRostersListHandler("UNA_LIONS");
  }, []);

  return (
    <Fragment>
      <>
        <div className="Title">
          <PageTitle
            heading="Rosters"
            subheading="This page includes create and edit teams and create/edit players."
            icon="pe-7s-graph icon-gradient bg-ripe-malin"
          />
          <span
            style={{ fontFamily: "MADE TOMMY", fontWeight: 700, fontSize: 25 }}
          >
            Teams
          </span>
        </div>
        <div>
          {pending ? (
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={"82vw"} height={47} />{" "}
              <Skeleton variant="rounded" width={"82vw"} height={47} />{" "}
              <Skeleton variant="rectangular" width={"82vw"} height={47} />{" "}
              <Skeleton variant="rounded" width={"82vw"} height={47} />{" "}
              <Skeleton variant="rectangular" width={"82vw"} height={47} />{" "}
              <Skeleton variant="rounded" width={"82vw"} height={47} />{" "}
              <Skeleton variant="rectangular" width={"82vw"} height={47} />{" "}
              <Skeleton variant="rounded" width={"82vw"} height={47} />{" "}
            </Stack>
          ) : (
            rosters
              .map((teamRosters) => teamRosters.teamRosters)
              .flatMap((roster) => roster)
              .map((roster) => (
                <TeamBox setIsOpen={setIsOpen} roster={roster} />
              ))
          )}
        </div>
        {/* <TeamBox setIsOpen={setIsOpen} />
          <TeamBox setIsOpen={setIsOpen} /> */}
        {/* {isOpen && (
          <Modal setIsOpen={setIsOpen}>
            <ManageRoster />
          </Modal>
        )} */}
        {isOpen && navigate("/manageroster")}
      </>
    </Fragment>
  );
};
export default Rosters;