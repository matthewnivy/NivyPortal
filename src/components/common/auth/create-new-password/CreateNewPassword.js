import React, { Fragment, useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Row } from "reactstrap";
import { CustomTextInput } from "../../../form/CustomTextInput";
import AuthContext from "../../../../context/auth-context";
import { AuthApi } from "../../../../utils/api";
import styles from "./CreateNewPassword.module.css";

const CreateNewPassword = ({ openModal }) => {
  const [notification, setNotification] = useState({});
  const authCtx = useContext(AuthContext);
  const authApi = new AuthApi();

  const submitHandler = async (values) => {
    let response = await authApi.verifyOTP({
      code: authCtx.resetCode,
      mobileNo: authCtx.mobileNumber,
      newPassword: values.password,
      isAdmin: true,
      orgId: "NivyWebApp",
    });

    const notify = {};
    if (response.success) {
      notify.severity = "success";
      notify.message = response.description;
      setNotification(notify);
      setTimeout(() => {
        openModal(false);
      }, 1000);
    } else {
      notify.severity = "error";
      notify.message = response.description == "User not found" ? "Incorrect OTP, Please try again!" : ""     ;
    }
    authCtx.setNotification(notify);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };
  return (
    <Fragment>
      <div className={styles.customModal}>
        <span className={`${styles.forgotPwText} madeTommyDark`}>Reset Password</span>
        {/* <span className={styles.enterText}>
          Please enter your username or email to reset your password.
        </span> */}

        <div className="">
          <Formik
            initialValues={{
              password: "",
              reTypePassword: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Password is required"),
              passwordConfirmation: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password")], "Passwords must match"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              submitHandler(values);
            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <Row className={styles.loginInputs}>
                  <CustomTextInput
                    label="Retype New Password"
                    name="password"
                    type="password"
                    placeholder=""
                    require
                    className={styles.inputWidth}
                  />
                </Row>
                <Row className={styles.loginInputs}>
                  <CustomTextInput
                    label="New Password"
                    name="passwordConfirmation"
                    type="password"
                    placeholder=""
                    require
                    className={styles.inputWidth}
                  />
                </Row>

                <Button className={styles.submitButton} type="submit">
                  <span className={styles.submitButtonText}>
                    Reset Password
                  </span>
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewPassword;
