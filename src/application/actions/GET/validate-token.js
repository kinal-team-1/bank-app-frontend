import axios from "axios";
import { API_URL } from "../../../config";

export function validateToken(token) {
  return axios
    .get(`${API_URL}/auth/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => [res.data.data, res.data.message])
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      return [];
    });
}
