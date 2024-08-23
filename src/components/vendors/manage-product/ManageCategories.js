import React from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import infoIcon from "../../../assets/info-icon.svg";

const ManageCategories = ({
  modal,
  toggle,
  manageCategoryHandler,
  previousCategoryName,
}) => {
  console.log(previousCategoryName, "manage categories");
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      backdrop={"static"}
      className="d-flex flex-row justify-content-center align-items-center"
    >
      <ModalHeader toggle={toggle}>New Option Group</ModalHeader>
      <ModalBody>
        What would you like to name this option group? <img src={infoIcon} />
        <Form onSubmit={manageCategoryHandler}>
          <FormGroup>
            <div class="form-floating mt-3">
              <Input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                defaultValue={previousCategoryName}
              />
              <Label for="floatingPassword">
                What would you like to name this option group?
              </Label>
            </div>
          </FormGroup>
          Do you want the user to be able to select one or multiple options?{" "}
          <img src={infoIcon} />
          <FormGroup>
            <div class="form-floating mt-3">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option>Single</option>
                <option>Multiple</option>
              </select>
              <label for="floatingSelect">
                <span className="d-inline">
                  Do you want the user to be able to select one or multiple
                  options?{" "}
                </span>
              </label>
            </div>
            <div className="d-flex align-items-center justify-content-center"></div>
          </FormGroup>
          <div style={{ float: "right" }}>
            {/* <Link
                to={{
                  pathname: `${data.pathname}/category/1`,
                  campaignType: campaignType,
                }}
              > */}
            <Button color="primary" type="submit">
              SUBMIT
            </Button>
            {/* </Link> */}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ManageCategories;
