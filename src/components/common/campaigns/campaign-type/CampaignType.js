import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CampignType.module.css";
import { Row, Container, Button, Form, FormGroup, Input } from "reactstrap";
const CampaignType = ({ openModal, changeModalScreen }) => {
  const [campaignType, setCampaignType] = useState("email");

  return (
    <Fragment>
      <div className={styles.customModal}>
        <span className={styles.forgotPwText}>Select Campaign Type</span>
        <span className={styles.enterText}>
          Please choose the campaign type
        </span>

        <FormGroup className="mt-5">
          <Input
            type="select"
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value)}
            className="p-4"
          >
            <option>Email</option>
            <option>App Notification</option>
            <option>SMS</option>
          </Input>
        </FormGroup>
        <div style={{ float: "right" }}>
          <Link
            to="/campaigns/new"
            state={{ campaignType: campaignType }}
            style={{
              textDecoration: "none",
            }}
          >
            <Button className={styles.submitButton} type="submit">
              <span className={styles.submitButtonText}>SUBMIT</span>
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default CampaignType;
