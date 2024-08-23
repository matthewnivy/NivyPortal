import { serializeError } from "./Errors";
import ProtectedApi from "./ProtectedApi";
import ResponseBuilder from "./ResponseBuilder";

class Auth extends ProtectedApi {
  constructor(headers) {
    super(headers);
  }
  async logout() {
    try {
      const { data } = (await this.instance.get) < {} > `/logout`;

      return ResponseBuilder.noContent(data);
    } catch (error) {
      throw serializeError(error);
    } finally {
      // Cookies.remove("byt_cd");
      // Cookies.remove("byt__cp");
      // Cookies.remove("token");
    }
  }

  async authenticate(credentials) {
    try {
      const { data } = await this.instance.post(
        "/Account/AdminLogin",
        credentials
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async fetchResetPasswordOTP(params) {
    try {
      const { data } = await this.instance.get(
        `/Account/GetPasswordResetCode`,
        { params }
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async verifyOTP(credentials) {
    try {
      const { data } = await this.instance.post(
        "/Account/ResetPasswordByCode",
        credentials
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }
}

export default Auth;
