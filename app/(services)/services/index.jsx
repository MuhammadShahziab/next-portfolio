import axios from "axios";
import toast from "react-hot-toast";

// Helper function for showing notifications
const showToast = (success, message) => {
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

// Common headers for requests
const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

// Add Data
export async function addData(currentTab, formData) {
  try {
    const { data } = await axios.post(
      `/api/${currentTab}/post`,
      { formData },
      { headers }
    );

    showToast(data.success, data.message);
    return data;
  } catch (error) {
    console.error("Error in addData:", error);
    toast.error("An error occurred while adding data.");
  }
}

// Get Data
export async function getData(currentTab) {
  try {
    const { data } = await axios.get(`/api/${currentTab}/get`, {
      headers,
    });
    return data.data;
  } catch (error) {
    console.error("Error in getData:", error);
    toast.error("An error occurred while fetching data.");
  }
}

// Update Data
export async function updateData(currentTab, formData) {
  try {
    const { data } = await axios.put(
      `/api/${currentTab}/update`,
      { formData },
      { headers }
    );

    showToast(
      data.success,
      data.success ? "Updated successfully." : "Failed to update."
    );
    return data;
  } catch (error) {
    console.error("Error in updateData:", error);
    toast.error("An error occurred while updating data.");
  }
}

// Delete Data
export async function deleteData(currentTab, id) {
  try {
    const { data } = await axios.delete(`/api/${currentTab}/delete/${id}`, {
      headers,
    });

    showToast(data.success, data.message);
    return data;
  } catch (error) {
    console.error("Error in deleteData:", error);
    toast.error("An error occurred while deleting data.");
  }
}

// Get Single Data
export async function getSingleData(currentTab, id) {
  try {
    const { data } = await axios.get(`/api/${currentTab}/${id}`, {
      headers,
    });

    if (data.success) {
      return data;
    } else {
      toast.error("Failed to fetch the data.");
    }
  } catch (error) {
    console.error("Error in getSingleData:", error);
    toast.error("An error occurred while fetching data.");
  }
}
