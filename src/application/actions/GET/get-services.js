import axios from "axios";
import { API_URL } from "../../../config";

export class ClientError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "ClientError";
  }
}

export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.errors = [];
    this.name = "ServerError";
  }
}

export class FetchError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 0;
    this.errors = [];
    this.name = "FetchError";
  }
}

/**
 *
 * @param queryKey
 * @param signal
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export function getServices({ queryKey, signal }) {
  const [_, { locale }] = queryKey;

  return axios
    .get(`${API_URL}/service?page=-1&limit=-1`, {
      signal,
      headers: {
        "Accept-Language": locale,
      },
    })
    .then((res) => [res.data.data, res.data.message, res.status])
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        throw new FetchError(error.message);
      }

      if (error.response.status < 500) {
        throw new ClientError(
          error.response.data.message,
          error.response.status,
          error.response.data.errors,
        );
      }

      throw new ServerError(error.message);
    });
}
