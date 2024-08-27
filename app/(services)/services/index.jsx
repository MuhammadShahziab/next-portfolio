import axios from "axios";
import toast from "react-hot-toast";
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
    const { data } = await axios.get(`/api/${currentTab}/get`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return data.data;
  } catch (error) {
    console.log(error, "get function");
  }
}

export async function updateData(currentTab, formData) {
  try {
    const { data } = await axios.put(
      `/api/${currentTab}/update`,
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
