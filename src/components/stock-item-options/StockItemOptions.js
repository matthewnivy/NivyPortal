import React, { Fragment, useContext, useState } from "react";
import "./StockItemOptions.css";
import { VendorsApi } from "../../utils/api";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/auth-context";
const StockItemOptions = ({ optionList, itemOption, item }) => {
  const [optionOutOfStock, setOptionOutOfStock] = useState();
  const authCtx = useContext(AuthContext);
  const vendorsApi = new VendorsApi();
  const { vendorId } = useParams();

  const toggleOptionOutOfStock = async (i) => {
    let markOutOfStock;
    if (optionOutOfStock == undefined) {
      markOutOfStock = i?.outofStock == "True" ? false : true;
    } else {
      markOutOfStock = !optionOutOfStock;
    }
    const response = await vendorsApi.markOptionItemOutStock({
      venueId: authCtx.selectedVenueId,
      vendorId: vendorId,
      itemName: item?.name,
      isOutStock: markOutOfStock,
      optionName: itemOption.optionName,
      addOnItem: i?.optionChoiceName,
    });
    const notify = {};
    if (response.success) {
      notify.severity = "success";
      notify.message = markOutOfStock
        ? `${i?.optionChoiceName} marked Out Of Stock Successfully!`
        : `${i?.optionChoiceName} marked In Stock Successfully!`;
      setOptionOutOfStock(markOutOfStock);
    } else {
      notify.severity = "error";
      notify.message = "Error!";
    }
    authCtx.setNotification(notify);
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  return (
    <Fragment>
      {optionList?.map((option) => (
        <div className="d-flex">
          <div className="-ml-4">
            <input
              type="checkbox"
              name="outOfStock"
              id="checkBox"
              onClick={() => toggleOptionOutOfStock(option)}
              defaultChecked={option.outofStock}
            />
          </div>
          <div className="d-flex gap-4">
            <div className={`w-100 ml-4`}>
              <div className=" d-flex align-items-center justify-content-between p-4">
                <div>
                  <span className="ms-4 productName">
                    {option?.optionChoiceName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default StockItemOptions;
