import { serializeError } from "./Errors";
import ProtectedApi from "./ProtectedApi";
import ResponseBuilder from "./ResponseBuilder";

class Rewards extends ProtectedApi {
  constructor(headers) {
    super(headers);
  }

  async fetchRewardsListByVenueId(params) {
    try {
      const { data } = await this.instance.get(`/Venue/GetRewardList`, {
        params,
      });

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async fetchRewardsListByUserPhoneNumber(params) {
    try {
      const { data } = await this.instance.get(
        `/Venue/GetRewardListByUserNumber`,
        {
          params,
        }
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async addNewCampaign(
    type,
    name,
    title,
    startTime,
    description,
    receiver,
    receipient
  ) {
    try {
      let payload = {
        orgId: "NivyWebApp",
        venueId: localStorage.getItem("selectedVenueId"),
        campaignType: type,
        compaignName: name,
        title: title,
        startDateTime: startTime,
        decription: description,
        receiverId: receipient,
        forAllCustomers: receiver == "true" || receiver == true,
      };

      if (receiver == "false" || receiver == false) {
        payload.customerOrganizationId = "UNA_LIONS";
      }

      const { data } = await this.instance.post(
        "/Compaign/AddNewCompaign",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updateExistingCampaign(
    id,
    type,
    name,
    title,
    startTime,
    description,
    receiver,
    receipient
  ) {
    try {
      let payload = {
        id: id,
        orgId: "NivyWebApp",
        venueId: localStorage.getItem("selectedVenueId"),
        campaignType: type,
        compaignName: name,
        title: title,
        startDateTime: startTime,
        decription: description,
        receiverId: receiver == false || receiver == "false" ? receipient : "",
        forAllCustomers: receiver == "true",
      };

      if (receiver == "false" || receiver == false) {
        payload.customerOrganizationId = "UNA_LIONS";
      }

      const { data } = await this.instance.post(
        "/Compaign/UpdateCompaign",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
      // throw serializeError(error);
    }
  }
}

export default Rewards;
