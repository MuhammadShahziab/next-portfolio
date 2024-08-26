import axios from "axios";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function addData(currentTab, formData) {
  try {
    const { data } = await axios.post(
      `/api/${currentTab}/post`,
      { formData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      return data;
    } else {
      toast.error(data.message);
      return data;
    }
  } catch (error) {
    console.log(error, "post function");
  }
}

export async function getData(currentTab) {
  try {
    const { data } = await axios.get(`/api/${currentTab}/get`);
    return data.data;
  } catch (error) {
    console.log(error, "get function");
  }
}

export async function updateData(currentTab, formData) {
  try {
    const { data } = await axios.put(
      `${apiUrl}/api/${currentTab}/update`,
      { formData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.success) {
      toast.success("Updated");
      return data;
    } else {
      return toast.error("Failed");
    }
  } catch (error) {
    console.log(error, "update function");
  }
}

export async function deleteData(currentTab, id) {
  try {
    const { data } = await axios.delete(`/api/${currentTab}/delete/${id}`);
    console.log(data, "services file delete method");
    if (data.success) {
      toast.success(data.message);
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error, "delete function");
  }
}

export const getSingleData = async (currentTab, id) => {
  try {
    const { data } = await axios.get(`/api/${currentTab}/${id}`);
    if (data.success) {
      return data;
    }
  } catch (error) {
    console.log(error, "server error ");
  }
};
