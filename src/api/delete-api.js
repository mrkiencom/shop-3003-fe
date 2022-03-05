import axios from "axios";

export function deleteApi(token, host, id) {
  return axios({
    method: "DELETE",
    url: `https://shop-3003.herokuapp.com/${host}/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
