import useAppStore from "@/Store/Store";

const getUserToken = () => {
  const zustandToken = useAppStore.getState().user_token;
  if (zustandToken) {
    return zustandToken;
  }
  const localStorageUserToken = localStorage.getItem("token");
  if ([undefined, "undefined", null].includes(localStorageUserToken)) {
    return null;
  }

  return localStorageUserToken;
};

export default getUserToken;
