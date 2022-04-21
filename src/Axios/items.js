import axios from "axios";
const baseUrl = "http://localhost:4000";

export const getAllItems = async () => {
  const url = baseUrl + "/items/getAllItems";
  let data = "something";
  await axios({
    method: "GET",
    withCredentials: true,
    url: url,
  }).then((res) => {
    data = res.data[0];
    return res;
  });
  return data;
};
