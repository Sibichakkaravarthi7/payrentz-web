import { getHostAPIUrl } from "@/appConfig";
import axios from "axios";
import { getUserToken } from "./Constants";

const makeDeleteRequest = async (endpoint, params = {}, headers = {}) => {
  const userToken = getUserToken();
  const { data } = await axios.delete(
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

export default makeDeleteRequest;
