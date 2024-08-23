import { ErrorCode } from "./ErrorCodes";
import {
  BadRequestResult,
  ErrorResult,
  ServiceUnavailableErrorResult,
  InternalServerErrorResult,
  UnauthorizedErrorResult,
  NotFoundResult,
  UnprocessableEntityResult,
} from "./Errors";
import { HttpStatusCode } from "./HttpStatusCode";

class ResponseBuilder {
  static badRequest(code, description) {
    const errorResult = new BadRequestResult(code, description);
    return ResponseBuilder._returnAs(errorResult, HttpStatusCode.BAD_REQUEST);
  }

  static serviceUnavailable(description) {
    const errorResult = new ServiceUnavailableErrorResult(
      ErrorCode.ServiceUnavailableError,
      description
    );
    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.SERVICE_UNAVAILABLE
    );
  }

  static internalServerError(code, description) {
    const errorResult = new InternalServerErrorResult(code, description);
    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }

  static unauthorizedErrorResult(code, description) {
    const errorResult = new UnauthorizedErrorResult(code, description);
    return ResponseBuilder._returnAs(errorResult, HttpStatusCode.UN_AUTHORIZED);
  }

  static notFound(code, description) {
    const errorResult = new NotFoundResult(code, description);
    return ResponseBuilder._returnAs(errorResult, HttpStatusCode.NOT_FOUND);
  }

  static unporcessableEntity(code, description) {
    const errorResult = new UnprocessableEntityResult(code, description);
    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.UNPROCESSIBLE_ENTITY
    );
  }

  static ok(result) {
    return ResponseBuilder._returnAs(result, HttpStatusCode.OK);
  }

  static created(result) {
    return ResponseBuilder._returnAs(result, HttpStatusCode.CREATED);
  }

  static noContent(result) {
    return ResponseBuilder._returnAs(result, HttpStatusCode.NO_CONTENT);
  }

  static _returnAs(result, statusCode) {
    const bodyObject =
      result instanceof ErrorResult
        ? { success: false, error: result }
        : { success: true, status: statusCode, data: result };

    return bodyObject;
  }
}

export default ResponseBuilder;
