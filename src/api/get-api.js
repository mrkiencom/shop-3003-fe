import axios from "axios";
export function GetApi(token, host) {
  return axios({
    method: "Get",
    url: `https://shop-3003.herokuapp.com/${host}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
}
