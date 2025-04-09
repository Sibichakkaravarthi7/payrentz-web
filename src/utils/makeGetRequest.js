import { getHostAPIUrl } from "@/appConfig";
import axios from "axios";
import { getUserToken } from "./Constants";

const makeGetRequest = async (endpoint, params = {}, headers = {}) => {
  const userToken = getUserToken();
  const { data } = await axios.get(
    getHostAPIUrl() + endpoint,
    {
      headers: {
        Authorization: userToken ? `Token ${userToken}` : undefined,
        ...headers,
      },
      params: params,
    },
    []
  );
  return data;
};

export default makeGetRequest;
