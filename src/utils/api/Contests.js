import { serializeError } from "./Errors";
import ProtectedApi from "./ProtectedApi";
import ResponseBuilder from "./ResponseBuilder";

class Contests extends ProtectedApi {
  constructor(headers) {
    super(headers);
  }

  async upcomingContestListByVenueId(params) {
    try {
      const { data } = await this.instance.get(`/Contest/GetContestList`, {
        params,
      });

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async pastContestListByVenueId(params) {
    try {
      const { data } = await this.instance.get(`/Contest/GetContestHistoryList`, {
        params,
      });

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async getOrganizationVendors(params) {
    try {
      const { data } = await this.instance.get(`/Vendor/GetOrganizationVendors`, {
        params,
      });

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  // async fetchUpcomingCampaignListByVenueId(params) {
  //   try {
  //     const { data } = await this.instance.get(`/Compaign/ActiveCompaignList`, {
  //       params,
  //     });

  //     return data;
  //   } catch (error) {
  //     throw serializeError(error);
  //   }
  // }

  // async fetchCustomersListByOrganizationId(params) {
  //   try {
  //     const { data } = await this.instance.get(`/Account/GetCustomers`, {
  //       params,
  //     });

  //     return data;
  //   } catch (error) {
  //     throw serializeError(error);
  //   }
  // }

  async addNewCampaign(
    // type,
    // name,
    // title,
    // startTime,
    // description,
    // receiver,
    // receipient
    payload
  ) {
    try {
      // let payload = {
      //   OrgId: "NivyWebApp",
      //   venueId: localStorage.getItem("selectedVenueId"),
      //   CampaignType: type,
      //   compaignName: name,
      //   Title: title,
      //   startDateTime: startTime,
      //   Decription: description,
      //   receiverId: receipient,
      //   forAllCustomers: receiver == "true" || receiver == true,
      // };

      // if (receiver == "false" || receiver == false) {
      //   payload.customerOrganizationId = "UNA_LIONS";
      // }

      const { data } = await this.instance.post(
        "/Compaign/AddNewCompaign",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updateExistingCampaign(payload) {
    try {
      // let payload = {
      //   id: id,
      //   orgId: "NivyWebApp",
      //   venueId: localStorage.getItem("selectedVenueId"),
      //   campaignType: type,
      //   compaignName: name,
      //   title: title,
      //   startDateTime: startTime,
      //   decription: description,
      //   receiverId: receiver == false || receiver == "false" ? receipient : "",
      //   forAllCustomers: receiver == "true",
      // };

      // if (receiver == "false" || receiver == false) {
      //   payload.customerOrganizationId = "UNA_LIONS";
      // }

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

export default Contests;
