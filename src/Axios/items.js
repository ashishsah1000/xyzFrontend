import axios from "axios";
import { getUser } from "../setStorage/localUser";

const baseUrl = "http://localhost:4000";


export const getAllItems = async () => {
  const url = baseUrl + "/items/getAllItems";
  let data = "something";
  await axios({
    method: "GET",
    withCredentials: true,
    url: url,
  }).then((res) => {
    data = res.data.items;
    console.log("from axios",data);
    return res;
  });
  return data;
};

export const removeProduct = async (itemObject)=>{
  const url = baseUrl + "/items/removeProduct";
  let data = {
    _id:itemObject._id,
    username:getUser().payload.username
  };
  await axios({
    method:"post",
    withCredentials: true,
    url:url,
    data:data
  }).then((res)=>{
      console.log(res);
  })
  
}