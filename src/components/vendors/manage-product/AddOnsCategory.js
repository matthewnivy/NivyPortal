import React, { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import marker from "../../../assets/marker.svg";
// import infoIcon from "../../../assets/info-icon.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowsUpToLine,
//   faArrowUpLong,
//   faTrashCan,
// } from "@fortawesome/free-solid-svg-icons";
// import { notify } from "../../../../utils/Notification";
import Loader from "react-loaders";
import AddOn from "./AddOn";
import ManageItemsInACategory from "./ManageItemsInACategory";
import { VendorsApi } from "../../../utils/api";
import { useQuery } from "react-query";
// import { MyCheckbox, MyTextInput } from "../../../common/TextInput";

const AddOnsCategory = ({
  setModal,
  setModalScreen,
  categories,
  vendorId,
  fetchCategoriesData,
  editCategoryHandler,
  values,
}) => {
  const [open, setOpen] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getItemOptions();
  }, []);

  const vendorsApi = new VendorsApi();
  const getItemOptions = async () => {
    const response = await vendorsApi.fetchListStockItemOptions({
      ItemName: values?.name,
      OrgId: "NivyWebApp",
      venueId: localStorage.getItem("selectedVenueId"),
      vendorId: vendorId,
    });
    return response;
  };
  const { data, status } = useQuery("itemOption", getItemOptions);
  console.log(data, status, "HELLP");

  const fetchCategoryItemsGroupByCategory = async (categoryName) => {
    setIsLoading(true);
    setCategoryItems([]);
    let response = [];
    //   await getCategoryItems(
    //     localStorage.getItem("selectedVenueId"),
    //     vendorId,
    //     categoryName
    //   );
    if (response.success) {
      setCategoryItems(response.content);
    }
    setIsLoading(false);
  };

  const toggleAccordian = (id) => {
    let selectedCategory = categories.find((category, key) => id == key);
    console.log(id, selectedCategory);
    setSelectedCategory(selectedCategory?.name);
    if (open === id) {
      setOpen();
    } else {
      fetchCategoryItemsGroupByCategory(selectedCategory?.name);
      setOpen(id);
    }
  };

  const deleteCat = async (categoryName) => {
    let response = [];
    //    await deleteCategory(
    //     localStorage.getItem("selectedVenueId"),
    //     vendorId,
    //     categoryName
    //   );
    if (response.success) {
      // notify(`${categoryName} Deleted Successfully`, "success");
      fetchCategoriesData();
      toggleAccordian();
    }
  };
  const deleteCategoryHandler = (category) => {
    deleteCat(category.name);
  };

  const [itemCategoryModal, setItemCategoryModal] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  const toggleCategoryItemModal = (itemDetails = null) => {
    setItemCategoryModal(!itemCategoryModal);
    console.log(itemDetails, "TOGGLE BUTTON");

    setItemDetails(itemDetails);

    if (!itemDetails?.images) {
      setItemDetails({ images: [] });
    }
  };

  const openOptionGroupModal = () => {
    setModal(true);
    setModalScreen("optionGroupOne");
  };

  return (
    <Fragment>
      <legend className="col-form-label mt-2 fs-1 d-flex align-items-center">
        <div
          style={{
            minWidth: "max-content",
          }}
        >
          Option Groups
        </div>
        <div
          className="d-flex"
          style={{
            justifyContent: "flex-end",
            width: "-webkit-fill-available",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={openOptionGroupModal}
        >
          <div
            className="customized-buttons px-4"
            id="edit-vendor"
            style={{ minWidth: "max-content" }}
          >
            + Add option group to this item
          </div>
        </div>
      </legend>

      <div>
        <Accordion open={open} toggle={toggleAccordian}>
          {status == "success" &&
            data?.content?.itemOptions?.map((itemOption, key) => (
              <AccordionItem>
                <AccordionHeader targetId={key}>
                  {" "}
                  {itemOption?.optionName}
                </AccordionHeader>
                {console.log(itemOption, "D")}
                <AccordionBody accordionId={key}>
                  {!isLoading && (
                    <div
                      className="customized-buttons px-4"
                      id="edit-vendor"
                      style={{ minWidth: "max-content", cursor: "pointer" }}
                      onClick={toggleCategoryItemModal}
                    >
                      + Add new item
                    </div>
                  )}
                  <div className="d-flex flex-wrap space-x-4">
                    {isLoading ? (
                      <Loader
                        type="ball-scale-ripple"
                        innerClassName="d-flex flex-row align-items-center justify-content-center"
                        active="true"
                      />
                    ) : (
                      itemOption?.optionList?.map((item, key) => (
                        <AddOn
                          itemName={item.itemName}
                          vendorId={vendorId}
                          fetchCategoryItemsGroupByCategory={
                            fetchCategoryItemsGroupByCategory
                          }
                          category={itemOption}
                          toggleCategoryItemModal={toggleCategoryItemModal}
                          item={item}
                        />
                      ))
                    )}
                  </div>
                  <div className="d-flex my-4 py-4 align-items-center justify-content-around border bg-red">
                    <div
                      className="customized-buttons px-4 bg-success"
                      id="edit-vendor"
                      style={{ minWidth: "max-content", cursor: "pointer" }}
                      onClick={() => editCategoryHandler(itemOption)}
                    >
                      <img src={marker} />
                      <pre>{"  "}</pre>
                      Edit Option Group
                    </div>
                    <div
                      className="customized-buttons px-4 bg-danger"
                      id="edit-vendor"
                      style={{ minWidth: "max-content", cursor: "pointer" }}
                      onClick={() => deleteCategoryHandler(itemOption)}
                    >
                      {/* <FontAwesomeIcon icon={faTrashCan} color="white" /> */}
                      <pre>{"  "}</pre>
                      Delete Option Group
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
      <ManageItemsInACategory
        toggleCategoryItemModal={toggleCategoryItemModal}
        itemCategoryModal={itemCategoryModal}
        selectedCategory={selectedCategory}
        vendorId={vendorId}
        fetchCategoryItemsGroupByCategory={fetchCategoryItemsGroupByCategory}
        itemDetails={itemDetails}
        // setItemDetails={setItemDetails}
      />
    </Fragment>
  );
};

export default AddOnsCategory;
