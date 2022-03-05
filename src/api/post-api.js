import axios from "axios";
export function PostApi(token, body, host) {
  return axios({
    method: "POST",
    url: `https://shop-3003.herokuapp.com/${host}`,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
}
export function PatchApi(
  token = JSON.parse(localStorage.getItem("token")),
  body,
  host
) {
  return axios({
    method: "PATCH",
    url: `https://shop-3003.herokuapp.com/${host}`,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
