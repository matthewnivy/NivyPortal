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
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CustomTextInput } from "../../form/CustomTextInput";

const ManageItemsInACategory = ({
    itemCategoryModal,
    toggleCategoryItemModal,
    selectedCategory,
    vendorId,
    fetchCategoryItemsGroupByCategory,
    itemDetails,
    // setItemDetails
  }) => {
    console.log("itemDetails >>>>", itemDetails);
  
    const manageItemsInCategory = (data) => {
      const formData = new FormData();
  
      console.log(itemDetails.images.length,itemDetails.images === [],'dds');
  
      if (itemDetails.images.length != 0)
        formData.append("PreviousItemName", itemDetails?.name);
      formData.append((itemDetails.images.length == 0) ?  "Name": "ItemName" , data?.productName);
      formData.append("Category", selectedCategory);
      formData.append("Price", data?.price);
      formData.append("Description", data?.description);
      formData.append("TaxRate", data?.taxRate);
      formData.append("NewImages", data?.image);
      formData.append("OrgId", "NivyWebApp");
      formData.append("VenueId", localStorage.getItem("selectedVenueId") ?? "");
      formData.append("VendorId", vendorId);
  
      // formData.append("ItemOptions", null);
  
      manageItemInACategory(formData, itemDetails?.name);
    };
  
    const manageItemInACategory = async (
      formData,
      previousCategoryName = null
    ) => {
      let response;
  
      if (previousCategoryName) {
        response = [];
        // await editItemDetails(formData);
      } else {
        response = [];
        // await addNewItemInACategory(formData);
      }
      console.log(response);
      if (response.success) {
        // notify(response.content, "success");
        fetchCategoryItemsGroupByCategory(selectedCategory);
        toggleCategoryItemModal();
      } else {
        console.log(response.errors);
        // notify(response.description, "success");
        // setErrors(response.errors);
      }
    };
    return (
      <Modal
        isOpen={itemCategoryModal}
        toggle={toggleCategoryItemModal}
        backdrop={"static"}
        className="d-flex flex-row justify-content-center align-items-center"
      >
        <ModalHeader toggle={toggleCategoryItemModal}>
          Add Item in category
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              productName: itemDetails?.name ?? "",
              price: itemDetails?.price ?? "",
              description: itemDetails?.description ?? "",
              taxRate: itemDetails?.taxRate ?? "",
              image: itemDetails?.images[0] ?? "",
            }}
            validationSchema={Yup.object({
              productName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              price: Yup.number().min(0).required("Required"),
              description: Yup.string()
                .max(20, "Must be 10 characters or less")
                .required("Required"),
              taxRate: Yup.number().min(0).max(99).required("Required"),
              image: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values, "SUBMISSION");
                manageItemsInCategory(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <FormikForm>
                <CustomTextInput
                  label="Product Name"
                  name="productName"
                  type="text"
                  placeholder="Enter product name"
                  required
                  require
                />
  
                <CustomTextInput
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="Enter Price"
                  min={1}
                  required
                  require
                />
  
                <CustomTextInput
                  label="Product Description"
                  name="description"
                  type="text"
                  placeholder="Enter Product Description"
                  required
                  require
                />
  
                <CustomTextInput
                  label="Tax Rate (%)"
                  name="taxRate"
                  type="number"
                  placeholder="Enter Tax Rate"
                  required
                  require
                />
  
                <legend className="col-form-label">
                  Product Image: <span className="text-danger">*</span>
                </legend>
  
                <Field
                  name="image"
                  render={({ field, form }) => (
                    <div>
                      {/* <img src={field.value} alt="uploaded image" /> */}
                      <Input
                        type="file"
                        onChange={(e) => {
                          form.setFieldValue("image", e.currentTarget.files[0]);
                        }}
                      />
                    </div>
                  )}
                />
                {values.image == 0 && touched.image && (
                  <div className="error">{errors.image}</div>
                )}
                <br></br>
                {itemDetails?.images[0] && (
                  <img height={200} src={itemDetails?.images[0]} />
                )}
                <br></br>
  
                <div style={{ float: "right" }} className="my-3">
                  <Button color="primary" type="submit">
                    SUBMIT
                  </Button>{" "}
                </div>
              </FormikForm>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    );
  };
export default ManageItemsInACategory