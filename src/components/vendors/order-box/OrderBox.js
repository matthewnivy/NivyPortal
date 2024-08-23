// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClock, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import deliveryIcon from "../../../assets/delivery-icon.svg";
import burger from "../../../assets/burger.png";
import clock from "../../../assets/clock.svg";
import orderBag from "../../../assets/order-bag.svg";
import { useContext, useState } from "react";
import { CardBody, Tooltip } from "reactstrap";
import React, { Fragment } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./OrderBox.css";
import { Link, useParams } from "react-router-dom";
import { OrdersApi } from "../../../utils/api";
import AuthContext from "../../../context/auth-context";
const RenderOrderDetails = ({ items, markProductRefund }) => {
  console.log(items);

  return (
    <>
      <div className="horizontal-line mx-4"></div>
      {items?.map((item) => (
        <CardBody className="pb-3 mt-1">
          <div className="d-flex order-box mx-4 mt-4 py-2 my-2 justify-content-between">
            <div className="d-flex">
              <div
                style={{
                  paddingRight: 5,
                  display: "inline-block",
                  marginRight: 17,
                  borderRight: "2px solid #eae6e6",
                  marginLeft: 17,
                }}
              >
                <img src={item.images[0] ?? burger} width={100} height={100} />
              </div>
              <div className="d-flex flex-column justify-content-between py-1">
                <div
                  style={{
                    color: "#6f6a6a",
                    fontWeight: 600,
                    fontSize: 19,
                    minWidth: "max-content",
                  }}
                >
                  {item?.itemName}
                </div>
                <div>Quantity: {item?.quantity}</div>
                <div>
                  Addons:{" "}
                  {item?.itemOptions?.map(
                    (addOn) => addOn.selectedOptions[0].name ?? ""
                  )}
                </div>
              </div>
            </div>
            {item?.isRefunded && <div className="refund-badge">Refunded</div>}

            <div className="d-flex flex-column justify-content-between py-1 pe-4">
              <div className="cash-amount">${item?.totalPrice}</div>
              {!item?.isRefunded && (
                <div
                  className="refund-item"
                  onClick={() => markProductRefund(item)}
                >
                  Refund Item
                </div>
              )}
            </div>
          </div>
        </CardBody>
      ))}
    </>
  );
};

