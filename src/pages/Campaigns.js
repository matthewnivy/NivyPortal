import React, { Fragment, useContext, useEffect, useState } from "react";
import { Row, Container, Button, Col } from "reactstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ListCampaigns from "../components/common/campaigns/ListCampaigns/ListCampaigns";
import PageTitle from "../components/common/page-title/PageTitle";
import { CampaignsApi } from "../utils/api";
import AuthContext from "../context/auth-context";
import Modal from "../components/common/custom-modal/Modal";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "../index.css";
import CustomTableComponent from "../components/events/CustomTableComponent";

const Campaigns = () => {
  const [data, setData] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [pending, setPending] = useState(true);
  const [tableTitle, setTableTitle] = useState("Upcoming Campaigns");
  const [modalScreen, setModalScreen] = useState("manipulateCampaignType");
  const [modal, setModal] = useState(false);
  const campaignsApi = new CampaignsApi();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setPending(true);
    getUpcomingCampaignsList();
    setPending(false);
    // document.getElementsByClassName('eQQdoY')?.style?.zIndex = 0;
  }, [authCtx.selectedVenueId]);

  const getUpcomingCampaignsList = async () => {
    setPending(true);
    setTableTitle("Upcoming Campaigns");
    var upcomingNode = document.getElementById("newCampaigns");
    var pastNode = document.getElementById("oldCampaigns");
    upcomingNode.classList.add("activeButton");
    upcomingNode.classList.remove("nonActiveButton");
    pastNode.classList.remove("activeButton");
    pastNode.classList.add("nonActiveButton");
    let response = await campaignsApi.fetchUpcomingCampaignListByVenueId({
      venueId: authCtx.selectedVenueId,
      OrgId: "NivyWebApp",
    });
    if (response.success) {
      setCampaigns(response.content.filter((c) => c.campaignType != null));
    }
    setPending(false);
  };

  const getPastCampaignsList = async () => {
    setPending(true);
    setTableTitle("Past Campaigns");
    var pastNode = document.getElementById("oldCampaigns");
    var upcomingNode = document.getElementById("newCampaigns");
    pastNode.classList.add("activeButton");
    pastNode.classList.remove("nonActiveButton");
    upcomingNode.classList.remove("activeButton");
    upcomingNode.classList.add("nonActiveButton");

    let response = await campaignsApi.fetchPastCampaignListByVenueId({
      venueId: authCtx.selectedVenueId,
      OrgId: "NivyWebApp",
    });
    if (response.success) {
      setCampaigns(response.content.filter((c) => c.campaignType != null));
    }
    setPending(false);
  };

  // const manipulateCampaignType = () => {
  //   setModal(true);
  // };

  return (
    <Fragment>
      <div>
        <div className="Title">
          <PageTitle
            heading="Create / Manage Campaigns"
            subheading="This page includes creation, updation and stats of the campaigns."
            icon="pe-7s-graph icon-gradient bg-ripe-malin"
          />
        </div>
        <div className="buttons-container">
          <button
            id="newCampaigns"
            onClick={getUpcomingCampaignsList}
            className="active-button me-3"
          >
            Upcoming
          </button>
          <button
            id="oldCampaigns"
            onClick={getPastCampaignsList}
            className="nonactive-button"
          >
            History
          </button>
        </div>
        <>
          <Col>
            <Link
              to="/campaigns/new"
              state={{ campaignType: "App Notification" }}
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                className="mb-2 createButton"
                // onClick={manipulateCampaignType}
              >
                {" "}
                Create New Campaign
              </Button>
            </Link>
          </Col>
          <ListCampaigns
            data={campaigns}
            setData={setCampaigns}
            getOldCampaignsHandler={getPastCampaignsList}
            getUpcomingCampaignsHandler={getUpcomingCampaignsList}
            loading={pending}
            tableTitle={tableTitle}
          />

          <div className="toggleDisplay">
            {pending ? (
              <Stack spacing={1}>
                <Skeleton variant="rectangular" width={"89vw"} height={35} />
                <Skeleton variant="rounded" width={"89vw"} height={35} />
                <Skeleton variant="rectangular" width={"89vw"} height={35} />
                <Skeleton variant="rounded" width={"89vw"} height={35} />
                <Skeleton variant="rectangular" width={"89vw"} height={35} />
                <Skeleton variant="rounded" width={"89vw"} height={35} />
                <Skeleton variant="rectangular" width={"89vw"} height={35} />
                <Skeleton variant="rounded" width={"89vw"} height={35} />
                <Skeleton variant="rectangular" width={"89vw"} height={35} />
                <Skeleton variant="rounded" width={"89vw"} height={35} />
                <Skeleton variant="rectangular" width={"89vw"} height={35} />
                <Skeleton variant="rounded" width={"89vw"} height={35} />
                <Skeleton variant="rectangular" width={"89vw"} height={35} />
                <Skeleton variant="rounded" width={"89vw"} height={35} />
                <Skeleton variant="rectangular" width={"89vw"} height={35} />
                <Skeleton variant="rounded" width={"89vw"} height={35} />
              </Stack>
            ) : (
              <CustomTableComponent
                data={campaigns}
                title="title"
                type="compaignName"
                date="startDateTime"
                status="campaignStatus"
                tableTitle={tableTitle}
                header="YoutubeFanfest 23"
                editButtonRoute="id"
                screenName="Campaign"
              ></CustomTableComponent>
            )}
          </div>
        </>
      </div>

      {modal && (
        <Modal
          openModal={setModal}
          changeModalScreen={setModalScreen}
          modalScreen={modalScreen}
        />
      )}
    </Fragment>
  );
};

export default Campaigns;