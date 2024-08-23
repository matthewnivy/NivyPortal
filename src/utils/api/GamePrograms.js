import { serializeError } from "./Errors";
import ProtectedApi from "./ProtectedApi";
import ResponseBuilder from "./ResponseBuilder";

class GamePrograms extends ProtectedApi {
  constructor(headers) {
    super(headers);
  }

  async fetchGamePrograms(params) {
    try {
      const { data } = await this.instance.get(
        `/GamePrograms/GetGameProgramsListNew`,
        {
          params,
        }
      );

      return data;
    } catch (error) {
      throw serializeError(error);
    }
  }

  async addNewGameProgram(payload) {
    try {
      const { data } = await this.instance.post(
        "/GamePrograms/CreateGameProgram",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updateExistingGameProgram(payload) {
    try {
      const { data } = await this.instance.post(
        "/GamePrograms/UpdateGameProgram",
        payload
      );

      return data;
    } catch (error) {
      return error.response.data;
      // throw serializeError(error);
    }
  }
  async deleteExistingGameProgram(params) {
    try {
      const { data } = await this.instance.delete(
        "/GamePrograms/DeleteGameProgram",
        {
          params,
        }
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default GamePrograms;
