import Services from "@/app/models/Services";
import Category from "@/app/models/Category";
import Project from "@/app/models/Project";
import Contact from "@/app/models/Contact";
import ConnectDB from "@/app/db/Connect";
import Header from "@/app/models/Header";
import About from "@/app/models/About";
import Tech from "@/app/models/Tech";

const MODELS = {
  category: Category,
  services: Services,
  services: Services,
  projects: Project,
  contact: Contact,
  header: Header,
  tech: Tech,
  about: About,
};

function convertIdsToString(input) {
  // Check if input is an array
  if (Array.isArray(input)) {
    // Iterate over each element in the array
    return input.map(convertIdsToString);
  }

  // Check if input is an object
  if (input && typeof input === "object") {
    // Iterate over each key-value pair in the object
    for (let key in input) {
      // Check if the value is an _id
      if (key === "_id") {
        // Convert _id to string
        input[key] = input[key].toString();
      } else {
        // Recursively call convertIdsToString for non-_id values
        input[key] = convertIdsToString(input[key]);
      }
    }
  }

  // Return the updated input
  return input;
}

export async function fetchPageData(page) {
  try {
    await ConnectDB();

    const data = await MODELS[page].find({}).lean();

    return convertIdsToString(data);
  } catch (error) {
    console.log("Failed to fetch data");
  }
}
