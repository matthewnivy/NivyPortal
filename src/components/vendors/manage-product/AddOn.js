import React, { Fragment, useEffect, useState } from "react";

import marker from "../../../assets/marker.svg";

const AddOn = ({
  itemName,
  vendorId,
  fetchCategoryItemsGroupByCategory,
  category,
  toggleCategoryItemModal,
  item,
}) => {
  const [itemDetails, setItemDetails] = useState("");

  useEffect(() => {
    getItemDetailsHandler();
  }, []);

  const getItemDetailsHandler = async () => {
    const response = [];
    //   await getItemDetails(
    //     localStorage.getItem("selectedVenueId"),
    //     vendorId,
    //     itemName
    //   );
    if (response.success) {
      setItemDetails(response.content);
    }
  };

  const deleteItemHandler = async (itemName) => {
    const response = [];
    //   await deleteItem(
    //     localStorage.getItem("selectedVenueId"),
    //     vendorId,
    //     itemName
    //   );
    console.log(response);
    if (response.success) {
      // notify(response.content, "success");
      fetchCategoryItemsGroupByCategory(category);
    }
  };

  const updateItemHandler = (itemDetails) => {
    toggleCategoryItemModal(itemDetails);
  };

  return (
    <div
      className="ms-4 mt-4"
      style={{
        width: 211,
        height: 108,
        background: "#FDFDFD",
        border: "1px solid #DBDBDB",
        borderRadius: 10,
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "70%",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          {item?.optionChoiceName}
        </span>
        {/* <span>Description: {itemDetails.description}</span> */}
        <span>Price: $ {item?.price}</span>
      </div>
      <div className="d-flex flex-column">
        <button
          style={{
            width: 36,
            height: 36,
            background: "#16227F",
            borderRadius: "50%",
            right: 4,
            top: 4,
            position: "relative",
          }}
          onClick={() => updateItemHandler(itemDetails)}
        >
          <img src={marker} />
        </button>
        {/* <button
            style={{
              width: 36,
              height: 36,
              background: "#4e4d4e",
              borderRadius: "50%",
              right: 4,
              top: 4,
              position: "relative",
            }}
            onClick={() => deleteItemHandler(itemName)}
          >
          </button> */}
      </div>
    </div>
  );
};

export default AddOn;
