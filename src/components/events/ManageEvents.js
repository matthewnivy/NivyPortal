import { Fragment, useEffect, useContext } from "react";
// import { Bounce, toast } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import AddUpdateTitle from "../common/add-update-title/AddUpdateTitle";
import NewAddUpdateTitle from "../common/add-update-title/NewAddUpdateTitle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { CustomTextInput } from "../form/CustomTextInput";
import { CustomCheckBox } from "../form/CustomCheckBox";
import { Field, Form, Formik } from "formik";
import styles from "./style.module.css";
import imageUploadIcon from "../../assets/image-upload.svg";
import linkIcon from "../../assets//link-icon.svg";
import { EventsApi } from "../../utils/api";
import { FormControl, MenuItem, Select } from "@mui/material";
import headerContext from "../../headerContext";

const ManageEvents = (props) => {
  // const notify = (n, type) =>
  //   toast(n, {
  //     transition: Bounce,
  //     closeButton: true,
  //     autoClose: 5000,
  //     position: "bottom-left",
  //     type: type,
  //   });
  let { id: eventId } = useParams();
  const initialValues = useLocation();
  const navigate = useNavigate();
  console.log({ initialValues }, initialValues?.state?.events);
  const eventsApi = new EventsApi();

  const addEvent = async (
    name,
    startTime,
    checkInStart,
    checkInEnd,
    secondcheckInStart,
    secondcheckInEnd,
    checkInPoints,
    secondCheckInPoints
  ) => {
    let response = [];
    //  await createEvent(
    //   name,
    //   startTime,
    //   checkInStart,
    //   checkInEnd,
    //   secondcheckInStart,
    //   secondcheckInEnd,
    //   checkInPoints,
    //   secondCheckInPoints
    // );
    if (response.success) {
      // notify("Event Created Successfuly!", "success");
    }
    // notify("Event is not created!", "error");
  };

  const handleSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);
    // console.log(document.getElementById('blah').src)
    // debugger;
    const formData = new FormData();

    formData.append("Id", eventId == "new" ? null : eventId);
    formData.append("OrganizationId", "NivyWebApp");
    formData.append("VenueId", localStorage.getItem("selectedVenueId"));
    formData.append("EventName", values.eventTitle);
    formData.append("EventType", values.eventType);
    formData.append("EventStartDateTime", values.startDateAndTime);
    formData.append("bEventStartTimeTBA", values.isTBA);
    formData.append("EventHomeTeam", values.homeTeam);
    formData.append("HomeTeamImage", values?.homeImage);
    formData.append("EventAwayTeam", values.awayTeam);
    formData.append("AwayTeamImage", values?.awayTeamImage);
    formData.append("EventCheckInDateTime", values?.startDateAndTime);

    formData.append("EventHomeTeamLink", values?.homeImageLink);
    formData.append("EventAwayTeamLink", values?.awayImageLink);

    let response = [];
    if (eventId == "new") {
      response = await eventsApi.addNewEvent(formData);
    } else {
      response = await eventsApi.updateExistingCampaign(formData);
    }

    if (response?.success) {
      navigate(-1);
    }
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
  const navigateBack = () => {
    navigate(-1);
  };
  const { setToggleEvent } = useContext(headerContext);
  useEffect(() => {
    setToggleEvent(true);
    return () => {
      setToggleEvent(false);
    };
  }, []);

  return (
    <Fragment>
      <div>
        <div className="Title">
          <AddUpdateTitle
            heading={eventId != "new" ? "Update event" : "Create new event"}
            backUrl="events"
          />
        </div>
        <>
          <div className="overlay">
            <div className="toggleDisplay">
              <NewAddUpdateTitle
                heading={
                  eventId != "new" ? "Update event" : "Create new Events"
                }
                backUrl="events"
              />
            </div>
            <Card className="manage-main-card" id="#createEventForm">
              <CardBody>
                <Formik
                  initialValues={{
                    eventType: initialValues?.state?.events?.eventType ?? "",
                    eventTitle: initialValues?.state?.events?.eventName ?? "",
                    homeTeam: initialValues?.state?.events?.eventHomeTeam ?? "",
                    homeImage:
                      initialValues?.state?.events?.homeTeamImage ?? "",
                    homeImageLink:
                      initialValues?.state?.events?.eventHomeTeamLink ?? "",
                    awayTeam: initialValues?.state?.events?.eventAwayTeam ?? "",
                    awayTeamImage:
                      initialValues?.state?.events?.awayTeamImage ?? "",
                    awayImageLink:
                      initialValues?.state?.events?.eventAwayTeamLink ?? "",
                    startDateAndTime: resolveStartDateAndTime(
                      initialValues?.state?.events?.eventStartDateTime ?? ""
                    ),
                    // initialValues?.state?.events?.eventStartDateTime ?? "",
                    isTBA:
                      initialValues?.state?.events?.bEventStartTimeTBA ?? false,
                  }}
                  validationSchema={Yup.object({
                    eventType: Yup.string()
                      .max(15, "Must be 15 characters or less")
                      .required("Required"),
                    eventTitle: Yup.string()
                      .max(15, "Must be 15 characters or less")
                      .required("Required"),
                    homeTeam: Yup.string().required("Required"),
                    // .required("Required"),
                    homeImage: Yup.string(),
                    homeImageLink: Yup.string(),
                    awayTeam: Yup.string().required("Required"),
                    // .required("Required"),
                    awayTeamImage: Yup.string(),
                    awayImageLink: Yup.string().required("Required"),
                    startDateAndTime: Yup.date(),
                    isTBA: Yup.boolean(),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      console.log(values, "SUBMISSION");
                      // debugger;
                      handleSubmit(values);
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({ values, setFieldValue, errors, touched }) => (
                    <Form>
                      <Row>
                        <Col>
                          <Field
                            name="managedVendors"
                            render={({ field, form }) => (
                              <div>
                                <div className="titleText">
                                  {" "}
                                  Create New Events
                                </div>
                                <Label className={styles.event_type_text}>
                                  Event Type{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <FormControl fullWidth>
                                  <Select
                                    className="form-control-event"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.eventType}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    onChange={(e) => {
                                      form.setFieldValue(
                                        "eventType",
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {JSON.parse(
                                      localStorage.getItem("user") ?? null
                                    )?.eventTypes.map((eventType) => (
                                      <MenuItem value={eventType}>
                                        {eventType}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {/* <FormHelperText>Required</FormHelperText> */}
                                </FormControl>
                              </div>
                            )}
                          />
                        </Col>
                      </Row>
                      <Row className={styles.event_title_text}>
                        <CustomTextInput
                          className="form-control-event-title"
                          label="Event Title"
                          name="eventTitle"
                          type="text"
                          placeholder="Event Title"
                          require
                        />
                      </Row>

                      <Col className="form-control-home-team">
                        <CustomTextInput
                          className="form-control-home-team-form"
                          label="Home Team"
                          name="homeTeam"
                          type="text"
                          placeholder="Home Team"
                          require
                        />
                      </Col>

                      <Row>
                        <Col md={3}>
                          <Field
                            name="homeImage"
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
                                        "homeImage",
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
                          <Field
                            name="homeImageLink"
                            render={({ field, form }) => (
                              <Input
                                type="text"
                                className={styles.customImageInput}
                                style={{
                                  backgroundImage: `url(${linkIcon})`,
                                }}
                                onChange={(e) => {
                                  form.setFieldValue(
                                    "homeImageLink",
                                    e.currentTarget.value
                                  );
                                }}
                                defaultValue={values.homeImageLink}
                              />
                            )}
                          />
                          {values.homeImageLink == 0 &&
                            touched.homeImageLink && (
                              <div className="error">
                                {errors.homeImageLink}
                              </div>
                            )}
                        </Col>
                      </Row>

                      <Col className="mt-2">
                        <CustomTextInput
                          className="away-team-form"
                          label="Away Team"
                          name="awayTeam"
                          type="text"
                          placeholder="Away Team"
                          require
                        />
                      </Col>

                      <Row>
                        <Col md={3}>
                          <Field
                            name="awayTeamImage"
                            render={({ field, form }) => (
                              <div
                                id="awayImgContainer"
                                style={{
                                  display: initialValues?.state?.events
                                    ?.awayTeamImage
                                    ? "flex"
                                    : "inline",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  id="awayTeam"
                                  src={
                                    initialValues?.state?.events?.awayTeamImage
                                      ? initialValues?.state?.events
                                          ?.awayTeamImage
                                      : "#"
                                  }
                                  alt="your image"
                                  width={140}
                                  height={72}
                                  style={{
                                    display: initialValues?.state?.events
                                      ?.awayTeamImage
                                      ? "inline"
                                      : "none",
                                  }}
                                />
                                <div
                                  id="secondImgInput"
                                  style={{
                                    display: initialValues?.state?.events
                                      ?.awayTeamImage
                                      ? "none"
                                      : "inline",
                                  }}
                                >
                                  <label
                                    for="fileUpload2"
                                    class={styles.customFileUpload}
                                  >
                                    <img src={imageUploadIcon} />
                                  </label>
                                  <input
                                    id="fileUpload2"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                      console.log(e);
                                      const [file] = e.target.files;
                                      console.log(
                                        file,
                                        URL.createObjectURL(file)
                                      );
                                      if (file) {
                                        document.getElementById(
                                          "awayTeam"
                                        ).style.display = "inline";
                                        document.getElementById(
                                          "awayImgContainer"
                                        ).style.display = "flex";
                                        document.getElementById(
                                          "awayImgContainer"
                                        ).style.justifyContent = "center";
                                        document.getElementById(
                                          "awayTeam"
                                        ).src = URL.createObjectURL(file);
                                        document.getElementById(
                                          "secondImgInput"
                                        ).style.display = "none";
                                      }
                                      form.setFieldValue(
                                        "awayTeamImage",
                                        e.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          />
                          {values.awayTeamImage == 0 &&
                            touched.awayTeamImage && (
                              <div className="error">
                                {errors.awayTeamImage}
                              </div>
                            )}
                        </Col>

                        <Col md={1} className={styles.center}>
                          <span className={styles.OR}>OR</span>
                        </Col>

                        <Col md={8}>
                          <Field
                            name="awayImageLink"
                            render={({ field, form }) => (
                              <Input
                                type="text"
                                className={styles.customImageInput}
                                style={{
                                  backgroundImage: `url(${linkIcon})`,
                                }}
                                onChange={(e) => {
                                  form.setFieldValue(
                                    "awayImageLink",
                                    e.currentTarget.value
                                  );
                                }}
                                defaultValue={values.awayImageLink}
                              />
                            )}
                          />
                          {values.awayImageLink == 0 &&
                            touched.awayImageLink && (
                              <div className="error">
                                {errors.awayImageLink}
                              </div>
                            )}
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col md={7}>
                          <CustomTextInput
                            label="Event Start Date & Time"
                            name="startDateAndTime"
                            type="datetime-local"
                            placeholder="YYYY"
                            require
                          />
                        </Col>
                        <Col md={5}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                              marginTop: 14,
                              lineHeight: "45px",
                            }}
                          >
                            <CustomCheckBox name="isTBA">
                              <span className="isTBA">&nbsp; Time TBA</span>
                            </CustomCheckBox>
                          </div>
                        </Col>
                      </Row>

                      <Button className="Addbutton" type="submit">
                        <span className="Addbuttontext">ADD</span>
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </div>
        </>
      </div>
    </Fragment>
  );
};

export default ManageEvents;