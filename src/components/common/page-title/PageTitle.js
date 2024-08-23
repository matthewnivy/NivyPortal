import React from "react";
import cx from "classnames";
import iconGrayScale from "../../../assets/icon.svg";
import "./style.css";
import { Container } from "reactstrap";
const PageTitle = (props) => {
  let {
    enablePageTitleIcon,
    enablePageTitleSubheading,

    heading,
    icon,
    subheading,
  } = props;

  return (
    <div>
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="iconBox">
              <img src={iconGrayScale}></img>
            </div>
            <div className="heading">
              {heading}
              <div className={cx("page-title-subheading", {})}>
                {subheading}
              </div>
            </div>
          </div>
          <div className="page-title-actions">{/* <TitleComponent2/> */}</div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;