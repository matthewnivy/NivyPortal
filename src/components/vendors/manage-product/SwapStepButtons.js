import { Fragment } from "react";
import { Button } from "reactstrap";

const SwapStepButtons = ({ step, stepDown, stepUp }) => {
  console.log(step, "STEP");
  return (
    <Fragment>
      <div className="d-flex mx-n3 md:flex-column">
        <div
          className="d-flex"
          style={{
            width: "-webkit-fill-available",
            cursor: "pointer",
          }}
          onClick={stepDown}
        >
          <div
            className="customized-buttons ms-0"
            id="edit-vendor"
            style={{ backgroundColor: step == 1 ? "gray" : "#399700" }}
          >
            {"Previous"}
          </div>
        </div>
        <div
          className="d-flex"
          style={{
            justifyContent: "flex-end",
            width: "-webkit-fill-available",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={stepUp}
        >
          <Button
            className="customized-buttons"
            id="edit-vendor"
            style={{ backgroundColor: "#399700" }}
            type="submit"
          >
            {step == 2 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default SwapStepButtons;
