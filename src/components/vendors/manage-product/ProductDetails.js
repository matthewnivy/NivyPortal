import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Label, Row } from "reactstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NorthIcon from "@mui/icons-material/North";
import "./ManageProduct.css";
import { FormControl, MenuItem, Select, Skeleton, Stack } from "@mui/material";
import { CustomTextInput } from "../../form/CustomTextInput";
import { VendorsApi } from "../../../utils/api";
import AuthContext from "../../../context/auth-context";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import crossIcon from "../../../assets/cross-icon.svg";
import Modal from "../../common/custom-modal/Modal";

const ProductDetails = ({
  setModal,
  setModalScreen,
  values,
  additionalImages,
  setAdditionalImages,
}) => {
  const vendorsApi = new VendorsApi();
  const { vendorId } = useParams();
  const authCtx = useContext(AuthContext);
  const getVendorCategories = async () =>
    await vendorsApi.fetchVendorCategoriesWithDetails({
      venueId: authCtx.selectedVenueId,
      vendorId: vendorId,
    });

  const { data, status } = useQuery("categories", getVendorCategories);
  const initialValues = [];

  const handleRemove = (imageName) => {
    console.log(imageName, additionalImages);
    if (additionalImages.length == 1) {
      setAdditionalImages([]);
    }
    if (values?.imgURL == imageName) {
      values.imgURL = "";
    }
    setAdditionalImages((additionalImages) =>
      additionalImages.filter((img) => img != imageName)
    );
  };

  const openImageFromURLModal = () => {
    setModal(true);
    setModalScreen("imageFromUrl");
  };
  return (
    <Fragment>
      {status == "loading" && (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rectangular" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rectangular" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
          <Skeleton variant="rectangular" width={"auto"} height={47} />
          <Skeleton variant="rounded" width={"auto"} height={47} />
        </Stack>
      )}
      {status == "success" && (
        <Fragment>
          <Row className="mb-3">
            <Field
              name="categoryType"
              render={({ field, form }) => (
                <div>
                  <Label
                    style={{
                      color: "#3C3C3C",
                    }}
                  >
                    Select Category <span className="text-danger">*</span>
                  </Label>
                  <FormControl fullWidth>
                    <Select
                      sx={{ background: "white" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder="Select Category"
                      value={values?.categoryType}
                      displayEmpty
                      onChange={(e) => {
                        form.setFieldValue("categoryType", e.target.value);
                      }}
                    >
                      {data?.content?.map((category) => (
                        <MenuItem value={category?.category}>
                          {category?.category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            />
          </Row>
          <Row className="mb-3">
            <Col md="6">
              <CustomTextInput
                label="Product Name"
                name="name"
                type="text"
                placeholder=""
                require
              />
            </Col>

            <Col md="6">
              <CustomTextInput
                label="Price"
                name="price"
                type="number"
                min="1"
                require
              />
            </Col>
          </Row>

          <Field
            name="description"
            render={({ field, form }) => (
              <div class=" mb-3">
                <Label
                  style={{
                    color: "#3C3C3C",
                  }}
                >
                  Description <span className="text-danger">*</span>
                </Label>
                <textarea
                  className="form-control gainsboro"
                  placeholder="Description"
                  id="floatingTextarea"
                  style={{ height: 232 }}
                  onChange={(e) => {
                    form.setFieldValue("description", e.currentTarget.value);
                  }}
                ></textarea>
              </div>
            )}
          />

          <CustomTextInput
            label="Tax Rate (%)"
            name="taxRate"
            type="number"
            min="1"
            require
          />

          <div className="d-flex justify-content-between">
            <Field
              name="galleryImages"
              render={({ field, form }) => (
                <div
                  id="homeImgContainer"
                  className="d-flex justify-content-center align-items-center uploadImageContainer"
                  style={{
                    display: initialValues?.state?.events?.homeTeamImage
                      ? "flex"
                      : "inline",
                    justifyContent: "center",
                  }}
                >
                  <label for="fileUpload" className="">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex align-items-center justify-content-center uploadIcon">
                        <NorthIcon
                          fontSize="small"
                          style={{
                            color: "#3C3C3C",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft: 12,
                          color: "#3C3C3C",
                        }}
                      >
                        From gallery
                      </div>
                    </div>
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    multiple
                    hidden
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      const [file] = e.target.files;
                      if (file) {
                        for (let i = 0; i < e.target.files.length; i++) {
                          const file = e.target.files[i];
                          setAdditionalImages((additionalImages) => [
                            ...additionalImages,
                            file,
                          ]);
                        }
                      }
                      form.setFieldValue(
                        "galleryImages",
                        e.currentTarget.files
                      );
                    }}
                  />
                </div>
              )}
            />
            {!values?.imgURL?.includes("https://") && (
              <div
                className="d-flex justify-content-center align-items-center uploadImageContainer"
                onClick={openImageFromURLModal}
                style={{
                  color: "#3C3C3C",
                }}
              >
                From URL
              </div>
            )}
          </div>

          <div className="d-flex gap-4 mt-4">
            {additionalImages.map((imageName) => (
              <div className="productImageContainer">
                <img
                  src={crossIcon}
                  className="crossIcon"
                  onClick={() => handleRemove(imageName)}
                />
                <div className="center">
                  <img
                    src={
                      imageName instanceof File
                        ? URL.createObjectURL(imageName)
                        : imageName
                    }
                    alt={imageName}
                    width={"100"}
                    height={"66"}
                  />
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
