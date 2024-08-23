import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import AddUpdateTitle from "../components/common/add-update-title/AddUpdateTitle";
import { CustomTextInput } from "../components/form/CustomTextInput";
import { CustomCheckBox } from "../components/form/CustomCheckBox";
import imageUploadIcon from "../assets/image-upload.svg";
import { VendorsApi } from "../utils/api";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import styles from "../global.module.css";

const Vendor = () => {
  let { vendorId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const vendorsApi = new VendorsApi();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const manageVendors = async (values) => {
    let data = values;
    data.orgId = "NivyWebApp";
    data.venueId = authCtx.selectedVenueId;
    data.allowDelivery = values.offerDelivery;
    delete data.brandImage;
    const res = await vendorsApi.addNewVendor(data);
    const notify = {};
    if (res.success) {
      notify.severity = "success";
      notify.message = `New Vendor Added Successfully!`;
    } else {
      notify.severity = "error";
      notify.message = "Error!";
    }
    authCtx.setNotification(notify);
    navigate(-1);

    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };
  const initialValues = [];

  return (
    <Fragment>
      <div>
        <AddUpdateTitle
          heading={
            vendorId == "new" ? "Add New Vendor" : "Update Existing Vendor"
          }
          icon="pe-7s-graph icon-gradient bg-ripe-malin"
        />
        <>
          <div
            style={{
              zIndex: 1,
              position: "relative",
              overflowY: "scroll",
            }}
            className="overlay"
          >
            {/* {Object.keys(errors).length > 0 && (
              <Alert color="danger">
                <h3>There are errors in your form :</h3>
                <ul>
                  {Object.entries(errors)?.map((error, key) => (
                    <li key={key}>{Object.values(error[1][0])}</li>
                  ))}
                </ul>
              </Alert>
            )} */}
            <Card>
              <CardHeader>
                <div className="headi-">
                  {vendorId == "create"
                    ? "Edit Vendor details"
                    : "Enter vendor details"}
                </div>
              </CardHeader>
              <CardBody>
                {!isLoading && (
                  <Formik
                    initialValues={{
                      vendorName: "",
                      vendorType: "",
                      location: "",
                      managerName: "",
                      managerEmail: "",
                      offerDelivery: "",
                      deliveryFee: "",
                      vendorTaxRate: "",
                      brandImage: "",
                    }}
                    validationSchema={Yup.object({
                      vendorName: Yup.string().required("Required"),
                      vendorType: Yup.string().required("Required"),
                      location: Yup.string().required("Required"),
                      managerName: Yup.string().required("Required"),
                      managerEmail: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                      offerDelivery: Yup.bool().required("Required"),
                      deliveryFee: Yup.string().required("Required"),
                      vendorTaxRate: Yup.string().required("Required"),
                      brandImage: Yup.string(),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        console.log(values, "SUBMISSION");
                        // debugger
                        manageVendors(values);
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({ values, setFieldValue, errors, touched }) => (
                      <FormikForm>
                        <CustomTextInput
                          label="Vendor Name"
                          name="vendorName"
                          type="text"
                          placeholder="Enter Vendor Name"
                          require
                        />
                        <Row>
                          <Col md={6}>
                            <CustomTextInput
                              label="Vendor Type"
                              name="vendorType"
                              type="text"
                              placeholder="Enter Vendor Type"
                              require
                            />
                          </Col>
                          <Col md={6}>
                            <CustomTextInput
                              label="Vendor Location"
                              name="location"
                              type="text"
                              placeholder="Enter Vendor Location"
                              require
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <CustomTextInput
                              label="Manager Name"
                              name="managerName"
                              type="text"
                              placeholder="Enter Manager's Name"
                              require
                            />
                          </Col>
                          <Col md={6}>
                            <CustomTextInput
                              label="Manager Email"
                              name="managerEmail"
                              type="email"
                              placeholder="Enter Manager's Email"
                              require
                            />
                          </Col>
                        </Row>
                        <Row>
                          <>
                            <CustomCheckBox name="offerDelivery">
                              &nbsp;&nbsp;&nbsp;{" "}
                              <span className={styles.verticalAlign}>
                                Offer Delivery
                              </span>
                            </CustomCheckBox>
                          </>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <CustomTextInput
                              label="Delivery Fee"
                              name="deliveryFee"
                              type="number"
                              min={0}
                              placeholder="$2.00"
                              require
                            />
                          </Col>
                          <Col md={6}>
                            <CustomTextInput
                              label="Tax Rate"
                              name="vendorTaxRate"
                              type="number"
                              min={0}
                              placeholder="16%"
                              require
                            />
                          </Col>
                        </Row>
                        <div
                          style={{
                            color: "black",
                          }}
                          className="mt-2 mb-4"
                        >
                          Add Brand Image
                        </div>
                        <Field
                          name="brandImage"
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
                                  initialValues?.state?.events?.homeTeamImage
                                    ? initialValues?.state?.events
                                        ?.homeTeamImage
                                    : "#"
                                }
                                alt="your image"
                                width={140}
                                height={72}
                                style={{
                                  display: initialValues?.state?.events
                                    ?.homeTeamImage
                                    ? "inline"
                                    : "none",
                                }}
                              />
                              <div
                                id="imgInput"
                                style={{
                                  display: initialValues?.state?.events
                                    ?.homeTeamImage
                                    ? "none"
                                    : "inline",
                                }}
                              >
                                <label
                                  for="fileUpload"
                                  class={"customFileUpload"}
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
                                    console.log(
                                      file,
                                      URL.createObjectURL(file)
                                    );
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
                                      "brandImage",
                                      e.currentTarget.files[0]
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        />
                        {/* {values.homeImage == 0 && touched.homeImage && (
                          <div className="error">{errors.homeImage}</div>
                        )} */}
                        {/* <Link
                          to={`/vendors/${vendorId}`}
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <div className="edit-vendor-btn">
                            <img src={marker} />
                            &nbsp; Edit Vendor Settings
                          </div>
                        </Link> */}
                        <Button
                          className="button2 mt-4"
                          type="submit"
                          style={{
                            width: "100%",
                            background: "#399700",
                          }}
                        >
                          {vendorId == "new" ? "Add" : "Update"}
                        </Button>
                      </FormikForm>
                    )}
                  </Formik>
                )}
              </CardBody>
            </Card>
          </div>
        </>
      </div>
    </Fragment>
  );
};

export default Vendor;