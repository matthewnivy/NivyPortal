import React, { Fragment, useContext, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, Col, Container, Row } from "reactstrap";
import PageTitle from "../components/common/page-title/PageTitle";
import { EventsApi } from "../utils/api";
import ListEvents from "../components/events/ListEvents";
import EventsCheckedInUsers from "../components/events/EventsCheckedInUsers";
import AuthContext from "../context/auth-context";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CustomTableComponent from "../components/events/CustomTableComponent";

const Events = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const eventsApi = new EventsApi();
  const authCtx = useContext(AuthContext);

  const getEventsList = async (venueId) => {
    let response = await eventsApi.fetchEventsListByVenueId({
      venueId: venueId,
      OrgId: "NivyWebApp",
    });
    if (response.success) {
      setData(response.content);
      console.log("SSSSSSSSSSSSSS", response);
    }
    setPending(false);
  };

  useEffect(() => {
    setPending(true);
    getEventsList(authCtx.selectedVenueId);
  }, [authCtx.selectedVenueId]);

  return (
    <div className="app-bar-responsive">
      <TransitionGroup>
        <CSSTransition
          component="div"
          classNames="TabsAnimation"
          appear={true}
          timeout={1500}
          enter={false}
          exit={false}
        >
          <div>
            <PageTitle
              heading="Create / Manage Events"
              subheading="This page includes creation, updation and stats of the events."
              icon="pe-7s-graph icon-gradient bg-ripe-malin"
            />
            <Row>
              <Col>
                <Link
                  to={{
                    pathname: "/events/new",
                  }}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button className="mb-2 createButton">
                    {" "}
                    Create New Event
                  </Button>
                </Link>
              </Col>
            </Row>
            <ListEvents eventsList={data} loading={pending} />
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
                  data={data}
                  title={(row) => `${row.firstName} ${row.lastName}`}
                  type="eventType"
                  date="startDateTime"
                  editButtonRoute="id"
                  header="YoutubeFanfest 23"
                  screenName="Event"
                ></CustomTableComponent>
              )}
            </div>
            {/* Render your custom table */}
            <EventsCheckedInUsers eventsList={data} />
            {/* <AddEventForm /> */}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Events;