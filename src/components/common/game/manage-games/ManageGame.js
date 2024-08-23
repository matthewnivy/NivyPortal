import React, { Fragment, useContext } from "react";
import styles from "./ManageGame.module.css";
import { Field, Form, Formik } from "formik";
import { Button, Col, Input, Row, Card, CardBody } from "reactstrap";
import { CustomTextInput } from "../../../form/CustomTextInput";
import * as Yup from "yup";
import imageUploadIcon from "../../../../assets/image-upload.svg";
import linkIcon from "../../../../assets/link-icon.svg";
import { GameProgramsApi } from "../../../../utils/api";
import AuthContext from "../../../../context/auth-context";
import NewAddUpdateTitle from "../../add-update-title/NewAddUpdateTitle";
import AddUpdateTitle from "../../add-update-title/AddUpdateTitle";

const ManageGame = ({ openModal }) => {
  const initialValues = [];
  const gameProgramsApi = new GameProgramsApi();
  const authCtx = useContext(AuthContext);

  console.log(authCtx?.selectedGameProgram, "hello world");
  const submitHandler = async (values) => {
    let formData = new FormData();
    formData.append("Image", values?.gameImage);
    formData.append("OrgId", "una_lions");
    formData.append("Title", values?.title);
    formData.append("Url", values?.gameImageUrl);
    formData.append("Date", values?.gameDate);
    let response = [];
    if (authCtx?.selectedGameProgram?.id) {
      formData.append("Id", authCtx?.selectedGameProgram?.id);
      response = await gameProgramsApi.updateExistingGameProgram(formData);
    } else {
      response = await gameProgramsApi.addNewGameProgram(formData);
    }
    const notify = {};

    if (response.success) {
      notify.severity = "success";
      notify.message = response.content;
      openModal(false);
    } else {
      notify.severity = "success";
      notify.message = response.content;
    }
    authCtx.setNotification(notify);
    authCtx.fetchGamePrograms();

    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const resolveStartDateAndTime = (startTime) => {
    // Convert the 12-hour datetime string (12/31/2021 11:59 PM) to a Date object
    const dateObject = startTime ? new Date(startTime) : new Date();
    const timeOffset = dateObject.getTimezoneOffset() * 60000;

    var localISOTime = new Date(dateObject - timeOffset);
    // Convert the Date object to a datetime-local default value
    return localISOTime?.toISOString()?.substring(0, 16);
    // return;
  };
  return (
    <Fragment>
      <AddUpdateTitle heading="Add new game program" backUrl="rosters" />
      <div className="overlay">
        <div className="toggleDisplay">
          <NewAddUpdateTitle heading="Add new game program" backUrl="rosters" />
        </div>
        <Card className="manage-main-card">
          <CardBody>
            <Formik
              initialValues={{
                title: authCtx?.selectedGameProgram?.title ?? "",
                gameDate:
                  resolveStartDateAndTime(authCtx?.selectedGameProgram?.date) ??
                  "",
                gameImage: authCtx?.selectedGameProgram?.image ?? "",
                gameImageUrl: authCtx?.selectedGameProgram?.url ?? "",
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Opponent team name is required"),
                gameDate: Yup.date(),
                gameImage: Yup.string(),
                gameImageUrl: Yup.string(),
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
                  <Row>
                    <>
                      <CustomTextInput
                        label="Opponent Team Name"
                        name="title"
                        type="text"
                        placeholder=""
                        require
                        className={styles.customWidth}
                      />
                    </>

                    <Col>
                      Event Date
                      <Field
                        name="gameDate"
                        render={({ field, form }) => (
                          <>
                            {/* Event Date */}
                            <Input
                              type="datetime-local"
                              style={{
                                marginTop: 14,
                              }}
                              className={styles.customWidth}
                              onChange={(e) => {
                                form.setFieldValue(
                                  "gameDate",
                                  e.currentTarget.value
                                );
                              }}
                              defaultValue={values.homeImageLink}
                            />
                          </>
                        )}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      Upload Image {<span className="text-danger">*</span>}
                      <Field
                        name="gameImage"
                        render={({ field, form }) => (
                          <div
                            id="homeImgContainer"
                            style={{
                              display: initialValues?.state?.events
                                ?.homeTeamImage
                                ? "flex"
                                : "inline",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              id="blah"
                              src={
                                authCtx?.selectedGameProgram?.image
                                  ? authCtx?.selectedGameProgram?.image
                                  : "#"
                              }
                              alt="your image"
                              width={150}
                              height={73}
                              style={{
                                display: authCtx?.selectedGameProgram?.image
                                  ? "inline"
                                  : "none",
                                width: 150,
                                height: 73,
                              }}
                            />
                            <div
                              id="imgInput"
                              style={{
                                display: authCtx?.selectedGameProgram?.image
                                  ? "none"
                                  : "inline",
                              }}
                            >
                              <label
                                for="fileUpload"
                                class={styles.customFileUpload}
                              >
                                <img src={imageUploadIcon} />
                              </label>
                              <input
                                id="fileUpload"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  console.log(e);
                                  const [file] = e.target.files;
                                  console.log(file, URL.createObjectURL(file));
                                  document.getElementById(
                                    "imgInput"
                                  ).style.display = "none";
                                  if (file) {
                                    document.getElementById(
                                      "blah"
                                    ).style.display = "inline";
                                    document.getElementById(
                                      "homeImgContainer"
                                    ).style.display = "flex";
                                    document.getElementById(
                                      "homeImgContainer"
                                    ).style.justifyContent = "center";
                                    document.getElementById("blah").src =
                                      URL.createObjectURL(file);
                                    document.getElementById(
                                      "imgInput"
                                    ).style.display = "none";
                                  }
                                  form.setFieldValue(
                                    "gameImage",
                                    e.currentTarget.files[0]
                                  );
                                }}
                              />
                            </div>
                          </div>
                        )}
                      />
                      {values.homeImage == 0 && touched.homeImage && (
                        <div className="error">{errors.homeImage}</div>
                      )}
                    </Col>

                    <Col md={1} className={styles.center}>
                      <span className={styles.OR}>OR</span>
                    </Col>

                    <Col md={8}>
                      Add Image URL {<span className="text-danger">*</span>}
                      <Field
                        name="gameImageUrl"
                        render={({ field, form }) => (
                          <Input
                            type="text"
                            className={styles.customImageInput}
                            onChange={(e) => {
                              form.setFieldValue(
                                "gameImageUrl",
                                e.currentTarget.value
                              );
                            }}
                            style={{
                              backgroundImage: `url(${linkIcon})`,
                            }}
                            defaultValue={values.homeImageLink}
                          />
                        )}
                      />
                      {values.homeImageLink == 0 && touched.homeImageLink && (
                        <div className="error">{errors.homeImageLink}</div>
                      )}
                    </Col>
                  </Row>
                  <Button className={styles.submitButton} type="submit">
                    <span className={styles.submitButtonText}>
                      {authCtx?.selectedGameProgram?.id ? "Update" : "Add"}
                    </span>
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};

export default ManageGame;