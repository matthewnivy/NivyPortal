import React, { useEffect, useState } from "react";
import { Row, Container } from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import PageTitle from "../components/common/page-title/PageTitle";
import "../base.css";

const localizer = momentLocalizer(moment);

const Reservations = () => {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(false);
  }, []);

  return (
    <Container fluid>
      <PageTitle
        heading="View Reservations"
        subheading="This page shows reservations made by customers"
        icon="pe-7s-graph icon-gradient bg-ripe-malin"
      />
      <Row>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Row>
    </Container>
  );
};

export default Reservations;
