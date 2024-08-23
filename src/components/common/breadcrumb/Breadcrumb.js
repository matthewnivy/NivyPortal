import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import giftIcon from "../../../assets/gift.svg";
import "./Breadcrumb.css";

const Breadcrumb = ({ component, link }) => {
  // console.log(component, link, "hey", window.location.pathname.split("/"));
  return (
    <Card
      className="breadcrumb-card"
      style={{
        borderRadius: 20,
      }}
    >
      <div className="py-2 d-flex align-items-center">
        <div
          className="ms-4 d-flex align-items-center justify-content-center rounded"
          style={{
            width: 60,
            height: 50,
            background: "#F3F3F4",
          }}
        >
          <img src={giftIcon} className="d-inline" alt="gift icon" />
        </div>
        <div
          className="ps-4"
          style={{
            display: "inline-block",
            minWidth: "30px",
            color: "#8C8C8C",
          }}
        >
          {window.location.pathname.split("/").map((breadcumb, index, row) => (
            <RenderBreadCrumb breadcumb={breadcumb} index={index} row={row} />
          ))}
        </div>
        {component && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "-webkit-fill-available",
              position: "relative",
              right: "2vw",
              cursor: "pointer",
            }}
          >
            <Link
              to={{ pathname: link }}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                className="customized-buttons"
                id="edit-vendor"
                style={{ backgroundColor: "#399700" }}
              >
                {component}
              </div>
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

const capitalizeFirstLetter = (str) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, " ");
};

const RenderBreadCrumb = ({ breadcumb, index, row }) => {
  // console.log(row, "hey", index, breadcumb.length);
  return index == 0 ? (
    ""
  ) : index + 1 == row.length ? (
    <span
      className="breadcrumb-text-active"
      style={{
        display: "inline-block",
        fontWeight: 700,
        color: "#0C1364",
      }}
    >
      {row.length == 3 ? (
        <>
          &nbsp;
          {`Vendor ${capitalizeFirstLetter(breadcumb)}`}{" "}
          <pre className="d-inline"> </pre>
        </>
      ) : (
        <>
          &nbsp;
          {`${capitalizeFirstLetter(breadcumb)}`}{" "}
          <pre className="d-inline"> </pre>
        </>
      )}
    </span>
  ) : index == 2 ? (
    <span
      className="breadcrumb-text"
      style={{
        display: "inline-block",
        fontWeight: 700,
        color: "#8C8C8C",
      }}
    >
      <pre className="d-inline"> </pre>
      {`Vendor ${capitalizeFirstLetter(breadcumb)}`} /
    </span>
  ) : (
    <span
      className="breadcrumb-text"
      style={{
        display: "inline-block",
        fontWeight: 700,
        color: "#8C8C8C",
      }}
    >
      <pre className="d-inline"> </pre>
      {`${capitalizeFirstLetter(breadcumb)}`} /
    </span>
  );
};

export default Breadcrumb;