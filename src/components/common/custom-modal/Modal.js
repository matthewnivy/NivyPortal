import React from "react";
import styles from "./Modal.module.css";
import ForgetPassword from "../auth/forgot-password/ForgetPassword";
import ResetCode from "../auth/reset-code/ResetCode";
import CreateNewPassword from "../auth/create-new-password/CreateNewPassword";
import CampaignType from "../campaigns/campaign-type/CampaignType";
import ManageRoster from "../../roster/ManageRoster";
import ImageFromUrl from "../../vendors/manage-product/ImageFromUrl";
import OptionGroup from "../../vendors/manage-product/OptionGroupStepOne";
import OptionGroupStepTwo from "../../vendors/manage-product/OptionGroupStepTwo";
import ManageGame from "../game/manage-games/ManageGame";

const Modal = ({
  openModal,
  changeModalScreen,
  modalScreen,
  setAdditionalImages,
  values,
}) => {
  const handleCloseModal = (event) => {
    // Check if the click target is the close button
    if (event.target.classList.contains(styles.close)) {
      openModal(false);
    }
  };
  return (
    <>
      <div className={styles.darkBG} onClick={handleCloseModal} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div
            className={styles.modalHeader}
            style={{
              color:
                ["imageFromUrl", "optionGroupOne"].includes(modalScreen) &&
                "black",
              borderBottom:
                ["imageFromUrl", "optionGroupOne"].includes(modalScreen) &&
                "1px solid #B2B3B5",
              background:
                ["imageFromUrl", "optionGroupOne"].includes(modalScreen) &&
                "#F8F9FB",
              paddingLeft:
                ["imageFromUrl", "optionGroupOne"].includes(modalScreen) &&
                "4%",
            }}
          >
            {["imageFromUrl", "optionGroupOne"].includes(modalScreen) && (
              <div
                style={{
                  marginTop: 14,
                  display: "inline-block",
                }}
              >
                {modalScreen == "imageFromUrl"
                  ? "Please paste the image URL"
                  : "Individual Options"}
              </div>
            )}
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
          </div>

          {modalScreen === "forgetPassword" ? (
            <ForgetPassword changeModalScreen={changeModalScreen} />
          ) : modalScreen === "resetCodeForm" ? (
            <ResetCode changeModalScreen={changeModalScreen}></ResetCode>
          ) : modalScreen === "createPassword" ? (
            <CreateNewPassword
              openModal={openModal}
              changeModalScreen={changeModalScreen}
            ></CreateNewPassword>
          ) : modalScreen === "manipulateCampaignType" ? (
            <CampaignType
              openModal={openModal}
              changeModalScreen={changeModalScreen}
            ></CampaignType>
          ) : modalScreen === "manageRosters" ? (
            <ManageRoster
              openModal={openModal}
              changeModalScreen={changeModalScreen}
            ></ManageRoster>
          ) : modalScreen === "imageFromUrl" ? (
            <ImageFromUrl
              openModal={openModal}
              changeModalScreen={changeModalScreen}
              setAdditionalImages={setAdditionalImages}
              values={values}
            ></ImageFromUrl>
          ) : modalScreen === "optionGroupOne" ? (
            <OptionGroup
              openModal={openModal}
              changeModalScreen={changeModalScreen}
              values={values}
            ></OptionGroup>
          ) : modalScreen === "optionGroupTwo" ? (
            <OptionGroupStepTwo
              openModal={openModal}
              changeModalScreen={changeModalScreen}
              values={values}
              // getItemOptions={getItemOptions}
            ></OptionGroupStepTwo>
          ) : modalScreen === "manageGamePrograms" ? (
            <ManageGame
              openModal={openModal}
              changeModalScreen={changeModalScreen}
              values={values}
            ></ManageGame>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
