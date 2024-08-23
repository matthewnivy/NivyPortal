import { ErrorCode } from "./ErrorCodes";
import ResponseBuilder, { ErrorResponseBody } from "./ResponseBuilder";
export class ErrorResult extends Error {
  constructor(code, description) {
    super(description);
  }
}

export class BadRequestResult extends ErrorResult {}

export class UnauthorizedErrorResult extends ErrorResult {}

export class ConfigurationErrorResult extends ErrorResult {}

export class InternalServerErrorResult extends ErrorResult {}

export class ServiceUnavailableErrorResult extends ErrorResult {}

export class HttpErrorResult extends ErrorResult {}

export class NotFoundResult extends ErrorResult {}

export class UnprocessableEntityResult extends ErrorResult {}

export const serializeError = (error) => {
  if (error instanceof InternalServerErrorResult) {
    return ResponseBuilder.internalServerError(error.code, error.description);
  }

  if (error instanceof BadRequestResult) {
    return ResponseBuilder.badRequest(error.code, error.description);
  }

  if (error instanceof UnauthorizedErrorResult) {
    return ResponseBuilder.unauthorizedErrorResult(
      error.code,
      error.description
    );
  }

  if (error instanceof UnprocessableEntityResult) {
    return ResponseBuilder.unporcessableEntity(error.code, error.description);
  }

  if (error instanceof ServiceUnavailableErrorResult) {
    return ResponseBuilder.serviceUnavailable(error.description);
  }

  return ResponseBuilder.internalServerError(
    ErrorCode.HttpError,
    JSON.stringify(error)
  );
};
