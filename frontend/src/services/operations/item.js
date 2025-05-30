import axios from "axios";
import { ADD_ITEM_API, GET_ALL_ITEMS_API, GET_ITEM_DATA_API } from "../apis";
import { toast } from "react-toastify";

async function addItem(formData, token) {
  try {
    const res = await axios.post(ADD_ITEM_API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (!res.data.success) {
      throw new Error("Cannot add item");
    }
    toast.success("Item Listed", {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
    console.log(res.data.data)
    return res.data.success;
  } catch (err) {}
}

async function getItemsData(token, search = "", categories = []) {
  try {
    const categoryQuery =
      categories.length > 0 ? `&categories=${categories.join(",")}` : "";
    const res = await axios.get(
      `${GET_ALL_ITEMS_API}?search=${search}${categoryQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.data.success) {
      throw new Error("Cannot get data");
    }
    return res.data.data;
  } catch (err) {
    console.log(err);
    toast.error("Cannot fetch Data", {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
  }
}

async function getItemData(id, token) {
  try {
    const res = await axios.get(GET_ITEM_DATA_API, {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Cannot get Item Data");
    }
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Cannot fetch Item Data", {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
  }
}
export { addItem, getItemsData, getItemData };
