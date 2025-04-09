export const getHostAPIUrl = () => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "production") return "";
  if (process.env.NEXT_PUBLIC_NODE_ENV === "uat")
    return "https://production-v2-api.payrentz.com";
  // return "https://production-v2-api.payrentz.com";
  return "https://staging-v2-api.payrentz.com";
  // return "https://uat-v2-api.payrentz.com";

  // return "http://192.168.0.121:8000"
};
