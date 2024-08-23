import React, {
  Fragment,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { Card, CardBody, Container, Row } from "reactstrap";
import { useLocation, useParams } from "react-router";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { MultiStepForm, Step } from "react-multi-form";
import SwapStepButtons from "../components/vendors/manage-product/SwapStepButtons";
import AddUpdateTitle from "../components/common/add-update-title/AddUpdateTitle";
import ProductDetails from "../components/vendors/manage-product/ProductDetails";
import ManageCategories from "../components/vendors/manage-product/ManageCategories";
import Modal from "../components/common/custom-modal/Modal";
import { VendorsApi } from "../utils/api";
import AuthContext from "../context/auth-context";
// import { MyCheckbox, MyTextInput } from "../../../common/TextInput";
const AddOnsCategory = React.lazy(() =>
  import("../components/vendors/manage-product/AddOnsCategory")
);
const ManageVendorProducts = () => {
  let { vendorId, productId } = useParams();
  let data = useLocation();
  const vendorsApi = new VendorsApi();
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [modalScreen, setModalScreen] = useState("imageFromUrl");
  const authCtx = useContext(AuthContext);

  const toggle = () => {
    setModal(!modal);
  };

  const stepUp = (values) => {
    manageItem(values);
    // if (step != 2) {
    //   setStep((step) => step + 1);
    // }
  };
  const stepDown = () => {
    if (step != 1) {
      setStep((step) => step - 1);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const manageItem = async (values) => {
    const formData = new FormData();
    formData.append("VendorId", vendorId);
    formData.append("Price", values.price);
    formData.append("VenueId", localStorage.getItem("selectedVenueId"));
    formData.append("Name", values.name);
    formData.append("TaxRate", values.taxRate);
    formData.append("NewImages", values.galleryImages);
    additionalImages?.map((image) => formData.append("NewImages", image));
    formData.append("Description", values.description);
    formData.append("Category", values.categoryType);
    formData.append("OrgId", "NivyWebApp");
    const response = await vendorsApi.addNewProduct(formData);
    const notify = {};
    if (response.success) {
      const addItemOption = authCtx.addItemOptions;
      addItemOption["name"] = values.name;
      authCtx.setAddItemOptions(addItemOption);
      setStep((step) => step + 1);
    } else {
      notify.severity = "error";
      notify.message = response?.description
        ? response?.description
        : "Validation Error";
      authCtx.setNotification(notify);
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  };
  const fetchCategoriesData = async () => {
    let response = [];
    // await getVendorCategories(
    //   localStorage.getItem("selectedVenueId"),
    //   vendorId
    // );
    // setCategories(response.content);
  };

  const manageCategory = async (categoryName, previousCategoryName) => {
    // console.log(categoryName, previousCategoryName);
    let response;
    if (previousCategoryName == "") {
      response = [];
      // await addNewCategory(
      //   localStorage.getItem("selectedVenueId"),
      //   vendorId,
      //   categoryName
      // );
    } else {
      response = [];
      // await editCategory(
      //   localStorage.getItem("selectedVenueId"),
      //   vendorId,
      //   categoryName,
      //   previousCategoryName
      // );
    }
    if (response.success) {
      setModal(false);
      setPerviousCategoryName("");
      // notify(response.content, "success");
      fetchCategoriesData();
    } else {
      // notify(response.content, "error");
    }
  };

  const manageCategoryHandler = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value, previousCategoryName, "MANAGE HANDLER");
    const categoryName = e.target[0].value;
    manageCategory(categoryName, previousCategoryName);
  };

  const [previousCategoryName, setPerviousCategoryName] = useState("");

  const editCategoryHandler = (category) => {
    // console.log(category);
    setPerviousCategoryName(category.name);
    toggle();
  };
  return (
    <Fragment>
      <Formik
        initialValues={{
          categoryType: "",
          name: "",
          price: 0,
          description: "",
          taxRate: 1,
          galleryImages: [],
          imgURL: "",
        }}
        validationSchema={Yup.object({
          categoryType: Yup.string().required("Required"),
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          price: Yup.number().min(1).required("Required"),
          description: Yup.string().required("Required"),
          taxRate: Yup.number().min(1).required("Required"),
          galleryImages: Yup.array().required("Required"),
          imgURL: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            // console.log(values, "SUBMISSION");
            debugger;
            // manageUsers(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <FormikForm>
            <div>
              <AddUpdateTitle
                heading={
                  productId != "new"
                    ? "Update Existing Product"
                    : "Add New Product"
                }
                subheading="This page includes creation, updation and stats of the campaigns."
                icon="pe-7s-graph icon-gradient bg-ripe-malin"
              />
              <>
                <Card>
                  <CardBody
                    style={{
                      width: "80%",
                      margin: "auto",
                    }}
                  >
                    <div className="pt-4">
                      <MultiStepForm activeStep={step} accentColor={"#16227f"}>
                        <Step
                          label="Details"
                          style={{
                            marginTop: 98,
                            marginBottom: 98,
                          }}
                        >
                          <ProductDetails
                            setModal={setModal}
                            setModalScreen={setModalScreen}
                            values={values}
                            additionalImages={additionalImages}
                            setAdditionalImages={setAdditionalImages}
                          />
                        </Step>
                        <Step
                          label="Add Ons"
                          style={{
                            marginTop: 98,
                            marginBottom: 98,
                          }}
                        >
                          <Suspense fallback={<div>Loading</div>}>
                            <AddOnsCategory
                              // toggle={toggle}
                              setModal={setModal}
                              setModalScreen={setModalScreen}
                              categories={categories}
                              vendorId={vendorId}
                              fetchCategoriesData={fetchCategoriesData}
                              editCategoryHandler={editCategoryHandler}
                              values={values}
                            />
                          </Suspense>
                        </Step>
                      </MultiStepForm>
                    </div>
                    <SwapStepButtons
                      step={step}
                      stepDown={stepDown}
                      stepUp={() => stepUp(values)}
                    />
                  </CardBody>
                </Card>
              </>
            </div>
            {/* <ManageCategories
              modal={modal}
              toggle={toggle}
              manageCategoryHandler={manageCategoryHandler}
              previousCategoryName={previousCategoryName}
            /> */}
            {modal && (
              <Modal
                openModal={setModal}
                changeModalScreen={setModalScreen}
                modalScreen={modalScreen}
                setAdditionalImages={setAdditionalImages}
                values={values}
              />
            )}
          </FormikForm>
        )}
      </Formik>
    </Fragment>
  );
};

export default ManageVendorProducts;