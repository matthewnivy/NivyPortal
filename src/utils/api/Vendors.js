import { serializeError } from "./Errors";
import ProtectedApi from "./ProtectedApi";

class Vendors extends ProtectedApi {
  constructor(headers) {
    super(headers);
  }

  async getManagedVendorsByDateTime(params) {
    try {
      const { data } = await this.instance.get(
        `/Vendor/GetManagedVendors/month`,
        {
          params,
        }
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async getVendorOrders(payload) {
    try {
      const { data } = await this.instance.post(
        "/Vendor/GetVendorOrdersByFilter",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async fetchVendorCategoriesWithDetails(payload) {
    try {
      const { data } = await this.instance.post(
        "/Vendor/ListStockItems",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async fetchListStockItemOptions(params) {
    try {
      const { data } = await this.instance.get("/Vendor/ListStockItemOptions", {
        params,
      });

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async markItemOutStock(payload) {
    try {
      const { data } = await this.instance.post(
        "/Vendor/MarkItemOutOfStock",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async markOptionItemOutStock(payload) {
    try {
      const { data } = await this.instance.post(
        "/Vendor/MarkOptionItemOutOfStock",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async addNewVendor(payload) {
    try {
      const { data } = await this.instance.post(
        "/Vendor/AddNewVendor",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async addNewProduct(payload) {
    try {
      const { data } = await this.instance.post("/Vendor/AddNewItem", payload);

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async addProductOptions(payload) {
    try {
      const { data } = await this.instance.post("/Vendor/AddItemOptions", payload);

      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default Vendors;
