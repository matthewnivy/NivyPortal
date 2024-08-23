import React, { Fragment, useContext } from "react";
import styles from "./ImageFromUrl.module.css";
import { Button } from "reactstrap";
import { CustomTextInput } from "../../form/CustomTextInput";
import infoIcon from "../../../assets/info-icon.svg";
import AuthContext from "../../../context/auth-context";
import { useParams } from "react-router-dom";

const OptionGroupStepOne = ({ openModal, changeModalScreen, values }) => {
  const { addItemOptions, setAddItemOptions } = useContext(AuthContext);
  const { vendorId } = useParams();
  const moveToStepTwo = () => {
    const options = addItemOptions;
    // options[itemOptions]
    // console.log(values?.optionGroupName);
    options["vendorId"] = vendorId;
    options["itemOptions"][0]["optionName"] = values?.optionName;
    changeModalScreen("optionGroupTwo");
  };
  // console.log(addItemOptions, setAddItemOptions);
  return (
    <Fragment>
      <div className={styles.customModal}>
        <div className="mt-4">
          What would you like to name this option group?{" "}
          <img src={infoIcon} width={30} height={30} />
        </div>
        <CustomTextInput
          label=""
          name="optionName"
          type="text"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
          required
        />
        <div className="d-flex align-items-end justify-content-end w-100">
          <Button className={styles.submitButton} onClick={moveToStepTwo}>
            <span className={styles.submitButtonText}>Next</span>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default OptionGroupStepOne;
