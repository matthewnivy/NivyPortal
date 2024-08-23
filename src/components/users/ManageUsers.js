import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
// import {
//   addNewUser,
//   updateExistingUser,
//   getManagedVendors,
//   getManagedVenues,
//   getCurrentUserDetails,
// } from "../../utils/ApiHandler";
// import { notify } from "../../utils/Notification";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
// import { MyCheckbox, MyTextInput } from "../common/TextInput";
import AsyncSelect from "react-select/async";
import AddUpdateTitle from "../common/add-update-title/AddUpdateTitle";
import { CustomCheckBox } from "../form/CustomCheckBox";
import { CustomTextInput } from "../form/CustomTextInput";
import { UsersApi } from "../../utils/api";
import NewAddUpdateTitle from "../common/add-update-title/NewAddUpdateTitle";
import styles from "../../global.module.css";

const ManageUsers = (props) => {
  let data = useLocation(); // data passed to this route using withRouter
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();

  let { id: idx, mode } = useParams();
  const usersApi = new UsersApi();
  console.log("DATA", data.state?.user, idx);
  console.log(props?.match?.params?.id, "ID", idx, mode);

  useEffect(() => {
    if (idx != "new") {
      getCurrentUser(idx);
    }
  }, []);

  const getCurrentUser = async (userId) => {
    setIsLoading(true);
    let response = await usersApi.getCurrentUserDetails({
      id: userId,
    });
    console.log(response);
    if (response.success) {
      setUser(response.content);
    }
    setIsLoading(false);
  };

  const manageUsers = (data) => {
    console.log({ data });
    // debugger
    const formData = new FormData();

    formData.append("Id", idx == "new" ? null : idx);
    formData.append("FirstName", data.firstName);
    formData.append("LastName", data.lastName);
    formData.append("Email", data.email);

    formData.append("Username", data.userName);
    formData.append("Password", data.password);

    formData.append("IsAdmin", data.isAdmin);

    data.venueIds.map((venueId) => formData.append("VenueIds", venueId.value));
    data.managedVendors.map((managedVendor) =>
      formData.append("ManagedVendors", managedVendor.label)
    );

    formData.append("ManageVendors", data.manageVendors);
    formData.append("ProcessOrders", data.processOrders);
    formData.append("ManageAssociateAccounts", data.manageAssociateAccounts);
    formData.append("ManageEvents", data.manageEvents);
    formData.append("ManageContests", data.manageContests);
    formData.append("ManageRewards", data.manageRewards);
    formData.append("LookupUserRewards", data.lookupUserRewards);
    formData.append("ManageMarketingCampaigns", data.manageMarketingCampaigns);
    formData.append("Image", data.image);
    formData.append("ProfileImage", data.image);

    formData.append("OrganizationId", "NivyWebApp");

    // console.log(formData.getAll())
    // debugger;
    addUser(idx, formData);
  };

  const addUser = async (id, formData) => {
    let response;
    if (id === "new") {
      response = await usersApi.addNewUser(formData);
    } else {
      response = await usersApi.updateExistingUser(formData);
    }
    if (response.success) {
      // notify(response.content, "success");
      navigate(-1);
    } else {
      console.log(response.errors);
      // notify(response.description, "success");
      setErrors(response.errors);
    }
  };

  const getManagedVenuesList = async (inputValue) => {
    // setIsLoading(true);
    let response = await usersApi.getManagedVenues();
    console.log(response);
    if (response.success) {
      return response.content.map((venue) => ({
        label: venue.name,
        value: venue.id,
      }));
    }
    // setIsLoading(false);
  };

  const fetchManagedVendors = async (inputValue) => {
    // setIsLoading(true);
    let response = await usersApi.getManagedVendors(inputValue);
    console.log(response);
    if (response.success) {
      return response.content.map((vendor) => ({
        label: vendor.id,
        value: vendor.id,
      }));
    }
    // setIsLoading(false);
  };

  return (
    <Fragment>
      <>
        <div className="Title">
          <AddUpdateTitle
            heading={
              idx != "new"
                ? mode == "view"
                  ? "User Details"
                  : "Update Existing Associate Account"
                : "Create New Associate Account"
            }
            subheading="This page includes creation, updation and stats of the campaigns."
            icon="pe-7s-graph icon-gradient bg-ripe-malin"
            backUrl="../users"
          />
        </div>
        <>
          <div className="overlay">
            {Object.keys(errors).length > 0 && (
              <Alert color="danger">
                <h3>There are errors in your form :</h3>
                <ul>
                  {Object.entries(errors)?.map((error, key) => (
                    <li key={key}>{Object.values(error[1][0])}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <div className="toggleDisplay">
              <NewAddUpdateTitle
                heading={
                  idx != "new"
                    ? mode == "view"
                      ? "User Details"
                      : "Update Existing Associate Account"
                    : "Create New Associate Account"
                }
                backUrl="events"
              />
            </div>
            <Card className="manage-main-card">
              <CardBody>
                {!isLoading && (
                  <Formik
                    initialValues={{
                      firstName: user?.firstName ?? "",
                      lastName: user?.lastName ?? "",
                      email: user?.email ?? "",
                      userName: user?.username ?? "",
                      password: "",
                      isAdmin: user?.isAdmin ?? false,
                      venueIds:
                        user?.venueIds?.map((managedVenue) => ({
                          label: managedVenue,
                          value: managedVenue,
                        })) ?? [],
                      manageVendors: user?.manageVendors ?? false, // added for our checkbox
                      managedVendors:
                        user?.managedVendors?.map((managedVendor) => ({
                          label: managedVendor,
                          value: managedVendor,
                        })) ?? [],
                      processOrders: user?.processOrders ?? false,
                      manageContests: user?.manageContests ?? false,
                      manageRewards: user?.manageRewards ?? false,
                      lookupUserRewards: user?.lookupUserRewards ?? false,
                      manageMarketingCampaigns:
                        user?.manageMarketingCampaigns ?? false,
                      manageAssociateAccounts:
                        user?.manageAssociateAccounts ?? false,
                      manageEvents: user?.manageEvents ?? false,
                      image: user?.profileImage ?? "",
                      // jobType: "", // added for our select
                    }}
                    validationSchema={Yup.object({
                      firstName: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                      lastName: Yup.string()
                        .max(20, "Must be 10 characters or less")
                        .required("Required"),
                      email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                      userName: Yup.string().required("Required"),
                      password: Yup.string()
                        // .email("Invalid email address")
                        .required("Required"),
                      isAdmin: Yup.boolean().required("Required"),
                      // venueIds: Yup.object()
                      //   .shape({
                      //     value: Yup.string(),
                      //     // .required("Country is required"),
                      //     label: Yup.string(),
                      //     // .required("Country is required"),
                      //   })
                      // // .min(1, "Select at least one option")
                      // // .of(Yup.string().required("Option is required"))
                      // .required("Required"),
                      manageVendors: Yup.boolean().required("Required"), // added for our checkbox
                      managedVendors: Yup.array()
                        .of(
                          Yup.object().shape({
                            value: Yup.string().required("Country is required"),
                            // label: Yup.string().required("f is required"),
                          })
                        )
                        // .min(1, "Select at least one option")
                        // .of(Yup.string().required("Option is required"))
                        .required("Required"),
                      processOrders: Yup.boolean().required("Required"),
                      manageAssociateAccounts:
                        Yup.boolean().required("Required"),
                      manageContests: Yup.boolean().required("Required"),
                      manageRewards: Yup.boolean().required("Required"),
                      lookupUserRewards: Yup.boolean().required("Required"),
                      manageMarketingCampaigns:
                        Yup.boolean().required("Required"),
                      manageEvents: Yup.boolean().required("Required"),
                      image: Yup.string()
                        // .min(1, "Select at least one option")
                        // .of(Yup.string().required("Option is required"))
                        .required("Required"),
                      // .oneOf([true], "You must accept the terms and conditions."),
                      // jobType: Yup.string()
                      //   .oneOf(
                      //     ["designer", "development", "product", "other"],
                      //     "Invalid Job Type"
                      //   )
                      //   .required("Required"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        console.log(values, "SUBMISSION");
                        manageUsers(values);
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({ values, setFieldValue, errors, touched }) => (
                      <FormikForm>
                        <CustomTextInput
                          label="Associate’s First Name"
                          name="firstName"
                          type="text"
                          placeholder="Enter First Name"
                          require
                        />
                        <CustomTextInput
                          label="Associate’s Last Name"
                          name="lastName"
                          type="text"
                          placeholder="Enter Last Name"
                          require
                        />
                        <CustomTextInput
                          label="Associate’s Email"
                          name="email"
                          type="email"
                          placeholder="Enter Email Address"
                          require
                        />
                        <CustomTextInput
                          label="Associate’s User name"
                          name="userName"
                          type="text"
                          placeholder="Enter Username"
                          require
                        />
                        <CustomTextInput
                          label="Associate’s Password"
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          require
                        />
                        <legend className="col-form-label">
                          Roles & Permissions
                        </legend>
                        <legend className="col-form-label">
                          User Rights: <span className="text-danger">*</span>
                        </legend>
                        <CustomCheckBox name="isAdmin">
                          &nbsp;&nbsp;&nbsp;
                          <span className={styles.verticalAlign}>
                            Admin - Access to all features
                          </span>
                        </CustomCheckBox>
                        <legend className="col-form-label">
                          Managed Venues: <span className="text-danger">*</span>
                        </legend>
                        <FormGroup>
                          <Field
                            id="venueIds"
                            name="venueIds"
                            as={AsyncSelect}
                            isMulti
                            loadOptions={getManagedVenuesList}
                            defaultOptions
                            isLoading={isLoading}
                            onChange={(value) =>
                              setFieldValue("venueIds", value)
                            }
                            placeholder="Multi Select Managed Venues"
                            required
                          />
                          {values.venueIds.length == 0 && (
                            <div className="error">Required</div>
                          )}
                        </FormGroup>
                        <legend className="col-form-label">
                          Vendors (Select Managed Vendors):{" "}
                          <span className="text-danger">*</span>
                        </legend>
                        <FormGroup>
                          <Label></Label>
                          <Field
                            id="managedVendors"
                            name="managedVendors"
                            as={AsyncSelect}
                            isMulti
                            loadOptions={() =>
                              fetchManagedVendors(values.venueIds)
                            }
                            defaultOptions
                            isLoading={isLoading}
                            onChange={(value) =>
                              setFieldValue("managedVendors", value)
                            }
                            placeholder="Multi Select Managed Vendors"
                            required
                          />

                          {/* {console.log(
                        errors,
                        touched,
                        "hi bebe",
                        values.managedVendors
                      )} */}

                          {values.managedVendors.length == 0 && (
                            <div className="error">Required</div>
                          )}
                        </FormGroup>
                        <Row>
                          <>
                            <CustomCheckBox name="manageVendors">
                              &nbsp;&nbsp;&nbsp;{" "}
                              <span className={styles.verticalAlign}>
                                {" "}
                                Create/Manage Vendors
                              </span>
                            </CustomCheckBox>
                          </>
                          <>
                            <CustomCheckBox name="processOrders">
                              &nbsp;&nbsp;&nbsp;
                              <span className={styles.verticalAlign}>
                                Process Customer Orders
                              </span>
                            </CustomCheckBox>
                          </>
                        </Row>
                        <legend className="col-form-label">
                          Associate Accounts:{" "}
                          <span className="text-danger">*</span>
                        </legend>
                        <Row>
                          <>
                            <CustomCheckBox name="manageAssociateAccounts">
                              &nbsp;&nbsp;&nbsp;{" "}
                              <span className={styles.verticalAlign}>
                                Create/Manage Associate
                              </span>
                              Accounts
                            </CustomCheckBox>
                          </>
                        </Row>
                        <legend className="col-form-label">
                          Contests: <span className="text-danger">*</span>
                        </legend>
                        <Row>
                          <>
                            <CustomCheckBox name="manageContests">
                              &nbsp;&nbsp;&nbsp;{" "}
                              <span className={styles.verticalAlign}>
                                Create / Manage Contests
                              </span>
                            </CustomCheckBox>
                          </>
                        </Row>
                        <legend className="col-form-label">
                          Rewards: <span className="text-danger">*</span>
                        </legend>
                        <Row>
                          <>
                            <CustomCheckBox name="manageRewards">
                              &nbsp;&nbsp;&nbsp;{" "}
                              <span className={styles.verticalAlign}>
                                {" "}
                                Manage Reward Prizes
                              </span>
                            </CustomCheckBox>
                          </>
                          <>
                            <CustomCheckBox name="lookupUserRewards">
                              &nbsp;&nbsp;&nbsp;{" "}
                              <span className={styles.verticalAlign}>
                                {" "}
                                Lookup User Points
                              </span>
                            </CustomCheckBox>
                          </>
                        </Row>
                        <legend className="col-form-label">
                          Campaigns: <span className="text-danger">*</span>
                        </legend>
                        <Row>
                          <>
                            <CustomCheckBox name="manageMarketingCampaigns">
                              &nbsp;&nbsp;&nbsp;{" "}
                              <span className={styles.verticalAlign}>
                                {" "}
                                Create/Manage Marketing
                              </span>
                              Campaigns
                            </CustomCheckBox>
                          </>
                        </Row>
                        <legend className="col-form-label">
                          Events: <span className="text-danger">*</span>
                        </legend>
                        <Row>
                          <>
                            <CustomCheckBox name="manageEvents">
                              &nbsp;&nbsp;&nbsp;{" "}
                              <span className={styles.verticalAlign}>
                                Create/Manage Events
                              </span>
                            </CustomCheckBox>
                          </>
                        </Row>
                        <legend className="col-form-label">
                          User Image: <span className="text-danger">*</span>
                        </legend>
                        <Field
                          name="image"
                          render={({ field, form }) => (
                            <div>
                              {/* <img src={field.value} alt="uploaded image" /> */}
                              <Input
                                type="file"
                                onChange={(e) => {
                                  form.setFieldValue(
                                    "image",
                                    e.currentTarget.files[0]
                                  );
                                }}
                              />
                            </div>
                          )}
                        />
                        {values.image == 0 && touched.image && (
                          <div className="error">{errors.image}</div>
                        )}
                        <br></br>
                        {user?.profileImage && (
                          <img height={200} src={user?.profileImage} />
                        )}
                        {/* <Image src={values.image} alt="IMAGE" /> */}
                        <br></br>
                        {/* <small>
                      (the result of <code>fetchNewTextC(venueIds))</code>
                    </small> */}

                        <Button className="Addbutton" type="submit">
                          <p>SUBMIT</p>
                        </Button>
                      </FormikForm>
                    )}
                  </Formik>
                )}
              </CardBody>
            </Card>
          </div>
        </>
      </>
    </Fragment>
  );
};

export default ManageUsers;