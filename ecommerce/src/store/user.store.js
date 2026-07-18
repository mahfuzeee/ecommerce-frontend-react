import { create } from "zustand";
import { userApi } from "../helper/api";
import { ErrorToast, SuccessToast } from "../helper/helper";

const userStore = create((set) => ({
  //! user-register
  userRegisterLoading: false,
  userRegisterRequest: async (data) => {
    try {
      set({ userRegisterLoading: true });
      const res = await userApi.post("/register", data);
      if (res?.data?.success === true) {
        set({ userRegisterLoading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ userRegisterLoading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      set({ userRegisterLoading: false });
      ErrorToast("Something went wrong");
      return false;
    }
  },

  //! user-login
  userLoginLoading: false,
  userLoginRequest: async (data) => {
    try {
      set({ userLoginLoading: true });
      const res = await userApi.post("/login", data);
      if (res?.data?.success === true) {
        set({ userLoginLoading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ userLoginLoading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      set({ userLoginLoading: false });
      ErrorToast("Something went wrong");
      return false;
    }
  },

  //user
  user: null,
  userLoading: false,
  userRequest: async () => {
    try {
      set({ userLoading: true });
      const res = await userApi.get("/");
      if (res?.data?.success === true) {
        set({ user: res?.data?.data });
        set({ userLoading: false });
        return true;
      } else {
        set({ userLoading: false });
        return false;
      }
    } catch (error) {
      console.log(error);
      set({ userLoading: false });
      ErrorToast("Something went wrong");
      return false;
    }
  },

  //user-logout
  userLogoutRequest: async () => {
    try {
      const res = await userApi.get("/logout");
      if (res?.data?.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Something went wrong");
      return false;
    }
  },

  //Verify User
  userVerifyRequest: async () => {
    try {
      const res = await userApi.get("/verify");
      if (res?.data?.success === true) {
        return true;
      } else {
        window.location.href = "/login";
        return false;
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Something went wrong");
      return false;
    }
  },

  //update user
  userUpdateLoading: false,
  userUpdateRequest: async (data) => {
    try {
      set({ userUpdateLoading: true });
      const res = await userApi.put("/update", data);
      if (res?.data?.success === true) {
        set({ userUpdateLoading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Something went wrong");
      return false;
    }
  },
}));

export default userStore;
