import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import AddUpdateTitle from "../components/common/add-update-title/AddUpdateTitle";
import { ContestsApi } from "../utils/api";
import NewAddUpdateTitle from "../components/common/add-update-title/NewAddUpdateTitle";
// import { addNewReward, getOrganizationVendors } from "../../utils/ApiHandler";
// import { notify } from "../../utils/Notification";

const ManageContests = () => {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [answers, setAnswers] = useState([]);
  const contestsApi = new ContestsApi();

  const toggle = () => {
    setModal(!modal);
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  const validator = (
    name,
    type,
    unit,
    amount,
    cost,
    desc,
    instructions,
    couponVendors,
    image
  ) => {
    // if (name == "") {
    //   notify("Please enter name of the rewards to continue", "warning");
    // }
    // if (type == "") {
    //   notify("Please enter reward type to continue", "warning");
    // }
    // if (unit == "") {
    //   notify("Please enter reward unit to continue", "warning");
    // }
    // if (amount == "") {
    //   notify("Please enter reward amount to continue", "warning");
    // }
    // if (cost == "") {
    //   notify("Please enter reward cost to continue", "warning");
    // }
    // if (desc == "") {
    //   notify("Please enter reward description to continue", "warning");
    // }
    // if (instructions == "") {
    //   notify("Please enter reward instructions to continue", "warning");
    // }
    // if (couponVendors == "") {
    //   notify("Please enter coupon rewards to continue", "warning");
    // }
    // if (image == "") {
    //   notify("Please add coupon rewards to continue", "warning");
    // }

    if (
      name != "" &&
      type != "" &&
      unit != "" &&
      amount != "" &&
      cost != "" &&
      desc != "" &&
      instructions != "" &&
      couponVendors != ""
    ) {
      return true;
    }
    return false;
  };

  const addReward = async (formData) => {
    console.log(formData);
    // const response = await addNewReward(formData);
    // console.log(response);
    // if (response.success) {
    //   toggle();
    //   notify(response.content, "success");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    const formData = new FormData();
    const name = e.target[0].value;
    const type = e.target[1].value;
    const unit = e.target[2].value;
    const amount = e.target[3].value;
    const cost = e.target[4].value;
    const desc = e.target[5].value;
    const instructions = e.target[6].value;
    // const couponVendors = e.target[7].value;
    const image = e.target[8].files[0];

    if (
      validator(
        name,
        type,
        unit,
        amount,
        cost,
        desc,
        instructions,
        couponVendors,
        image
      )
    ) {
      formData.append("RewardId", null);
      formData.append("RewardName", name);
      formData.append("VenueId", localStorage.getItem("selectedVenueId"));

      formData.append("RewardType", type);
      formData.append("RewardCouponAmmount", amount);
      formData.append("RewardCouponAmmountUnit", unit);
      formData.append("RewardCost", cost);
      formData.append("RewardDescription", desc);
      formData.append("RewardRedeemInstructions", instructions);

      let uniqueChars = [];
      couponVendors
        .map((vendor) => vendor.id)
        .forEach((element) => {
          if (!uniqueChars.includes(element)) {
            uniqueChars.push(element);
          }
        });

      formData.append("RewardCouponVendors", uniqueChars);

      formData.append(
        "Image",
        e.target[8].files[0],
        e.target[8].files[0]?.name ?? null
      );

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      addReward(formData);
    }
  };

  useEffect(() => {
    getOrganizationVendorsHandler(localStorage.getItem("selectedVenueId"));
  }, []);

  const getOrganizationVendorsHandler = async (venueId) => {
    const response = await contestsApi.getOrganizationVendors(venueId);

    if (response.success) {
      setVendors(response.content);
    }
  };

  const [couponVendors, setCouponVendors] = useState([]);
  const checkboxHandler = (val, index) => {
    console.log(val, index);
    setCouponVendors([...couponVendors, val]);
  };

  const addAnswerList = () => {
    setAnswers([...answers, "a"]);
  };

  const [possibleAnswers, setPossibleAnswers] = useState(["a"]);
  const onChangeHandler = (e) => {
    let ans = {};
    // let name = e.target.name;
    // let value = e.target.value;

    ans = { [e.target.name]: e.target.value };

    console.log(ans);
  };
  const subtractAnswerList = () => {
    const ans = answers;
    ans.pop();
    setAnswers([...ans]);
  };

  return (
    <Fragment>
      <div className="Title">
        <AddUpdateTitle
          heading={"Create New Contest"}
          subheading="This page includes creation, updation and stats of the campaigns."
          backUrl="contests"
        />
      </div>

      <div className="overlay">
        <div className="toggleDisplay">
          <NewAddUpdateTitle heading="Create New Contest" backUrl="contests" />
        </div>
        <Card
          className="manage-main-card mx-auto"
          style={{
            background: "#F9F9F9",
          }}
        >
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="contestName">Contest Name</Label>
                <Input
                  type="text"
                  name="text"
                  id="contestName"
                  placeholder="Contest Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="contestStartDateTime">Start Date Time</Label>
                <Input
                  type="datetime-local"
                  name="text"
                  id="contestStartDateTime"
                  placeholder=""
                >
                  {/* <option>Coupon</option>
              <option>Other</option> */}
                </Input>
              </FormGroup>
              {/* <Row>
            <Col md={2}> */}
              <FormGroup>
                <Label for="contestEndDateTime">End Date Time</Label>
                <Input
                  type="datetime-local"
                  name="text"
                  id="contestEndDateTime"
                  placeholder="$ | € | ¥"
                >
                  {/* <option>$</option>
                  <option>€</option>
                  <option>¥</option> */}
                </Input>
              </FormGroup>
              {/* </Col>
            <Col md={10}> */}
              <FormGroup>
                <Label for="contestQuestion">Contest Question</Label>
                <Input
                  type="number"
                  name="text"
                  id="contestQuestion"
                  placeholder="Enter Question"
                ></Input>
              </FormGroup>

              {/* <FormGroup> */}
              <Label for="bContestBasedOnFutureResult">
                Contest Based on future result
              </Label>
              <Input
                type="select"
                name="text"
                id="bContestBasedOnFutureResult"
                placeholder="$ | € | ¥"
              >
                <option>Yes</option>
                <option>No</option>
              </Input>
              {/* <Button className="text-center">hello</Button> */}
              <Row className="text-center my-3">
                <Col md="12">
                  {" "}
                  <Button
                    color="success"
                    style={{ backgroundColor: "#157347" }}
                    onClick={addAnswerList}
                  >
                    Add Possible Contest Answers
                  </Button>
                </Col>
              </Row>
              {answers.map((node, key) => (
                <Row>
                  <Col md="8">
                    <FormGroup>
                      <Label for="contestPossibleAnswersName">
                        Contest Answer {key + 1}
                      </Label>
                      <Input
                        type="text"
                        name="contestPossibleAnswersName"
                        required
                        id="contestPossibleAnswersName"
                        placeholder={`Contest Answer ${key + 1}`}
                        onBlur={onChangeHandler}
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="contestPossibleAnswersPoints">
                        Reward Points {key + 1}
                      </Label>
                      <Input
                        type="number"
                        name="contestPossibleAnswersPoints"
                        id="contestPossibleAnswersPoints"
                        onBlur={onChangeHandler}
                        required
                        min={0}
                        placeholder={`Reward Points ${key + 1}`}
                        invalid={false}
                      ></Input>
                      <FormFeedback>
                        Oh noes! that name is already taken
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
              ))}
              {answers.length > 1 && (
                <Row className="text-center mb-3">
                  <Col md="12">
                    {" "}
                    <Button
                      color="danger"
                      style={{ backgroundColor: "#dc3545" }}
                      onClick={subtractAnswerList}
                    >
                      Subtract Possible Contest Answers
                    </Button>
                  </Col>
                </Row>
              )}

              <FormGroup>
                <Label for="contestAnswer">Contest Answer</Label>
                <Input
                  type="text"
                  name="text"
                  id="contestAnswer"
                  placeholder="Add Contest Answer"
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label for="contestAnswer">Contest Answer</Label>
                <Input
                  type="text"
                  name="text"
                  id="contestAnswer"
                  placeholder="Add Contest Answer"
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label for="rewardCost">Status</Label>
                <Input
                  type="number"
                  name="text"
                  id="rewardCost"
                  placeholder="Reward Cost (Coins)"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="rewardDescription">Reward Description</Label>
                <Input
                  type="text"
                  name="text"
                  id="rewardDescription"
                  placeholder="Reward Description"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="rewardInstruction">Reward Instructions</Label>
                <Input
                  type="text"
                  name="text"
                  id="rewardInstruction"
                  placeholder="Reward Instruction"
                ></Input>
              </FormGroup>

              {/* <Label for="rewardCouponVendors">Reward Coupon Vendors</Label> */}
              {/* <Input
              type="text"
              name="text"
              id="rewardCouponVendors"
              placeholder="Reward Coupon Vendors"
            ></Input> */}

              <div>
                {/* <Button className="ml-auto" color="link" onClick={toggle}>
                Cancel
              </Button> */}
                <Button color="primary" className="Addbutton" type="submit">
                  SUBMIT
                </Button>{" "}
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};

export default ManageContests;