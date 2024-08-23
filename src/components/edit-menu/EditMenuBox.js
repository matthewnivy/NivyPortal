import React, { Fragment, useEffect, useState, useContext } from "react";
import sortIcon from "../../assets/sort.svg";
import teamMateOne from "../../assets/team-mate-one.png";
import { Tooltip } from "reactstrap";
import marker from "../../assets/marker.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StockItemOptions from "../stock-item-options/StockItemOptions";
import { Link, useParams } from "react-router-dom";
import { VendorsApi } from "../../utils/api";
import AuthContext from "../../context/auth-context";
import "./EditMenuBox.css";
import { Skeleton, Stack } from "@mui/material";

const EditMenuBox = ({ category }) => {
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);

  const showDetailHandler = () => {
    setShowCategoryDetails(true);
  };

  const hideDetailHandler = () => {
    setShowCategoryDetails(false);
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toolTipToggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Fragment>
      <div className="my-4 category-box">
        <div className="d-flex justify-content-between align-items-center menu-box">
          <div className="d-flex align-items-center">
            {!showCategoryDetails && (
              <>
                <AddIcon
                  onClick={showDetailHandler}
                  sx={{ fontSize: 60 }}
                  id="showTeamDetailss"
                />
                {document.getElementById("showTeamDetails") && (
                  <Tooltip
                    isOpen={tooltipOpen}
                    target="showTeamDetailss"
                    toggle={toolTipToggle}
                  >
                    Show Roster Details
                  </Tooltip>
                )}
              </>
            )}
            {showCategoryDetails && (
              <>
                <RemoveIcon
                  onClick={hideDetailHandler}
                  sx={{ fontSize: 60 }}
                  id="hideOrderDetails"
                />
                {document.getElementById("hideOrderDetails") && (
                  <Tooltip
                    isOpen={tooltipOpen}
                    target="hideOrderDetails"
                    toggle={toolTipToggle}
                  >
                    Hide Category Products
                  </Tooltip>
                )}
              </>
            )}

            <div className={`categoryTitle`}>{category?.category}</div>
          </div>
          <div className={`teamCount mlSix customizedCardTitle`}>
            <img src={sortIcon} className={`me-2 teamIcon`} />
          </div>
        </div>

        {showCategoryDetails && <StockItems items={category.items} />}
      </div>
    </Fragment>
  );
};
export default EditMenuBox;

const StockItems = ({ items }) => {
  let itemsInStock = items;
  const [showStockItemOptions, setShowStockItemOptions] = useState();
  const [productOutOfStock, setProductOutOfStock] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const vendorsApi = new VendorsApi();
  const { vendorId } = useParams();

  const getItemOptions = async (name, key) => {
    // console.log(key.queryKey[1], itemName)
    const response = await vendorsApi.fetchListStockItemOptions({
      ItemName: name,
      OrgId: "NivyWebApp",
      venueId: authCtx.selectedVenueId,
      vendorId: vendorId,
    });
    if (response.success) {
      let obj = [];
      // //Find index of specific object using findIndex method.
      obj = itemsInStock.filter((obj) => obj?.name == name);
      console.log(obj, name);
      obj[0] = { ...obj[0], itemOptions: response?.content?.itemOptions };

      itemsInStock[key] = obj[0];
    }
    if (key == itemsInStock.length - 1) {
      setIsLoading(false);
    }
  };

  // const { data, status } = useQuery(
  //   ["itemOption", items[0]?.name],
  //   getItemOptions
  // );

  useEffect(() => {
    items.map((item, key) => getItemOptions(item.name, key));
  }, []);

  const toggleHandler = (key) => {
    setShowStockItemOptions((showStockItemOptions) => !showStockItemOptions);
  };

  const toggleProductOutOfStock = async (item) => {
    let markOutOfStock;
    if (productOutOfStock == undefined) {
      markOutOfStock = item?.outofStock == "True" ? false : true;
    } else {
      markOutOfStock = !productOutOfStock;
    }
    const response = await vendorsApi.markItemOutStock({
      venueId: authCtx.selectedVenueId,
      vendorId: vendorId,
      itemName: item?.name,
      isOutStock: markOutOfStock,
    });
    const notify = {};
    if (response.success) {
      notify.severity = "success";
      notify.message = markOutOfStock
        ? `${item.name} marked Out Of Stock Successfully!`
        : `${item.name} marked In Stock Successfully!`;
      setProductOutOfStock(markOutOfStock);
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
      <div className="horizontal-line"></div>

      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rectangular" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rectangular" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
          <Skeleton variant="rectangular" width={"82vw"} height={47} />
          <Skeleton variant="rounded" width={"82vw"} height={47} />
        </Stack>
      ) : (
        itemsInStock?.map((item, key) => (
          <>
            <div className="d-flex gap-4 mt-3" key={key}>
              <div className="outOfStockHeader">
                <div>Out of Stock</div>
                <div className="d-flex gap-y-8 h-80 align-items-center justify-content-center">
                  <input
                    type="checkbox"
                    name="outOfStock"
                    id="checkBox"
                    value={productOutOfStock}
                    onClick={() => toggleProductOutOfStock(item)}
                    defaultChecked={item?.outOfStock}
                  />
                </div>
              </div>
              <div className={`w-100 mt-3`}>
                <div className="productBox d-flex align-items-center justify-content-between px-4">
                  <div>
                    <img
                      src={item?.images ? item?.images[0] : teamMateOne}
                      width={60}
                      height={60}
                    />
                    <span className="ms-4 productName">{item?.name}</span>
                  </div>
                  <Link
                    to={`/vendors/${vendorId}/products/${item?.name}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div
                      className={`d-flex align-items-center justify-content-center padding`}
                      id="edit-vendor"
                      // onClick={() => editCategoryHandler(category)}
                    >
                      <img src={marker} />
                      &nbsp; Edit
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {item?.itemOptions?.map((itemOption, key) => (
              <div className="min-h-80 stockItemOption">
                <div className="d-flex align-items-center h-80 mx-4">
                  {!showStockItemOptions && (
                    <>
                      <AddIcon
                        onClick={() => toggleHandler(key)}
                        sx={{ fontSize: 38 }}
                      />
                    </>
                  )}
                  {showStockItemOptions && (
                    <RemoveIcon
                      onClick={() => toggleHandler(key)}
                      sx={{ fontSize: 38 }}
                    />
                  )}
                  <div className="stockItemOptionHeader">
                    {itemOption?.optionName}
                  </div>
                </div>
                {showStockItemOptions && (
                  <StockItemOptions
                    optionList={itemOption?.optionList}
                    itemOption={itemOption}
                    item={item}
                  />
                )}
              </div>
            ))}
          </>
        ))
      )}
    </Fragment>
  );
};
