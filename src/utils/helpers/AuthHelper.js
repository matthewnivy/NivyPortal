import { Buffer } from "buffer";

export const getAccessDetails = (privilegeType) =>
  JSON.parse(localStorage.getItem("user"))[privilegeType] ?? null;

export const getUserDetails = (access_token) => {
  if (access_token) {
    return JSON.parse(
      Buffer.from(access_token.split(".")[1], "base64").toString()
    );
  }
  return null;
};
