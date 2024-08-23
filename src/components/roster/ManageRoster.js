import { Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { Button, Col, Input, Row, Card, CardBody } from "reactstrap";
import * as Yup from "yup";
import { CustomTextInput } from "../form/CustomTextInput";
import linkIcon from "../../assets//link-icon.svg";
import imageUploadIcon from "../../assets/image-upload.svg";
import NewAddUpdateTitle from "../common/add-update-title/NewAddUpdateTitle";
import styles from "./Roster.module.css";
import AddUpdateTitle from "../common/add-update-title/AddUpdateTitle";

const ManageRoster = () => {
  return (
    <Fragment>
      <AddUpdateTitle heading="Add new roster" backUrl="rosters" />

      <div className="overlay">
        <div className="toggleDisplay">
          <NewAddUpdateTitle heading="Add new rosters" backUrl="rosters" />
        </div>

        <Card className="manage-main-card">
          <CardBody>
            <Formik
              initialValues={{
                playerName: "",
                playerNumber: "",
                year: "",
                position: "",
                homeTown: "",
                image: "",
                imageLink: "",
              }}
              validationSchema={Yup.object({
                playerName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                playerNumber: Yup.number().min(1).required("Required"),
                year: Yup.number().min(2023).required("Required"),
                position: Yup.number().min(0).required("Required"),
                homeTown: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                image: Yup.string().required("Required"),
                imageLink: Yup.string(),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.log(values, "SUBMISSION");
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form>
                   <div className="titleText"> Add New Roster</div>
                  <Row>
                    <Col md={6}>
                      <CustomTextInput
                        label="Player Name"
                        name="playerName"
                        type="text"
                        placeholder="Enter player name"
                        require
                      />
                    </Col>
                    <Col md={6}>
                      <CustomTextInput
                        label="Player number"
                        name="playerNumber"
                        type="number"
                        placeholder="Enter player number"
                        min={1}
                        require
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <CustomTextInput
                        label="Year"
                        name="year"
                        type="number"
                        placeholder="YYYY"
                        require
                      />
                    </Col>
                    <Col md={6}>
                      <CustomTextInput
                        label="Position"
                        name="position"
                        type="number"
                        placeholder="Enter player number"
                        min={1}
                        require
                      />
                    </Col>
                  </Row>

                  <Row>
                    <CustomTextInput
                      label="Hometown"
                      name="homeTown"
                      type="text"
                      placeholder="Enter Home town"
                      require
                    />
                  </Row>

                  <legend className="col-form-label">
                    Product Image: <span className="text-danger">*</span>
                  </legend>

                  <Row>
                    <Col md={3}>
                      <Field
                        name="image"
                        render={({ field, form }) => (
                          <div>
                            {/* <img src={field.value} alt="uploaded image" /> */}
                            <img
                              id="blah"
                              src="#"
                              alt="your image"
                              width={140}
                              height={72}
                              style={{ display: "none" }}
                            />
                            <div id="imgInput">
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
                                  if (file) {
                                    document.getElementById(
                                      "blah"
                                    ).style.display = "inline";
                                    document.getElementById("blah").src =
                                      URL.createObjectURL(file);
                                    document.getElementById(
                                      "imgInput"
                                    ).style.display = "none";
                                  }
                                  form.setFieldValue(
                                    "image",
                                    e.currentTarget.files[0]
                                  );
                                }}
                              />
                            </div>
                          </div>
                        )}
                      />
                      {values.image == 0 && touched.image && (
                        <div className="error">{errors.image}</div>
                      )}
                    </Col>

                    <Col md={1} className={styles.center}>
                      <span className={styles.OR}>OR</span>
                    </Col>

                    <Col md={8}>
                      <Field
                        name="imageLink"
                        render={({ field, form }) => (
                          <Input
                            type="text"
                            className={styles.customImageInput}
                            style={{
                              backgroundImage: `url(${linkIcon})`,
                            }}
                            onChange={(e) => {
                              form.setFieldValue(
                                "imageLink",
                                e.currentTarget.value
                              );
                            }}
                          />
                        )}
                      />
                      {values.imageLink == 0 && touched.imageLink && (
                        <div className="error">{errors.imageLink}</div>
                      )}
                    </Col>
                  </Row>
                  <Button className={styles.submitButton} type="submit">
                    <span className={styles.submitButtonText}>ADD</span>
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

export default ManageRoster;