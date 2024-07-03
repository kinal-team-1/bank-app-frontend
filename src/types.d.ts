import {
  ClientError,
  ServerError,
} from "./application/actions/GET/get-services";

export type CustomError = ClientError | ServerError;
