import axios from "axios";
import { getUser } from "../setStorage/localUser";

const baseUrl = "http://localhost:4000";

// this fucntion will get all the items

export const getAllItems = async () => {
  const url = baseUrl + "/items/getAllItems";
  let data = "something";
  await axios({
    method: "GET",
    withCredentials: true,
    url: url,
  }).then((res) => {
    console.log("🚀 ~ file: items.js ~ line 14 ~ getAllItems ~ res", res);
    data = res.data;
    // data = res.data.items;
    console.log("from axios", data);
    return data;
  });
  return data;
};

// this function will remove the particular item
export const removeProduct = async (itemObject) => {
  const url = baseUrl + "/items/removeProduct";
  let data = {
    _id: itemObject._id,
    user_id: getUser().payload.id,
    // username:getUser().payload.username
  };
  await axios({
    method: "post",
    withCredentials: true,
    url: url,
    data: data,
  }).then((res) => {
    console.log(res);
  });
};

// this function will update the particular item

export const updateItem = async (itemObject) => {
  const url = baseUrl + "/items/updateProduct";

  let data = {
    _id: itemObject._id,
    itemName: itemObject.name,
    itemCode: itemObject.code,
    price: itemObject.price,
  };
  console.log("🚀 ~ file: items.js ~ line 54 ~ updateItem ~ data", data);
  await axios({
    method: "POST",
    withCredentials: true,
    url: url,
    data: data,
  }).then((res) => {
    console.log(res);
  });
};
console.log(
  "🚀 ~ file: items.js ~ line 63 ~ updateItem ~ updateItem",
  updateItem
);
