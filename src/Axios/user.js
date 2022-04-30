import Axios from "axios";

const url = "http://localhost:4000";

// this file will send requests realted to user and its authentication

// authentication

// check user is authenticated still
export const checkLoggedIn = async () => {
  let data = "";
  await Axios({
    method: "GET",
    withCredentials: true,
    url: url + "/user",
  }).then((res) => {
    console.log(res.data);
    data = res.data.success;
    // return res.data;
    // dispatch(login(res.data));
  });
  return data;
};

// user request
