import React from "react";
import BackArrow from "../../../assets/back arrow 2.svg";
import { useNavigate } from "react-router-dom";
import "./style.css";

const NewAddUpdateTitle = ({ heading, subheading, icon, backUrl }) => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <div className="app-page-title-responsive-designs">
      <div>
        <img
          src={BackArrow}
          className="ms-1"
          alt="back arrow"
          onClick={navigateBack}
        />
      </div>
      <div className="heading_new">{heading}</div>
      <div></div>
    </div>
  );
};

export default NewAddUpdateTitle;
