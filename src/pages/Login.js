import React, { Fragment, useContext, useState } from "react";
import NivyLogo from "../assets/nivy-full-logo.svg";
import styles from "../global.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Row } from "reactstrap";
import { CustomTextInput } from "../components/form/CustomTextInput";
import { CustomCheckBox } from "../components/form/CustomCheckBox";
import Modal from "../components/common/custom-modal/Modal";
import { AuthApi } from "../utils/api/index";
import { useNavigate } from "react-router";
import AuthContext from "../context/auth-context";

const Login = () => {
  const [modal, setModal] = useState(false);
  const [modalScreen, setModalScreen] = useState("forgetPassword");
  const [submitButtonText, setSubmitButtonText] = useState("Login");
  const navigate = useNavigate();
  const authApi = new AuthApi();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (data) => {
    setSubmitButtonText("Logging in...");
    const response = await authApi.authenticate({
      ...data,
      organizationId: "NivyWebApp",
    });
    const notify = {};
    if (response.success) {
      authCtx.login(
        response.content.token,
        JSON.stringify(response.content.user)
      );
      notify.severity = "success";
      notify.message = "Logged in Successfully!";
      navigate("/scan");
    } else {
      notify.severity = "error";
      notify.message = "Incorrect Credentials!";
    }
    authCtx.setNotification(notify);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
    setSubmitButtonText("Log in");
  };
  const openResetModal = () => {
    setModal(true);
    setModalScreen("forgetPassword");
  };
  return (
    <Fragment>
      <div
        className={`${styles.navbar} ${styles.flexBox} ${styles.itemsCenter}`}
      >
        <img
          src={NivyLogo}
          className={styles.logoStyle}
          alt="Nivy Logo"
          width={187}
          height={70}
        ></img>
      </div>
      <div
        className={`${styles.mainBody} ${styles.flexBox} ${styles.flexColumn} ${styles.itemsCenter} ${styles.justifyCenter}`}
      >
        <span className={`${styles.welcomeText} madeTommyDark`}>
          Welcome To The Nivy Portal!
        </span>
        <span className={styles.signIn}>Please sign in to your account.</span>
        <div className="mt-1">
          <Formik
            initialValues={{
              userName: "",
              password: "",
            }}
            validationSchema={Yup.object({
              userName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Username or Email is required"),
              password: Yup.string()
                // .min(8, "Must be 8 characters or more")
                .max(15, "Must be 15 characters or less")
                .required("Password is required"),
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
                <Row className={styles.loginInputs}>
                  <CustomTextInput
                    label="Username or Email"
                    name="userName"
                    type="text"
                    placeholder=""
                    require
                  />
                </Row>
                <Row className={styles.loginInputs}>
                  <CustomTextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder=""
                    require
                  />
                </Row>
                
                <CustomCheckBox name="rememberMe">
                  &nbsp;&nbsp;&nbsp;
                  <span className={styles.verticalAlign}>
                    Keep me logged in
                  </span>
                </CustomCheckBox>

                <Button className={styles.submitButton} type="submit">
                  <span className={styles.submitButtonText}>
                    {submitButtonText}
                  </span>
                </Button>
                <span className={styles.resetPw}>
                  Don’t remember your password? <pre> </pre>
                  <span className={styles.resetButton} onClick={openResetModal}>
                    Reset Password
                  </span>
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {modal && (
        <Modal
          openModal={setModal}
          changeModalScreen={setModalScreen}
          modalScreen={modalScreen}
        />
      )}
    </Fragment>
  );
};

export default Login;