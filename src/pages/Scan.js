import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, Card, Container } from "reactstrap";
import PageTitle from "../components/common/page-title/PageTitle";
import { QrReader } from "react-qr-reader";
import { isAndroid, isIOS } from "react-device-detect";
const Scan = () => {
  const [data, setData] = React.useState("Not Found");

  console.log(isAndroid, isIOS);
  const navigateToAppStore = () => {
    console.log(isAndroid, isIOS);
    if (data == "https://roarlions.com/") {
      if (isAndroid) {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.nivyapp.roarlions";
      } else if (isIOS) {
        window.location.href =
          "https://apps.apple.com/pk/app/roar-lions/id1659498292";
      }
    } else {
      window.location.href = data;
    }
    if (data == "Not Found") {
      window.location.href = "https://roarlions.com/";
    }
  };
  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition
          component="div"
          classNames="TabsAnimation"
          appear={true}
          timeout={1500}
          enter={false}
          exit={false}
        >
          <Container fluid>
            <PageTitle
              heading="Scan QR Code"
              subheading="This page includes creation, updation and stats of the events."
              icon="pe-7s-graph icon-gradient bg-ripe-malin"
            />
            <Card>
              <div className="mx-auto">
                <div className="card-header-title font-size-lg text-capitalize fw-bold mt-4 text-center">
                  SCAN QR CODE:
                </div>
                <div style={{ width: "500px", height: "500px" }}>
                  <QrReader
                    onResult={(result, error) => {
                      if (!!result) {
                        setData(result?.text);
                      }

                      if (!!error) {
                        console.info(error);
                      }
                    }}
                  />
                </div>
                <p className="card-header-title font-size-lg text-capitalize fw-bold mt-4 text-center">
                  QR SCANNER RESULT:
                  <br></br>
                  <br></br>
                  <span className="card-header-title font-size-lg text-capitalize fw-normal">
                    {data}
                  </span>
                </p>
              </div>
              {/* <button ></button> */}
              <Button
                onClick={navigateToAppStore}
                className="mb-2 mx-auto createButton"
              >
                {" "}
                Click here
              </Button>
            </Card>
          </Container>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

export default Scan;
