import { Fragment, React, useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./context/auth-context";
import Login from "./pages/Login";
import Header from "./components/common/header/Header";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Scan from "./pages/Scan";
import Campaigns from "./pages/Campaigns";
import ManageCampaigns from "./components/common/campaigns/manage-campaigns/ManageCampaigns";
import Reservations from "./pages/Reservations";
import Rosters from "./pages/Rosters";
import Rewards from "./pages/Rewards";
import Events from "./pages/Events";
import ManageEvents from "./components/events/ManageEvents";
import Users from "./pages/Users";
import ManageUsers from "./components/users/ManageUsers";
import Contests from "./pages/Contests";
import { getAccessDetails } from "./utils/helpers/AuthHelper";
import Vendors from "./pages/Vendors";
import Vendor from "./pages/Vendor";
import VendorOrders from "./pages/VendorOrders";
import VendorProducts from "./pages/VendorProducts";
import ManageVendorProducts from "./pages/ManageVendorProducts";
import VendorCategories from "./pages/VendorCategories";
import SnackBar from "./components/common/snack-bar/SnackBar";
import EditMenu from "./pages/EditMenu";
import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";
import headerContext from "./headerContext";
import Home from "./pages/client/Home";
import About from "./pages/client/About";
import HowItWorks from "./pages/client/HowItWorks";
import FAQs from "./pages/client/FAQs";
import Contact from "./pages/client/Contact";
import GamePrograms from "./pages/GamePrograms";
import ManageRoster from "./components/roster/ManageRoster";
import ManageContests from "./pages/ManageContests";
import ManageGame from "./components/common/game/manage-games/ManageGame";
const drawerWidth = 240;

function App() {
  const [toggleEvent, setToggleEvent] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const routes = (
    <ScrollToTop>
      <Routes>
        {isLoggedIn && getAccessDetails("scan") && (
          <Route path={"/scan"} element={<Scan />}></Route>
        )}
        {!isLoggedIn && <Route path={"/login"} element={<Login />}></Route>}
        {isLoggedIn && (
          <Route path={"/campaigns"} element={<Campaigns />}></Route>
        )}
        {isLoggedIn && (
          <Route path={"/campaigns/:id"} element={<ManageCampaigns />}></Route>
        )}
        {isLoggedIn && (
          <Route path={"/reservations"} element={<Reservations />}></Route>
        )}
        {isLoggedIn && <Route path={"/rosters"} element={<Rosters />}></Route>}
        {isLoggedIn && (
          <Route path={"/manageroster"} element={<ManageRoster />}></Route>
        )}
        {isLoggedIn && <Route path={"/rewards"} element={<Rewards />}></Route>}
        {isLoggedIn && <Route path={"/events"} element={<Events />}></Route>}
        {isLoggedIn && (
          <Route path={"/events/:id"} element={<ManageEvents />}></Route>
        )}
        {isLoggedIn && <Route path={"/users"} element={<Users />}></Route>}
        {isLoggedIn && (
          <Route path={"/users/:id"} element={<ManageUsers />}></Route>
        )}

        {isLoggedIn && getAccessDetails("manageVendors") && (
          <Route path={"/vendors"} element={<Vendors />}></Route>
        )}
        {isLoggedIn && getAccessDetails("manageVendors") && (
          <Route path={"/vendors/:vendorId"} element={<Vendor />}></Route>
        )}
        {isLoggedIn && getAccessDetails("manageVendors") && (
          <Route
            path={"/vendors/:vendorId/manage-orders"}
            element={<VendorOrders />}
          ></Route>
        )}

        {isLoggedIn && getAccessDetails("manageVendors") && (
          <Route
            path={"/vendors/:vendorId/edit-menu"}
            element={<EditMenu />}
          ></Route>
        )}
        {isLoggedIn && getAccessDetails("manageVendors") && (
          <Route
            path={"/vendors/:vendorId/manage-categories"}
            element={<VendorCategories />}
          ></Route>
        )}
        {isLoggedIn && getAccessDetails("manageVendors") && (
          <Route
            path={
              "/vendors/:vendorId/manage-categories/:categoryId/manage-products"
            }
            element={<VendorProducts />}
          ></Route>
        )}

        {isLoggedIn && getAccessDetails("manageVendors") && (
          <Route
            path={"/vendors/:vendorId/products/:productId"}
            element={<ManageVendorProducts />}
          ></Route>
        )}

        {isLoggedIn && (
          <Route path={"/contests"} element={<Contests />}></Route>
        )}
        {isLoggedIn && (
          <Route path={"/contests/:id"} element={<ManageContests />}></Route>
        )}
        {isLoggedIn && (
          <Route path={"/games"} element={<GamePrograms />}></Route>
        )}
        {isLoggedIn && <Route path={"/manageGames/new"} element={<ManageGame />}></Route>}
        {!isLoggedIn && <Route path={"/"} element={<Home />}></Route>}
        {!isLoggedIn && <Route path={"/about"} element={<About />}></Route>}
        {!isLoggedIn && (
          <Route path={"/how-it-works"} element={<HowItWorks />}></Route>
        )}
        {!isLoggedIn && <Route path={"/FAQs"} element={<FAQs />}></Route>}
        {!isLoggedIn && <Route path={"/contact"} element={<Contact />}></Route>}

        {/* {!isLoggedIn && <Route path={"/register"} element={<Register />}></Route>}
{!isLoggedIn && (
<Route path="/forget-password" element={<ForgetPassword />}></Route>
)}
{!isLoggedIn && (
<Route path="/reset-password" element={<ResetPassword />}></Route>
)}
{isLoggedIn && <Route path="/profile" element={<Profile />}></Route>} */}
        {/* {!isLoggedIn && (
          <Route path="*" element={<Navigate replace to="/login" />} />
        )} */}
        {/* {isLoggedIn &&
        (getAccessDetails("scan") ? (
          <Route path="*" element={<Navigate replace to="/scan" />} />
        ) : (
          <Route path="*" element={<Navigate replace to="/" />} />
        ))} */}
      </Routes>
    </ScrollToTop>
  );

  return (
    <headerContext.Provider value={{ toggleEvent, setToggleEvent }}>
      <Fragment>
        {isLoggedIn && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              minHeight: "100vh",
              background: "#F6F6F6",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div
              className="drawerSpace"
              style={{
                zIndex: 0,
              }}
            >
              {" "}
              <Header />
            </div>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 7,
                pt: 0,
                pl: 10,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                marginLeft: { sm: "-10px" },
                marginTop: { sm: "10px" },
              }}
            >
              <Toolbar sx={{ zIndex: -1 }} />
              {routes}
              <Toolbar />
            </Box>
          </Box>
        )}
        {!isLoggedIn && <Fragment>{routes}</Fragment>}
        <SnackBar
          severity={authCtx?.notification?.severity}
          message={authCtx?.notification?.message}
        />
      </Fragment>
    </headerContext.Provider>
  );
}

export default App;
