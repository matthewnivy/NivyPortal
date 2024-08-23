import React, { Fragment, useState, useContext } from "react";
import styles from "./ForgetPassword.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Row } from "reactstrap";
import { CustomTextInput } from "../../../form/CustomTextInput";
import { AuthApi } from "../../../../utils/api/index";
import AuthContext from "../../../../context/auth-context";

const ForgetPassword = ({ changeModalScreen }) => {
  const authCtx = useContext(AuthContext);
  const authApi = new AuthApi();

  const submitHandler = async (data) => {
    const response = await authApi.fetchResetPasswordOTP({
      ...data,
      OrgId: "NivyWebApp",
    });

    const notify = {};
    if (response.success) {
      notify.severity = "success";
      notify.message = response.content;
      authCtx.setMobileNumber(data.mobileNo);
      changeModalScreen("resetCodeForm");
    } else {
      notify.severity = "error";
      notify.message = response.description;
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
        <span className={`${styles.forgotPwText} madeTommyDark`}>Forgot Password?</span>
        <span className={styles.enterText}>
          Please enter your phone number to reset your password.
        </span>

        <div className="mt-5">
          <Formik
            initialValues={{
              mobileNo: "",
            }}
            validationSchema={Yup.object({
              mobileNo: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Phone Number is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                submitHandler(values);
              }, 400);
            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <Row className={styles.loginInputs_forgetpw}>
                  <CustomTextInput
                    label="Phone Number"
                    name="mobileNo"
                    type="text"
                    placeholder=""
                    require
                    className={styles.inputWidth}
                  />
                </Row>
                <Button className={styles.submitButton} type="submit">
                  <span className={styles.submitButtonText}>Send</span>
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPassword;
