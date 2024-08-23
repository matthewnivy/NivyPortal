// import Cookies from "js-cookie";

// import { apiConfig } from "config/index";

import { apiConfig } from "../../config/index";
import HttpClient from "./HttpClient";

class ProtectedApi extends HttpClient {
  constructor(headers) {
    super(apiConfig.baseUrl);

    let token = localStorage.getItem("token");
    // const token = Cookies.get("token");

    this._headers = {
      // Accept: "application/json",
      // "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Credentials": "true",
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
    };

    this._initializeRequestInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this._handleRequest);
  };

  _handleRequest = (config) => {
    config.headers = this._headers;

    return config;
  };

  get headers() {
    return this._headers;
  }
}

export default ProtectedApi;
