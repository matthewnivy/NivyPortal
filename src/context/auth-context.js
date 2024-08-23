import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  user: "",
  isLoggedIn: false,
  login: (token, user) => {},
  logout: () => {},
  mobileNumber: "",
  setMobileNumber: "",
});

export const ITEM_OPTION_DEFAULT_STATE = {
  orgId: "NivyWebApp",
  venueId: localStorage.getItem("selectedVenueId"),
  vendorId: "",
  name: "",
  itemOptions: [
    {
      optionName: "",
      optionSelections: "single",
      optionList: [
        {
          optionChoiceName: "",
          price: "",
          outOfStock: false,
        },
      ],
    },
  ],
};
export const AuthContextProvider = (props) => {
  const oldToken = localStorage.getItem("token");
  const [token, setToken] = useState(oldToken);
  const [user, setUser] = useState(localStorage.getItem("user") ?? "");
  const [mobileNumber, setMobileNumber] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [notification, setNotification] = useState({});
  const [addItemOptions, setAddItemOptions] = useState(
    ITEM_OPTION_DEFAULT_STATE
  );
  const [selectedVenueId, setSelectedVenueId] = useState(
    localStorage.getItem("selectedVenueId") ?? ""
  );
  const [selectedGameProgram, setSelectedGameProgram] = useState(0);
  const userIsLoggedin = !!token;
  const fetchGamePrograms = () => {};
  const loginHandler = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("selectedVenueId", 2);
  };
  const logoutHandler = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedin,
    user: user,
    login: loginHandler,
    logout: logoutHandler,
    setMobileNumber: setMobileNumber,
    mobileNumber: mobileNumber,
    resetCode: resetCode,
    setResetCode: setResetCode,
    selectedVenueId: selectedVenueId,
    setSelectedVenueId: setSelectedVenueId,
    notification: notification,
    setNotification: setNotification,
    addItemOptions: addItemOptions,
    setAddItemOptions: setAddItemOptions,
    selectedGameProgram: selectedGameProgram,
    setSelectedGameProgram: setSelectedGameProgram,
    fetchGamePrograms: fetchGamePrograms,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
