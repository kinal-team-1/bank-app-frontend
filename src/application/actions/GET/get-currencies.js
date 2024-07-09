import axios from "axios";
import { API_URL } from "../../../config";
import { ClientError, FetchError, ServerError } from "./get-services";

export function getCurrencies() {
  return axios
    .get(`${API_URL}/currency`)
    .then((res) => {
      console.log(res);
      return [res.data.data, res.data.message, res.status];
    })
    .catch((error) => {
      console.log(error);
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
