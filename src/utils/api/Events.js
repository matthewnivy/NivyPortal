import { serializeError } from "./Errors";
import ProtectedApi from "./ProtectedApi";
import ResponseBuilder from "./ResponseBuilder";

class Events extends ProtectedApi {
  constructor(headers) {
    super(headers);
  }

  async fetchEventsListByVenueId(params) {
    try {
      const { data } = await this.instance.get(`/Event/EventListByVenueId`, {
        params,
      });

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async fetchUpcomingCampaignListByVenueId(params) {
    try {
      const { data } = await this.instance.get(`/Compaign/ActiveCompaignList`, {
        params,
      });

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async fetchCustomersListByOrganizationId(params) {
    try {
      const { data } = await this.instance.get(`/Account/GetCustomers`, {
        params,
      });

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async addNewEvent(payload) {
    try {
      const { data } = await this.instance.post("/Event/AddEvent", payload);

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updateExistingEvent(payload) {
    try {
      const { data } = await this.instance.post("/Event/UpdateEvent", payload);

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async getUserCheckInDetails(payload) {
    try {
      const { data } = await this.instance.post(
        `/Event/GetUserCheckIn`,
        payload
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

export default Events;
