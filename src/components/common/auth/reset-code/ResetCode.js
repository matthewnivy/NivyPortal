import React, { Fragment, useContext, useRef, useState } from "react";
import AuthContext from "../../../../context/auth-context";
import styles from "./ResetCode.module.css";

const ResetCode = ({ changeModalScreen }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const { setResetCode } = useContext(AuthContext);

  const submitBtn = useRef();

  const handleInput = (e) => {
    if (e.target.nextSibling && e.target.value.length === e.target.maxLength)
      e.target.nextSibling.focus();
    else if (!e.target.nextSibling) submitBtn.current.focus();
  };

  const handleFocus = (e) => {
    if (e.target.value.length === 1) {
      e.target.select();
    }
  };

  const handleClick = (e) => {
    if (e.target.value.length === e.target.maxLength) {
      e.target.value = null;
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    let resetCode = "";
    Array.from(e.target.elements).forEach((el) => {
      if (!el.classList.contains("submitBtn")) resetCode += el.value;
    });

    if (resetCode.length !== 6) {
      setErrorMsg("Please provide the 6-digit reset code.");
      return;
    } else {
      setErrorMsg(null);
      setResetCode(resetCode);
      changeModalScreen("createPassword");
    }
  };

  const preventInvalidChar = (e) => {
    return ["-", "e", "E", "+"].includes(e.key) && e.preventDefault();
  };

  return (
    <Fragment>
      <div className={styles.customModal}>
        <span className={`${styles.OTPText} madeTommyDark`}>Enter OTP</span>
        <span className={styles.enterText}>
          Please enter 6 digit OTP you receive on a text message to reset
          password.
        </span>
        <form className="modalForm" onSubmit={handleSubmission}>
          <div className={`${styles.codeContainer} mt-5`}>
            <input
              type="number"
              onInput={handleInput}
              onClick={handleClick}
              onFocus={handleFocus}
              onKeyPress={preventInvalidChar}
              maxLength="1"
              className={styles.mr10}
            ></input>
            <input
              type="number"
              onInput={handleInput}
              onClick={handleClick}
              onFocus={handleFocus}
              onKeyPress={preventInvalidChar}
              maxLength="1"
              min={0}
              className={styles.mr10}
            ></input>
            <input
              type="number"
              onInput={handleInput}
              onClick={handleClick}
              onFocus={handleFocus}
              onKeyPress={preventInvalidChar}
              maxLength="1"
              min={0}
              className={styles.mr10}
            ></input>
            <input
              type="number"
              onInput={handleInput}
              onClick={handleClick}
              onFocus={handleFocus}
              onKeyPress={preventInvalidChar}
              maxLength="1"
              className={styles.mr10}
            ></input>
            <input
              type="number"
              onInput={handleInput}
              onClick={handleClick}
              onFocus={handleFocus}
              onKeyPress={preventInvalidChar}
              maxLength="1"
              min={0}
              className={styles.mr10}
            ></input>
            <input
              type="number"
              onInput={handleInput}
              onClick={handleClick}
              onFocus={handleFocus}
              onKeyPress={preventInvalidChar}
              maxLength="1"
              min={0}
              className={styles.mr10}
            ></input>
          </div>
          {errorMsg ? (
            <span className={`${styles.error} mt-3`}>{errorMsg}</span>
          ) : null}
          <br></br>

          <div className={`${styles.center}`}>
            <div className={styles.resendOTPDiv}>
              <span className={styles.resendOTPText}>Resend OTP</span>
            </div>
          </div>

          <input
            className={`${styles.submitButton} my-4 submitBtn`}
            type="submit"
            ref={submitBtn}
            value={"Send"}
          >
          </input>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetCode;
