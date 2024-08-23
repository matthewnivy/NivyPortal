import axios from "axios";

import { ErrorCode } from "./ErrorCodes";
import {
    BadRequestResult,
    HttpErrorResult,
    InternalServerErrorResult,
    ServiceUnavailableErrorResult,
    UnauthorizedErrorResult,
    UnprocessableEntityResult,
} from "./Errors";
import { HttpStatusCode } from "./HttpStatusCode";

class HttpClient {
    static cancelRequest = axios.CancelToken.source();

    constructor(baseURL) {
        this.instance = axios.create({
            baseURL,
        });
        // this._initializeResponseInterceptor();
    }

    _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            (response) => response,
            this._handleError
        );
    };

    _handleError = (error) => {
        let response = error.response;

        if (response?.status === HttpStatusCode.SEE_OTHER) {
            window.location.assign(response.data.location);

            return null;
        }

        if (response?.status === HttpStatusCode.UN_AUTHORIZED)
            throw new UnauthorizedErrorResult(
                ErrorCode.UnauthorizedError,
                response.data.message
            );

        if (response?.status === HttpStatusCode.BAD_REQUEST)
            throw new BadRequestResult(
                ErrorCode.BadRequestError,
                response.data
            );

        if (response?.status === HttpStatusCode.SERVICE_UNAVAILABLE)
            throw new ServiceUnavailableErrorResult(
                ErrorCode.ServiceUnavailableError,
                JSON.stringify(
                    response.data?.errors ?? { error: [response.data.message] }
                )
            );

        if (response?.status === HttpStatusCode.INTERNAL_SERVER_ERROR)
            throw new InternalServerErrorResult(
                ErrorCode.InternalServerError,
                response.data
            );

        if (response?.status === HttpStatusCode.UNPROCESSIBLE_ENTITY) {
            throw new UnprocessableEntityResult(
                ErrorCode.UnprocessableEntity,
                JSON.stringify(
                    response.data?.errors ?? { error: [response.data.message] }
                )
            );
        }

        throw new HttpErrorResult(
            ErrorCode.HttpError,
            response?.statusText || JSON.stringify(response)
        );
    };
}

export default HttpClient;
