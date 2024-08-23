import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import iconGrayScale from "../../../assets/icon-grayscale.svg";
import iconColored from "../../../assets/icon.svg";
import NivyLogo from "../../../assets/nivy-full-logo.svg";
import TestPerson from "../../../assets/person.svg";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AuthContext from "../../../context/auth-context";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import User from "../../../utils/api/User";
import { Link } from "react-router-dom";
import { UsersApi } from "../../../utils/api";
import { Icon } from "@mui/material";
import {
  getAccessDetails,
  getUserDetails,
} from "../../../utils/helpers/AuthHelper";
import zIndex from "@mui/material/styles/zIndex";
import "./header.css";
import { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import headerContext from "../../../headerContext";

const drawerWidth = 240;

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedVenue, setSelectedVenue] = React.useState("");
  const [anchorElAccount, setAnchorElAccount] = React.useState(null);
  const authCtx = React.useContext(AuthContext);
  const usersApi = new UsersApi();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let authUserPrivileges = JSON.parse(authCtx.user);
  let routerLinks = [
    { label: "Scan", path: "/scan" },
    { label: "Vendors", path: "/vendors" },
    { label: "Reservations", path: "/reservations" },
    { label: "Events", path: "/events" },
    { label: "Contests", path: "/contests" },
    { label: "Rosters", path: "/rosters" },
    { label: "Rewards", path: "/rewards" },
    { label: "Campaigns", path: "/campaigns" },
    { label: "Analytics", path: "/analytics" },
    { label: "Users", path: "/users" },
    { label: "Settings", path: "/settings" },
  ];

  let navigationMenu = [];
  // if (authCtx.isLoggedIn && getAccessDetails("isAdmin")) {
  //   navigationMenu = [...routerLinks];
  // } else {
  getAccessDetails("scan") &&
    navigationMenu.push({ label: "Scan", path: "/scan" });

  getAccessDetails("manageVendors") &&
    navigationMenu.push({ label: "Vendors", path: "/vendors" });

  getAccessDetails("manageReservations") &&
    navigationMenu.push({ label: "Reservations", path: "/reservations" });

  navigationMenu.push({ label: "Events", path: "/events" });

  getAccessDetails("manageContests") &&
    navigationMenu.push({ label: "Contests", path: "/contests" });

  // getAccessDetails("manageRosters") &&
    navigationMenu.push({ label: "Rosters", path: "/rosters" });

  getAccessDetails("manageRewards") &&
    navigationMenu.push({ label: "Rewards", path: "/rewards" });

  getAccessDetails("manageMarketingCampaigns") &&
    navigationMenu.push({ label: "Campaigns", path: "/campaigns" });

  getAccessDetails("manageAnalytics") &&
    navigationMenu.push({ label: "Analytics", path: "/analytics" });

  getAccessDetails("manageAssociateAccounts") &&
    navigationMenu.push({ label: "Users", path: "/users" });

  getAccessDetails("manageSettings") &&
    navigationMenu.push({ label: "Settings", path: "/settings" });

  navigationMenu.push({ label: "Game Programs", path: "/games" });
  // }

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };
  const drawer = (
    <div>
      <List>
        {navigationMenu.map((route, index) => (
          <ListItem
            key={index}
            disablePadding
            component={Link}
            to={route.path}
            button
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemButton
              sx={{
                backgroundColor:
                  selectedIndex == index ? "rgba(20, 34, 127, 0.1)" : "#FFFFFF",
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  marginLeft: 12,
                }}
              >
                <img
                  src={selectedIndex === index ? iconColored : iconGrayScale}
                />
              </div>
              <div
                style={{
                  fontWeight: "500",
                  color: selectedIndex === index ? "#16217F" : "#8C8C8C",
                  fontSize: 14,
                  marginTop: 4,
                  marginLeft: 12,
                }}
              >
                {route.label}
              </div>
              {/* sx={{
                  fontWeight: "700",
                }}
              /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectVenueHandler = (venue) => {
    setSelectedVenue(venue.name);
    localStorage.setItem("selectedVenueId", venue.id);
    authCtx.setSelectedVenueId(venue.id);
  };
  React.useEffect(() => {
    getVendorVenues();
    async function getVendorVenues() {
      let resp = await usersApi.getManagedVenues();
      if (resp.success) {
        let x = resp.content.filter(
          (venue) => venue.id === localStorage.getItem("selectedVenueId")
        )[0];
        setSelectedVenue(x.name);
      }
    }
  }, []);

  const openAccount = Boolean(anchorElAccount);
  const handleAccountClick = (event) => {
    setAnchorElAccount(event.currentTarget);
  };
  const handleAccountClose = () => {
    setAnchorElAccount(null);
  };
  const logoutHandler = () => authCtx.logout();
  const { toggleEvent } = useContext(headerContext);
  return (
    <React.Fragment>
      <Box>
        <CssBaseline />
        <div className={toggleEvent && "notshow"}>
          <AppBar
            className="burger_background"
            sx={{
              position: "absolute",
              left: "20px",
              margin: 2,
              borderRadius: 4,
              maxWidth: "96%",
              boxShadow: "none",
            }}
            color=""
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon sx={{ display: { md: "none" } }} />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <img className="logoStyle" src={NivyLogo} alt="Nivy Logo"></img>
                <div>
                  <div>
                    {/* <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img src={iconColored} width={20} height={17}></img>
                    <pre> </pre>
                    Select Venue
                  </Button>  */}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {JSON.parse(localStorage.getItem("user"))?.venues
                        ? JSON.parse(localStorage.getItem("user"))?.venues.map(
                            (venue, key) => {
                              return (
                                <React.Fragment key={key}>
                                  <MenuItem
                                    onClick={() => selectVenueHandler(venue)}
                                  >
                                    {venue.name}
                                  </MenuItem>
                                </React.Fragment>
                              );
                            }
                          )
                        : null}
                    </Menu>

                    {selectedVenue ? (
                      <span className="header_text">
                        {/* Selected Venue: */} {selectedVenue}
                      </span>
                    ) : null}
                  </div>
                </div>

                <IconButton
                  onClick={handleAccountClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openAccount ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccount ? "true" : undefined}
                >
                  <Avatar
                    className="avatar_responsive"
                    alt="Remy Sharp"
                    src={
                      JSON.parse(authCtx.user)?.image
                        ? JSON.parse(authCtx.user)?.image
                        : TestPerson
                    }
                    onClick={handleAccountClick}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorElAccount}
                  id="account-menu"
                  open={openAccount}
                  onClose={handleAccountClose}
                  onClick={handleAccountClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleAccountClose}>
                    <Avatar
                      src={
                        JSON.parse(authCtx.user)?.image
                          ? JSON.parse(authCtx.user)?.image
                          : TestPerson
                      }
                    />{" "}
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleAccountClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <div onClick={logoutHandler}>
                    <Link to="/login">
                      <MenuItem onClick={handleAccountClose}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Link>
                  </div>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            className="drawerDisplay"
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                height: "88%",
                marginTop: "100px",
                marginLeft: "40px",
                borderRadius: "14px",
                position: "absolute",
                border: "none",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Header;
