import React, { Fragment, useContext } from "react";
import styles from "./ImageFromUrl.module.css";
import { Button, Input } from "reactstrap";
import { CustomTextInput } from "../../form/CustomTextInput";
import { isImage } from "../../../utils/helpers/ImageVerify";
import AuthContext from "../../../context/auth-context";
const ImageFromUrl = ({ openModal, setAdditionalImages, values }) => {
  const authCtx = useContext(AuthContext);
  const setAdditionalImage = () => {
    // console.log(, "ffff");
    if (!isImage(values?.imgURL)) {
      authCtx.setNotification({
        severity: "error",
        message: "Incorrect image URL",
      });
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    } else {
      // if (isImage(values?.imgUrl)) {
      setAdditionalImages((additionalImages) => [
        ...additionalImages,
        values?.imgURL,
      ]);
      // }
      openModal(false);
    }
  };
  return (
    <Fragment>
      <div className={styles.customModal}>
        <CustomTextInput
          label=""
          name="imgURL"
          placeholder="Image URL"
          type="text"
          style={{
            minWidth: 617,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          required
        />
        <div className="d-flex align-items-end justify-content-end w-100">
          <Button className={styles.submitButton} onClick={setAdditionalImage}>
            <span className={styles.submitButtonText}>Save</span>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageFromUrl;
