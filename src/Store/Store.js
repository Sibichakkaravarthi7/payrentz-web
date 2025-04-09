import { create } from "zustand";

const useAppStore = create((set) => ({
  user_token: "",
  permissions: null,
  user_type: "",
  pincode: "",
  city: "",
  user_data: null,
  kyc_step_completed: null,
  isLocationChangeOn: false,
  openLoginModal: () => undefined,
  openLocationModal: () => undefined,
  summaryEnabled: false,
  //Actions
  setUserToken: ({ token }) =>
    set(() => ({
      user_token: token,
    })),
  setUserDataAndToken: ({ user_data, token, kyc_step_completed }) =>
    set(() => ({
      user_data: user_data,
      user_token: token,
      kyc_step_completed: kyc_step_completed,
    })),
  setLocation: ({ pincode, city }) =>
    set(() => ({
      pincode: pincode,
      city: city,
    })),
  setUserType: ({ user_type }) =>
    set(() => ({
      user_type,
    })),
  setLoginModalOpener: ({ fn }) =>
    set(() => ({
      openLoginModal: fn,
    })),
  setLocationModalOpener: ({ fn }) =>
    set(() => ({
      openLocationModal: fn,
    })),
  setIsLocationChangeOn: ({ val }) =>
    set(() => ({
      isLocationChangeOn: val,
    })),
  setSummaryEnabled: ({ se }) =>
    set(() => ({
      summaryEnabled: se,
    })),
}));

export default useAppStore;
