import React from "react";
import cx from "classnames";
import BackArrow from "../../../assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import "./style.css";

const AddUpdateTitle = ({ heading, subheading, icon, backUrl }) => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <div className="app-page-title app-page-title_responsive">
      <div className="page-title-wrapper">
        <div className="page-title-heading">
          <div
            className={cx("page-title-icon")}
            onClick={navigateBack}
            style={{ background: "rgba(22, 34, 127, 0.05)" }}
          >
            <img src={BackArrow} className="ms-1" alt="back arrow" />
          </div>
          <div className="heading">
            {heading}
            <div className={cx("page-title-subheading d-none")}>
              {subheading}
            </div>
          </div>
        </div>
        {/* <div className="page-title-actions"><TitleComponent2/></div> */}
      </div>
    </div>
  );
};

export default AddUpdateTitle;
