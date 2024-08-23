import { serializeError } from "./Errors";
import ProtectedApi from "./ProtectedApi";

class Order extends ProtectedApi {
  constructor(headers) {
    super(headers);
  }

  async markOrderCancelled(payload) {
    try {
      const { data } = await this.instance.post(
        `/Vendor/MarkOrderCancelled`,
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async markOrderCompleted(orderId, params) {
    try {
      const { data } = await this.instance.get(
        "/Vendor/MarkOrderCompleted/" + orderId,
        {
          params,
        }
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async markProductRefund(payload) {
    try {
      const { data } = await this.instance.post(
        `/Venue/MarkProductRefund`,
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default Order;
