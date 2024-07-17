import axios from "axios";
import { API_URL } from "../../../config";
import { ClientError, FetchError, ServerError } from "../GET/get-services";

export function deleteByServiceId({ serviceId, locale }) {
  console.log({ serviceId });
  return axios
    .delete(`${API_URL}/service/${serviceId}`, {
      headers: {
        "Accept-Language": locale,
      },
    })
    .then((res) => {
      return [res.data.data, res.data.message, res.status];
    })
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
