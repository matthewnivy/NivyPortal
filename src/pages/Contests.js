import React, { Fragment, useState, useEffect, useContext } from "react";
import PageTitle from "../components/common/page-title/PageTitle";
import { Button, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { ContestsApi } from "../utils/api";
import ListContests from "../components/contests/ListContests";
import AuthContext from "../context/auth-context";
import CustomTableComponent from "../components/events/CustomTableComponent";

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [tableTitle, setTableTitle] = useState("Upcoming Contests");
  const authCtx = useContext(AuthContext);
  const contestsApi = new ContestsApi();

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getUpcomingContestsHandler();
    setPending(false);
  }, []);

  const getUpcomingContestsHandler = async () => {
    setPending(true);
    setTableTitle("Upcoming Contests");
    var upcomingNode = document.getElementById("newCampaigns");
    var pastNode = document.getElementById("oldCampaigns");
    upcomingNode.classList.add("activeButton");
    upcomingNode.classList.remove("nonActiveButton");
    pastNode.classList.remove("activeButton");
    pastNode.classList.add("nonActiveButton");
    let response = await contestsApi.upcomingContestListByVenueId({
      venueId: authCtx.selectedVenueId,
    });
    if (response.success) {
      setContests(response.content);
    }
    setPending(false);
  };

  const getOldContestsHandler = async () => {
    setPending(true);
    setTableTitle("Past Campaigns");
    var pastNode = document.getElementById("oldCampaigns");
    var upcomingNode = document.getElementById("newCampaigns");
    pastNode.classList.add("activeButton");
    pastNode.classList.remove("nonActiveButton");
    upcomingNode.classList.remove("activeButton");
    upcomingNode.classList.add("nonActiveButton");
    let response = await contestsApi.pastContestListByVenueId({
      venudId: authCtx.selectedVenueId,
    });
    if (response.success) {
      setContests(response.content);
    }
    setPending(false);
  };

  const getLatestContestsHandler = async () => {
    setPending(true);
    setTableTitle("Upcoming Contests");
    var upcomingNode = document.getElementById("newContests");
    var pastNode = document.getElementById("oldContests");
    upcomingNode.classList.add("activeButton");
    upcomingNode.classList.remove("nonActiveButton");
    pastNode.classList.remove("activeButton");
    pastNode.classList.add("nonActiveButton");
    let response = await contestsApi.upcomingContestListByVenueId({
      venueId: authCtx.selectedVenueId,
    });
    if (response.success) {
      setContests(response.content);
    }
    setPending(false);
  };

  const getPreviousContestsHandler = async () => {
    setPending(true);
    setTableTitle("Past Contests");
    var pastNode = document.getElementById("oldContests");
    var upcomingNode = document.getElementById("newContests");
    pastNode.classList.add("activeButton");
    pastNode.classList.remove("nonActiveButton");
    upcomingNode.classList.remove("activeButton");
    upcomingNode.classList.add("nonActiveButton");
    let response = await contestsApi.pastContestListByVenueId({
      venudId: authCtx.selectedVenueId,
    });
    if (response.success) {
      setContests(response.content);
    }
    setPending(false);
  };

  return (
    <Fragment>
      <PageTitle
        heading="Create / Manage Contests"
        subheading="This page includes creation, updation and stats of the contests."
        icon="pe-7s-graph icon-gradient bg-ripe-malin"
      />
      <>
        <Link
          to={{
            pathname: "/contests/new",
          }}
        >
          <Button className="mb-2 createButton"> Create New Contests</Button>
        </Link>
        <div className="buttons-container-contests">
          <button
            id="newContests"
            onClick={getLatestContestsHandler}
            className="active-button me-3"
          >
            Upcoming
          </button>
          <button
            id="oldContests"
            onClick={getPreviousContestsHandler}
            className="nonactive-button"
          >
            History
          </button>
        </div>
        <ListContests
          contests={contests}
          toggle={toggle}
          modal={modal}
          loading={pending}
          getUpcomingContestsHandler={getUpcomingContestsHandler}
          getOldContestsHandler={getOldContestsHandler}
          tableTitle={tableTitle}
        />
        <CustomTableComponent
          data={contests}
          id="id"
          name="contestName"
          screenName="Contest"
          question="contestQuestion"
          startdate="contestStartDateTime"
          enddate="contestEndDateTime"
          answer="contestAnswer"
          contestpoints="contestPossibleAnswers"
          futureresult="bContestBasedOnFutureResult"
          tableTitle={tableTitle}
          editButtonRoute="id"
          header="Contests"
          possibleanswer="contestPossibleAnswers"
        ></CustomTableComponent>
      </>
    </Fragment>
  );
};

export default Contests;