import EastIcon from "@mui/icons-material/East";
import React from "react";
import { Card, CardBody } from "reactstrap";
import notepad from "../../../assets/order.svg";
import "./VendorBox.css";
import { Link } from "react-router-dom";

const VendorBox = ({ name, isOpen, openOrders, id }) => {
  return (
    <Card className="mb-3 customized-card">
      <CardBody>
        <div className="box">
          <div className="customized-card-title-l1">{name}</div>
          <div className="customized-card-title-l2">
            <img src={notepad} />
            <pre> </pre>
            {openOrders} Orders available
          </div>
          <div
            className="customized-card-title-l3"
            id={isOpen ? `open-order` : `closed-order`}
          >
            {isOpen ? "Open" : "Closed"}
          </div>
          <Link to={`${id}/manage-orders`} state={{ vendorName: name }}>
            <EastIcon
              fontSize="large"
              color="black"
              style={{
                cursor: "pointer",
              }}
            />
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default VendorBox;
