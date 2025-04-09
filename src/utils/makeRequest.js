import { getHostAPIUrl } from "@/appConfig";
import axios from "axios";

export const makeRequest = async ({
  url,
  method = "GET",
  data = {},
  headers = {},
  params = {},
}) => {
  try {
    const response = await axios({
      url: `${getHostAPIUrl()}${url}`,
      method,
      data,
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw to allow handling in outer context
  }
};
