import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Col } from "reactstrap";
import burger from "../assets/burger.png";
import Breadcrumb from "../components/common/breadcrumb/Breadcrumb";
import ProductBox from "../components/vendors/product-box/ProductBox";

const VendorProducts = () => {
  // const [outOfStockData, setOutOfStockData] = useState([]);
  const [categories, setCategories] = useState([]);

  const [pending, setPending] = useState(true);
  const [activeTab, setActiveTab] = useState("1");

  const data = useLocation();
  const { id: vendorId } = useParams();

  useEffect(() => {
    setPending(true);
    console.log(localStorage.getItem("selectedVenueId"), vendorId);
    getCategories(localStorage.getItem("selectedVenueId"), vendorId);
    setPending(false);
  }, [vendorId]);

  const getCategories = async (venueId, vendorId) => {
    let apiVal = [];
    //     await listStockItems(venueId, vendorId);
    //     apiVal?.success && setCategories(apiVal?.content);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <Fragment>
      <Breadcrumb component={"Add Product"} link={`${data.pathname}/new`} />
      <div>
        {/* <div class="form-check form-switch form-check-reverse d-inline-block">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckReverse"
                        defaultChecked
                      />
                      <label class="form-check-label" for="flexSwitchCheckReverse">
                        Accept New Orders
                      </label>
                    </div> */}
        {/* <div class="form-check form-switch form-check-reverse d-inline-block">
                      <input
                        class="form-check-input ms-4 me-2"
                        type="checkbox"
                        id="flexSwitchCheckReverse"
                        defaultChecked
                      />
                      <label class="form-check-label" for="flexSwitchCheckReverse">
                        Delivery
                      </label>
                    </div> */}
      </div>
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
                style={{
                  justifyContent: "center",
                  height: 70,
                  fontWeight: 500,
                  fontSize: 22,
                  color: "#3C3C3C",
                  border: "1px solid #3C3C3C",
                }}
              >
                Stock
              </NavLink>
            </NavItem>
            <NavItem className="ms-2">
              <NavLink
                href="#"
                className={`vendor-order-tabs ${activeTab == "2" && "active"}`}
                onClick={() => {
                  toggle("2");
                }}
                style={{
                  justifyContent: "center",
                  height: 70,
                  fontWeight: 500,
                  fontSize: 22,
                  color: "#3C3C3C",
                  border: "1px solid #3C3C3C",
                }}
              >
                Out Of Stocks
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className="mt-4 px-4">
            <TabPane tabId="1">
              {/* {categories.map((category) => console.log(category))}
              {categories.map((category, index) => (
                <CategoryBox
                  categoryName={category.category}
                  key={index}
                  items={category.items}
                />
              ))} */}
              {/* <VendorBox /> */}
              {/* <CategoryBox /> */}
              {/* <OptionBox /> */}
              <ProductBox
                image={burger}
                title={"Chicken Cheese Burger"}
                quantity={"3"}
                addOns="Pickles"
                amount={"5.25"}
                actionButton={"Mark Out Of Stock"}
              />
              {/* <VendorBox />  */}
              {/* <OptionBox /> */}
              <ProductBox
                image={burger}
                title={"Chicken Cheese Burger"}
                quantity={"3"}
                addOns="Pickles"
                amount={"5.25"}
                actionButton={"Mark Out Of Stock"}
              />
              <ProductBox
                image={burger}
                title={"Chicken Cheese Burger"}
                quantity={"3"}
                addOns="Pickles"
                amount={"5.25"}
                actionButton={"Mark Out Of Stock"}
              />
            </TabPane>
            <TabPane tabId="2">
              <ProductBox
                image={burger}
                title={"Chicken Cheese Burger"}
                quantity={"3"}
                addOns="Pickles"
                amount={"5.25"}
                actionButton={"Mark As Active"}
              />
              <ProductBox
                image={burger}
                title={"Chicken Cheese Burger"}
                quantity={"3"}
                addOns="Pickles"
                amount={"5.25"}
                actionButton={"Mark As Active"}
              />
              <ProductBox
                image={burger}
                title={"Chicken Cheese Burger"}
                quantity={"3"}
                addOns="Pickles"
                amount={"5.25"}
                actionButton={"Mark As Active"}
              />
            </TabPane>
          </TabContent>
        </div>
      </Col>
    </Fragment>
  );
};

export default VendorProducts;
