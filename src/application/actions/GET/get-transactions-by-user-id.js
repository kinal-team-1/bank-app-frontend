import axios from "axios";
import { API_URL } from "../../../config";
import { ClientError, FetchError, ServerError } from "./get-services";

export function getTransactionsByUserId({ queryKey, signal }) {
  const [, { locale, params, userId }] = queryKey;

  return axios
    .get(`${API_URL}/transaction/user/${userId}?${params}`, {
      headers: {
        "Accept-Language": locale,
      },
      signal,
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
