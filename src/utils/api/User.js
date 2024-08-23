import { serializeError } from "./Errors";
import ProtectedApi from "./ProtectedApi";

class User extends ProtectedApi {
  constructor(headers) {
    super(headers);
  }

  async getManagedVenues() {
    try {
      const { data } = await this.instance.get(`/Vendor/GetVendorVenues`);

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async getManagedVendors(params) {
    try {
      const { data } = await this.instance.get(
        `/Vendor/GetOrganizationVendors`,
        {
          params,
        }
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async fetchUsersListByOrganizationId(params) {
    try {
      const { data } = await this.instance.get(
        `/Associate/ListAssociateAccounts`
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async addNewUser(payload) {
    try {
      const { data } = await this.instance.post(
        "/Associate/AddAssociateAccount",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updateExistingUser(payload) {
    try {
      const { data } = await this.instance.put(
        "/Associate/EditAssociateAccount",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async deleteExistingUser(params) {
    try {
      const { data } = await this.instance.delete(
        "/Associate/DeleteAssociateAccount",
        {
          params
        }
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }
  async getCurrentUserDetails(params) {
    try {
      const { data } = await this.instance.get(
        `/Associate/GetAssociateAccount`,
        {
          params,
        }
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }
}

export default User;
