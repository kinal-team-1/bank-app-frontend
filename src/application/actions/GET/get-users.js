import axios from "axios";
import { API_URL } from "../../../config";
import {ServerError, FetchError, ClientError} from "./get-services";

/**
 *
 * @param queryKey
 * @param signal
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export function getUsers({ queryKey, signal }) {
  const [_, { locale, params }] = queryKey;

  return axios
    .get(`${API_URL}/user?${params}`, {
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
