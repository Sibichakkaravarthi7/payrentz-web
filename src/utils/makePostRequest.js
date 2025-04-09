import { getHostAPIUrl } from "@/appConfig";
import axios from "axios";
import { getUserToken } from "./Constants";

const makePostRequest = async (endpoint, body, headers) => {
  const userToken = getUserToken();
  const { data } = await axios.post(getHostAPIUrl() + endpoint, body, {
    headers: {
      Authorization: userToken ? `Token ${userToken}` : undefined,
      ...headers,
    },
  });
  return data;
};

export default makePostRequest;
