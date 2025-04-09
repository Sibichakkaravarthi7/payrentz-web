import { getHostAPIUrl } from "@/appConfig";
import axios from "axios";
import { getUserToken } from "./Constants";

const makePutRequest = async (endpoint, body, headers = {}) => {
  const userToken = getUserToken();
  const { data } = await axios.put(getHostAPIUrl() + endpoint, body, {
    headers: {
      Authorization: userToken ? `Token ${userToken}` : undefined,
      ...headers,
    },
  });
  return data;
};

export default makePutRequest;
