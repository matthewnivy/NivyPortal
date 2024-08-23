import React, { Fragment, useContext, useState } from "react";
import styles from "./ImageFromUrl.module.css";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { CustomTextInput } from "../../form/CustomTextInput";
import { isImage } from "../../../utils/helpers/ImageVerify";
import infoIcon from "../../../assets/info-icon.svg";
import { Field } from "formik";
import { FormControl, MenuItem, Select } from "@mui/material";
import AuthContext from "../../../context/auth-context";
import { VendorsApi } from "../../../utils/api";

const OptionGroupStepTwo = ({
  openModal,
  changeModalScreen,
  values,
  getItemOptions,
}) => {
  const { addItemOptions, setAddItemOptions, setNotification } =
    useContext(AuthContext);
  const vendorsApi = new VendorsApi();
  // console.log(addItemOptions, "FE");
  const moveToStepTwo = async () => {
    let itemOption = addItemOptions;
    // console.log(itemOption, "itemOptions");
    // debugger
    // console.log(itemOptions?.itemOptions?.optionList, "DD");
    // console.log(values?.optionChoiceName, values?.price);
    // let x = {
    //   optionChoiceName: "",
    //   price: "",
    //   outOfStock: false,
    // };
    let arrMap = [];
    // console.log(arrMap);
    for (let i = 0; i < values?.price?.length; i++) {
      arrMap.push({
        optionChoiceName: values?.optionChoiceName[i],
        price: `${values?.price[i] ?? 0}`,
        outOfStock: false,
      });
    }
    itemOption.itemOptions[0].optionList = arrMap;
    console.log({ itemOption }, "SAD");
    const response = await vendorsApi.addProductOptions(itemOption);
    console.log(response);
    const notify = {};
    if (!response?.success) {
      notify.severity = "error";
      notify.message = response?.description ? response?.description : "Error";
    } else {
      notify.severity = "success";
      notify.message = response?.content ? response?.content : "Success";
      // getItemOptions();
      openModal(false);
    }
    setNotification(notify);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
    setAddItemOptions(itemOption);
    // console.log(itemOptions, "<<<<");
    // setAddItemOptions()
    // arrMap.push({});
    // arrMap.map(arr => ({}))
    // changeModalScreen("optionGroupTwo");
  };
  const [optionChoices, setOptionChoices] = useState(["a"]);
  const addOptionList = () => {
    setOptionChoices([...optionChoices, "a"]);
  };
  return (
    <Fragment>
      <div className={styles.customModal}>
        <div className="mt-4">
          Should the user be allowed to select multiple options or just a single
          one? <img src={infoIcon} width={30} height={30} />
        </div>
        <Field
          name="optionSelections"
          render={({ field, form }) => (
            <div>
              <Label
                style={{
                  color: "#3C3C3C",
                }}
              ></Label>
              <FormControl fullWidth>
                <Select
                  sx={{ background: "white", my: 4 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values?.optionSelections}
                  displayEmpty
                  onChange={(e) => {
                    form.setFieldValue("optionSelections", e.target.value);
                  }}
                >
                  <MenuItem value={"single"}>Single</MenuItem>
                  <MenuItem value={"multiple"}>Multiple</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        />
        {optionChoices.map((optionChoice, key) => (
          <Row>
            <Col md={6}>
              {key == 0 && (
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  Name
                </div>
              )}
              <CustomTextInput
                label=""
                name={`optionChoiceName.${key}`}
                type="text"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                required
              />
            </Col>
            <Col md={6}>
              {key == 0 && (
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  Additional Cost
                </div>
              )}
              <CustomTextInput
                label=""
                name={`price.${key}`}
                type="number"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                required
              />
            </Col>
          </Row>
        ))}

        <div className="d-flex w-100">
          <Button
            className={`${styles.submitButton} ${styles.success} rounded`}
            onClick={addOptionList}
          >
            <span className={styles.submitButtonText}>+Add option</span>
          </Button>
        </div>
        <div className="d-flex align-items-end justify-content-end w-100">
          <Button className={styles.submitButton} onClick={moveToStepTwo}>
            <span className={styles.submitButtonText}>Next</span>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default OptionGroupStepTwo;
