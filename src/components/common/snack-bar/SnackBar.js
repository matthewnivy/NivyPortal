import React from "react";
import "./SnackBar.css";
const SnackBar = ({ severity,message }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        id="snackbar"
        style={{
          backgroundColor: severity == "success" ? "#3BB69A" : "#DF4242",
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default SnackBar;
