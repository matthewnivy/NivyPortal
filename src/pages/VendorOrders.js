import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../components/common/breadcrumb/Breadcrumb";
import { Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import OrderBox from "../components/vendors/order-box/OrderBox";
import { VendorsApi } from "../utils/api";
import AuthContext from "../context/auth-context";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Skeleton, Stack } from "@mui/material";
import marker from "../assets/marker.svg";

const VendorOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const vendorsApi = new VendorsApi();
  const authCtx = useContext(AuthContext);
  const { vendorId } = useParams();

  const toggle = (tab) => {
    console.log(tab);
    if (tab === "1") {
      getOrders("open");
    } else if (tab === "2") {
      getOrders("completed");
    } else if (tab === "3") {
      getOrders("cancelled");
    }
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const getOrders = async (orderStatus) => {
    // console.log(orderStatus.queryKey[0]);
    // console.log(orderStatus)
    setIsLoading(true);
    setData([]);
    const response = await vendorsApi.getVendorOrders({
      venueId: authCtx.selectedVenueId,
      vendorId: vendorId,
      ordersToken: null,
      orderStatus:
        typeof orderStatus == "object" ? orderStatus.queryKey[0] : orderStatus,
      orderDate: "month",
      sortType: "newest",
    });
    if (response.success) setData(response.content.orders[0]?.orders ?? []);
    setIsLoading(false);

    // return response.content.orders;
  };

  // const { data, status } = useQuery("open", getOrders);
  // console.log(data ? data[0] : data, status);

  useEffect(() => {
    getOrders("open");
  }, []);
  return (
    <div>
      <Breadcrumb />
      <Col md="12">
        <div className="main-card my-2 mt-4 mb-3">
          <Nav pills fill>
            <NavItem>
              <NavLink
                href="#"
                className={`vendor-order-tabs ${activeTab == "1" && "active"}`}
                onClick={() => {
                  toggle("1");
                }}
              >
                Open
              </NavLink>
            </NavItem>
            <NavItem className="ms-2">
              <NavLink
                href="#"
                className={`vendor-order-tabs ${activeTab == "2" && "active"}`}
                onClick={() => {
                  toggle("2");
                }}
              >
                Completed
              </NavLink>
            </NavItem>
            <NavItem className="ms-2">
              <NavLink
                href="#"
                className={`vendor-order-tabs ${activeTab == "3" && "active"}`}
                onClick={() => {
                  toggle("3");
                }}
              >
                Cancelled
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {/* <OrderBox orders={orders} /> */}
              {isLoading ? (
                <Stack spacing={1} sx={{ mt: 4 }}>
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
                data?.map((order, index) => (
                  <OrderBox order={order} getOrders={getOrders} />
                ))
              )}
              <div className="button-container">
                <Link
                  to={`/vendors/${vendorId}/edit-menu`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div className="manage-stock-btn">Edit Menu</div>
                </Link>
                <Link
                  to={`/vendors/${vendorId}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div className="edit-vendor-btn ms-1">
                    <img src={marker} style={{ paddingLeft: "10px" }} />
                    &nbsp; Edit Vendor Settings
                  </div>
                </Link>
              </div>
            </TabPane>
            <TabPane tabId="2">
              {isLoading ? (
                <Stack spacing={1} sx={{ mt: 4 }}>
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
                data?.map((order, index) => (
                  <OrderBox order={order} getOrders={getOrders} />
                ))
              )}
            </TabPane>
            <TabPane tabId="3">
              {isLoading ? (
                <Stack spacing={1} sx={{ mt: 4 }}>
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
                data?.map((order, index) => (
                  <OrderBox order={order} getOrders={getOrders} />
                ))
              )}
            </TabPane>
          </TabContent>
        </div>
      </Col>
    </div>
  );
};

export default VendorOrders;