const OrderBox = ({ order, getOrders }) => {
  let [showOrderDetails, setShowOrderDetails] = useState(false);
  const ordersApi = new OrdersApi();
  const { vendorId } = useParams();
  const authCtx = useContext(AuthContext);
  const showDetailHandler = () => {
    console.log("show");
    setShowOrderDetails(true);
  };

  const hideDetailHandler = () => {
    setShowOrderDetails(false);
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toolTipToggle = () => setTooltipOpen(!tooltipOpen);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const markOrderCompleted = async (order) => {
    const response = await ordersApi.markOrderCompleted(order?.vendorOrderId, {
      venueId: localStorage.getItem("selectedVenueId") ?? 2,
    });

    const notify = {};
    if (response?.success) {
      notify.severity = "success";
      notify.message = response?.content;
      getOrders(order?.orderStatus);
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

  const markOrderCancelled = async (order) => {
    const response = await ordersApi.markOrderCancelled({
      venueId: localStorage.getItem("selectedVenueId") ?? 2,
      vendorId: vendorId,
      orderId: order?.vendorOrderId,
      reason: "Cancelling Order",
    });
    const notify = {};
    if (response?.success) {
      notify.severity = "success";
      notify.message = response?.content;
      getOrders(order?.orderStatus);
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

  const markProductRefund = async (item) => {
    console.log("first", item, order);
    const response = await ordersApi.markProductRefund({
      venueId: localStorage.getItem("selectedVenueId") ?? 2,
      vendorOrderId: order?.vendorOrderId,
      orderId: order?.orderId ?? null,
      itemNames: [item?.itemName],
    });
    const notify = {};
    if (response?.success) {
      notify.severity = "success";
      notify.message = response?.content;
      getOrders(order?.orderStatus);
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
      <div className="order-box my-4">
        <div className="inner-order-box">
          <div className="all-items-container">
            {!showOrderDetails && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.1,
                  }}
                >
                  <AddIcon
                    fontSize="large"
                    color="black"
                    onClick={showDetailHandler}
                    id="showOrderDetailss"
                  />
                  {document.getElementById("showOrderDetails") && (
                    <Tooltip
                      isOpen={tooltipOpen}
                      target="showOrderDetailss"
                      toggle={toolTipToggle}
                    >
                      Show Order Details
                    </Tooltip>
                  )}
                </div>
              </>
            )}

            {showOrderDetails && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "1px solid",
                    flex: 0.1,
                  }}
                >
                  <RemoveIcon
                    fontSize="large"
                    color="black"
                    onClick={hideDetailHandler}
                    id="hideOrderDetails"
                  />
                  {document.getElementById("hideOrderDetails") && (
                    <Tooltip
                      isOpen={tooltipOpen}
                      target="hideOrderDetails"
                      toggle={toolTipToggle}
                    >
                      Hide Order Details
                    </Tooltip>
                  )}
                </div>
              </>
            )}
            <div className="contianer-nametag-openbutton">
              <div className="inner-container-nametag-openbutton">
                <div className="order-title">{order.orderName ?? null}</div>
                <div
                  className="customized-card-title-l3-open-order"
                  id="open-order"
                  style={{
                    color:
                      (order?.orderStatus ?? null) == "completed"
                        ? "#377d22"
                        : (order?.orderStatus ?? null) == "open"
                        ? "blue"
                        : "red",
                    background:
                      (order?.orderStatus ?? null) == "completed"
                        ? "rgba(55, 125, 34, 0.1)"
                        : (order?.orderStatus ?? null) == "open"
                        ? "#e1e1ff"
                        : "#fcd8d8",
                  }}
                >
                  {order?.orderStatus?.charAt(0)?.toUpperCase() ?? null}
                  {order?.orderStatus?.slice(1)}
                </div>
              </div>
              <div className="order-container">
                <div
                  className="customized-card-title-l3 order-detail-box"
                  id="order-detail"
                >
                  <img src={deliveryIcon} />
                  &nbsp; Order ID: {order?.vendorOrderId ?? null}
                </div>
                <div
                  className="customized-card-title-l3 order-detail-box"
                  style={{
                    background: "#F6F6F6",
                  }}
                >
                  <img src={orderBag} />
                  &nbsp; Items: {order?.items?.length ?? null}
                </div>
                <div
                  className="customized-card-title-l3 order-detail-box"
                  style={{
                    background: "#F6F6F6",
                  }}
                >
                  <img src={clock} />
                  &nbsp;{order?.localDateTime ?? null}
                </div>
              </div>
            </div>
          </div>
          <div className="container-cancelcomplete-buttons">
            {order?.orderStatus != "cancelled" && (
              <div
                className="customized-card-title-l3 order-detail-box"
                style={{
                  background: "#D90000",
                  color: "white",
                  height: 50,
                  flex: 1,
                }}
                onClick={() => markOrderCancelled(order)}
              >
                Cancel
              </div>
            )}
            {order?.orderStatus != "completed" && (
              <div
                className="customized-card-title-l3 order-detail-box"
                style={{
                  background: "#399700",
                  color: "white",
                  height: 50,
                  flex: 1,
                }}
                onClick={() => markOrderCompleted(order)}
              >
                Complete
              </div>
            )}
          </div>
        </div>

        {showOrderDetails && (
          <RenderOrderDetails
            items={order?.items}
            markProductRefund={markProductRefund}
          />
        )}
      </div>
    </Fragment>
  );
};

export default OrderBox;