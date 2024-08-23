import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useLocation, useParams, useNavigate } from "react-router";
import RichTextEditor from "react-rte";
import AsyncSelect from "react-select/async";
import AddUpdateTitle from "../../add-update-title/AddUpdateTitle";
import { CampaignsApi } from "../../../../utils/api";
import rec from "../../../../assets/Rectangle 16992.png";
import "./style.css";
// import { notify } from "../../../../utils/Notification/notify";
import { Field } from "formik";
import NewAddUpdateTitle from "../../add-update-title/NewAddUpdateTitle";

// import Notify from "../../notification/Notification";
const ManageCampaigns = (props) => {
  let data = useLocation(); // data passed to this route using withRouter
  let { id: campaignId } = useParams();
  const navigate = useNavigate();
  // const history = useHistory(); // move from on route to another on successful response of API using react
  // Declare state variables to store the form data
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  // const htmlString = "<p>This is an example of some <strong>formatted</strong> text.</p>";
  const campaignsApi = new CampaignsApi();

  const [campaignDescription, setCampaignDescription] = useState(() =>
    data?.state?.decription
      ? RichTextEditor.createValueFromString(data.state.decription, "html")
      : RichTextEditor.createEmptyValue()
  );
  const [selectedNotificationRecipients, setSelectedNotificationRecipients] =
    useState([]);

  // console.log("DATA", data, data.state, campaignId);

  const handleCampaignDescriptionChange = (value) => {
    setCampaignDescription(value);
  };

  useEffect(() => {
    const initialValues = {};
    // console.log(compaignReceiverUsers)

    console.log(data, "DATA");
    if (data?.state?.compaignName) {
      initialValues.campaignName = data?.state?.compaignName;
      initialValues.campaignTitle = data?.state?.title;
      initialValues.campaignDescription = data?.state?.decription; //only for notification and sms types

      // Convert the 12-hour datetime string (12/31/2021 11:59 PM) to a Date object
      const dateObject = data?.state?.startDateTime
        ? new Date(data?.state?.startDateTime)
        : new Date();
      const timeOffset = dateObject.getTimezoneOffset() * 60000;

      var localISOTime = new Date(dateObject - timeOffset);
      // Convert the Date object to a datetime-local default value
      initialValues.datetime = localISOTime?.toISOString()?.substring(0, 16);

      // console.log(initialValues)
      // debugger
      initialValues.campaignReceiver = data?.state?.forAllCustomers;
      if (data?.state?.campaignType?.toLowerCase() == "email") {
        initialValues.campaignRecipient =
          !data?.state?.forAllCustomers &&
          data?.state?.compaignReceiverUsers?.map((c) => c.email).join(",");
      }
      if (data?.state?.campaignType?.toLowerCase() == "sms") {
        initialValues.campaignRecipient =
          !data?.state?.forAllCustomers &&
          data?.state?.compaignReceiverUsers
            .map((c) => `${c.countryCode}-${c.mobile}`)
            .join(",");
      }
      // compaignReceiverUsers
    } else {
      initialValues.campaignReceiver = true;
      // Convert the 12-hour datetime string (12/31/2021 11:59 PM) to a Date object
      const dateObject = new Date();
      const timeOffset = dateObject.getTimezoneOffset() * 60000;

      var localISOTime = new Date(dateObject - timeOffset);
      // Convert the Date object to a datetime-local default value
      initialValues.datetime = localISOTime?.toISOString()?.substring(0, 16);
    }
    setFormData(initialValues);
  }, []);

  // Declare a function to handle the change event for all inputs
  const handleChange = (event) => {
    const updatedData = { ...formData };
    updatedData[event.target.name] = event.target.value;
    setFormData(updatedData);
  };

  // Declare a function to handle the submit event for the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // setFormData({ ...formData , campaignDescription : campaignDescription.toString("html")})
    console.log(
      formData,
      selectedNotificationRecipients,
      // .map((receipient) => receipient.value)
      // .toString(),
      data?.state?.campaignType?.toLowerCase()
    );
    // debugger;
    var processedRecipientsData = [];
    if (data?.state?.campaignType?.toLowerCase() == "email") {
      let rawData = formData?.campaignRecipient?.split(",");

      for (var i = 0; i < rawData?.length; i++) {
        var item = {};
        item.Email = rawData[i];
        processedRecipientsData.push(item);
      }
    }

    if (data?.state?.campaignType?.toLowerCase() == "sms") {
      let rawData = formData?.campaignRecipient?.split(",");

      for (var i = 0; i < rawData?.length; i++) {
        var item = {};
        let mobileNumber = rawData[i]?.split("-") ?? "";
        item.CountryCode = mobileNumber[0];
        item.Mobile = mobileNumber[1];
        processedRecipientsData.push(item);
      }
    }

    if (data?.state?.campaignType?.toLowerCase() == "app notification") {
      processedRecipientsData = selectedNotificationRecipients.map(
        ({ CountryCode, Mobile }) => ({ CountryCode, Mobile })
      );
    }
    // notify('response.description', "success");

    addCampaign(
      data?.state?.campaignType?.toLowerCase() == "app notification"
        ? "notification"
        : data?.state?.campaignType?.toLowerCase(),
      formData.campaignName,
      formData.campaignTitle,
      new Date(formData.datetime)?.toISOString(),
      data?.state?.campaignType?.toLowerCase() == "email"
        ? campaignDescription.toString("html")
        : formData.campaignDescription,
      formData.campaignReceiver,
      JSON.stringify(processedRecipientsData)
    );

    console.log(formData, campaignDescription.toString("html"));
  };
  const [notification, setNotification] = useState({});

  const addCampaign = async (
    type,
    name,
    title,
    startTime,
    description,
    receiver,
    receipient
  ) => {
    console.log(
      type,
      name,
      title,
      startTime,
      description,
      receiver,
      receipient,
      "ff"
    );
    let response;

    let formData = new FormData();

    formData.append("Id", campaignId == "new" ? null : campaignId);
    formData.append("OrgId", "NivyWebApp");
    formData.append("VenueId", localStorage.getItem("selectedVenueId"));
    formData.append("StartDateTime", startTime);
    formData.append("CompaignName", name);
    formData.append("CampaignType", type);
    formData.append("ReceiverId", `${receipient}`);
    formData.append("Title", title);
    formData.append("Decription", description);
    formData.append("Image", notificationImage);
    formData.append("ForAllCustomers", receiver == "true" || receiver == true);
    if (receiver == "false" || receiver == false) {
      formData.append("CustomerOrganizationId", "UNA_LIONS");
    }
    if (campaignId === "new") {
      response = await campaignsApi.addNewCampaign(formData);
    } else {
      response = await campaignsApi.updateExistingCampaign(formData);
    }

    const notify = {};
    notify.severity = "error";
    notify.message = "Incorrect Credentials!";
    setNotification(notify);
    // notify(response.description, "success");

    if (response.status == 400) {
      console.log(response.errors);
      setErrors(response.errors);
    } else if (response.success) {
      navigate(-1);
    } else if (!response.success) {
      // notify(response.description, "success");
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const getCustomersList = async (inputValue) => {
    setIsLoading(true);
    let response = await campaignsApi.fetchCustomersListByOrganizationId({
      organizationId: "NivyWebApp",
      venueId: inputValue,
    });
    const reformattedArray = response.content.map((customer) => ({
      label: `${customer.firstName} ${customer.lastName}`,
      countryCode: customer.countryCode,
      mobile: customer.phone,
      value: customer.countryCode,
    }));
    setIsLoading(false);
    return reformattedArray;
  };

  const handleChangeNotification = (selectedOptions) => {
    setSelectedNotificationRecipients(selectedOptions);
  };

  let showCampaignDescription = (desc) => {
    var length = desc?.length;
    // if(desc)
    var middle = Math.round(length / 2);
    var spaceNearMiddle = desc?.indexOf(" ", middle);
    var string1 = desc?.substring(0, spaceNearMiddle);
    var string2 = desc?.substring(spaceNearMiddle + 1, length);
    return (
      <>
        {string1}
        {/* <p>{string1}</p>
        <p>{string2}</p> */}
      </>
    );
  };

  const [notificationImage, setNotificationImage] = useState();
  return (
    <Fragment>
      <div>
        <div className="Title">
          <AddUpdateTitle
            heading={
              campaignId != "new" ? "Update campaign" : "Create new campaign"
            }
            subheading="This page includes creation, updation and stats of the campaigns."
            backUrl="campaigns"
          />
        </div>
        <>
          <div className="overlay">
            {console.log({ errors })}
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
            <NewAddUpdateTitle
              heading={
                campaignId != "new" ? "Update campaign" : "Create new campaign"
              }
              subheading="This page includes creation, updation and stats of the campaigns."
              backUrl="campaigns"
            />
            <Card
              className="manage-main-card"
              style={{
                background: "#F9F9F9",
              }}
            >
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <div className="titleText"> Create New Campaigns</div>
                    <Label for="campaignName">Campaign Name</Label>
                    <Input
                      type="text"
                      name="campaignName"
                      id="campaignName"
                      placeholder="Campaign Name"
                      defaultValue={data?.state?.compaignName}
                      value={formData.campaignName}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="campaignTitle">Campaign Title</Label>
                    <Input
                      type="text"
                      name="campaignTitle"
                      id="campaignTitle"
                      placeholder="Campaign Title"
                      defaultValue={data?.state?.title}
                      value={formData.campaignTitle}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="campaignDescription">
                      Campaign Description
                    </Label>
                    {data?.state?.campaignType?.toLowerCase() != "email" && (
                      <Input
                        type="text"
                        name="campaignDescription"
                        id="campaignDescription"
                        placeholder="Campaign Description"
                        defaultValue={data?.state?.decription}
                        value={formData.campaignDescription}
                        onChange={handleChange}
                      />
                    )}
                    {data?.state?.campaignType?.toLowerCase() == "email" && (
                      <RichTextEditor
                        value={campaignDescription}
                        onChange={handleCampaignDescriptionChange}
                        name="campaignDescription"
                        placeholder="Campaign Description"
                      />
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="campaignDateTime">
                      Campaign Start Date Time
                    </Label>
                    <Input
                      type="datetime-local"
                      name="datetime"
                      id="campaignDateTime"
                      placeholder="Campaign Start Date Time"
                      defaultValue={formData.datetime}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="campaignReceiver">Campaign Receiver</Label>
                    <Input
                      type="select"
                      name="campaignReceiver"
                      id="campaignReceiver"
                      placeholder="Campaign Description"
                      onChange={handleChange}
                      defaultValue={
                        [true, undefined].includes(data?.state?.forAllCustomers)
                          ? "All Customers"
                          : "Specific customer"
                      }
                      value={formData.campaignReceiver}
                    >
                      <option value={"true"}>All Customers</option>
                      <option value={"false"}>Specific customer</option>
                    </Input>
                    {console.log(
                      data?.state?.campaignType,
                      formData.campaignReceiver,
                      "HI"
                    )}
                  </FormGroup>
                  {(!formData.campaignReceiver ||
                    formData.campaignReceiver == "false") &&
                    (data?.state?.campaignType?.toLowerCase() == "email" ||
                      data?.state?.campaignType?.toLowerCase() == "sms") && (
                      <FormGroup>
                        <Label for="campaignReceiverId">
                          {data?.state?.campaignType?.toLowerCase() ==
                          "app notification"
                            ? "Recipient Name"
                            : data?.state?.campaignType?.toLowerCase() ==
                              "email"
                            ? "Recipient Email Address"
                            : "Recipient Phone Number"}
                        </Label>
                        <Input
                          type={"text"}
                          name="campaignRecipient"
                          id="campaignReceiverId"
                          placeholder={
                            data?.state?.campaignType?.toLowerCase() ==
                            "app notification"
                              ? "Enter recipient Name"
                              : data?.state?.campaignType?.toLowerCase() ==
                                "email"
                              ? "Enter recipient Email Address"
                              : "Enter recipient Phone Number"
                          }
                          required
                          defaultValue={data?.state?.receiverId}
                          value={formData.campaignRecipient}
                          onChange={handleChange}
                        ></Input>
                        <FormText>
                          {data?.campaignType?.toLowerCase() == "email"
                            ? "Enter comma seperate email addresses if you want to receive for multiple users"
                            : "Enter comma seperate phone numbers if you want to receive for multiple users, AND countryCode is seperated by mobile number by a HYPHEN. For example, +1-3224820667"}
                        </FormText>
                      </FormGroup>
                    )}
                  {(!formData.campaignReceiver ||
                    formData.campaignReceiver == "false") &&
                    (data?.state?.campaignType?.toLowerCase() ==
                      "app notification" ||
                      data?.state?.campaignType?.toLowerCase() ==
                        "notification") && (
                      <FormGroup>
                        <Label id="campaignReceiverName">Recipient Name</Label>
                        <AsyncSelect
                          id="campaignReceiverName"
                          isMulti
                          cacheOptions
                          loadOptions={getCustomersList}
                          value={selectedNotificationRecipients}
                          onChange={handleChangeNotification}
                          defaultOptions
                          isLoading={isLoading}
                        />
                      </FormGroup>
                    )}
                  {data?.state?.campaignType?.toLowerCase() ==
                    "app notification" && (
                    <FormGroup>
                      <Label for="campaignImage">Campaign Image</Label>
                      <Input
                        type="file"
                        name="text"
                        id="campaignImage"
                        placeholder="Campaign Image"
                        value={formData.campaignImage}
                        onChange={(e) =>
                          setNotificationImage(e.currentTarget.files[0])
                        }
                      ></Input>
                    </FormGroup>
                  )}
                  {data?.state?.campaignType?.toLowerCase() ==
                    "app notification" && (
                    <>
                      <div className="">Notification Preview</div>
                      <div className="notification-preview-container">
                        <div className="notification-preview-inner-container">
                          <div className="noti-contents">
                            <div className="d-flex flex-column">
                              <span className="noti-heading">
                                {formData.campaignTitle}
                              </span>
                              <span className="noti-desc">
                                {formData.campaignDescription}
                              </span>
                            </div>
                            {notificationImage && (
                              <img
                                id="blah"
                                width={50}
                                height={50}
                                src={
                                  notificationImage
                                    ? URL?.createObjectURL(notificationImage)
                                    : ""
                                }
                              />
                            )}
                          </div>
                          <div className="noti-image"></div>
                        </div>
                        <div className="notification-preview-pill-container"></div>
                        <div className="line"></div>
                        <div className="dot"></div>
                      </div>
                    </>
                  )}

                  <Button className={"submitButton"} type="submit">
                    <span className={"submitButtonText"}>ADD</span>
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </>
      </div>
    </Fragment>
  );
};

export default ManageCampaigns;