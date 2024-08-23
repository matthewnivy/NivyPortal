import React from "react";
import { CardBody } from "reactstrap";
import marker from "../../../assets/marker.svg";
// import burger from "../../../../assets/components/icons/burger.png";

const ProductBox = ({
  image,
  title,
  quantity,
  addOns,
  amount,
  actionButton,
}) => {
  return (
    <CardBody>
      <div className="d-flex order-box py-4 my-2">
        <div
          style={{
            paddingRight: 5,
            display: "inline-block",
            marginRight: 17,
            borderRight: "2px solid #eae6e6",
          }}
        >
          <img src={image} />
        </div>
        <div className="d-flex flex-column justify-content-between py-1">
          <div
            style={{
              fontWeight: 600,
              fontSize: 19,
              minWidth: "max-content",
            }}
          >
            {title}
          </div>
          <div>Quantity: {quantity}</div>
          <div>Addons: {addOns}</div>
        </div>
        <div
          style={{
            position: "relative",
            right: "1vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            fontSize: 20,
            fontWeight: "bold",
            width: "-webkit-fill-available",
            justifyContent: "space-between",
          }}
        >
          <div className="cash-amount">${amount}</div>
          <div style={{ display: "flex" }}>
            <div
              className="customized-buttons"
              id="edit-vendor"
              style={{
                backgroundColor:
                  actionButton == "Mark Out Of Stock" ? "#3C3C3C" : "#399700",
              }}
            >
              {actionButton}
            </div>
            <div
              className="customized-buttons"
              id="edit-vendor"
              style={{ backgroundColor: "#16227F" }}
            >
              <img src={marker} />
              <span style={{ marginLeft: 5 }}> Edit</span>
            </div>
          </div>
        </div>
      </div>
    </CardBody>
  );
};

export default ProductBox;
