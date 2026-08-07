import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast } from "../helper/helper";
import { adminApi } from "../helper/api";

const adminStore = create((set) => ({
  //! admin-register
  adminRegisterLoading: false,
  adminRegisterRequest: async (data) => {
    try {
      set({ userRegisterLoading: true });
      let res = await adminApi.post("/register", data);

      if (res?.data?.success === true) {
        set({ adminRegisterLoading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ adminRegisterLoading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Something went wrong");
      set({ adminRegisterLoading: false });
      return false;
    }
  },

  //! admin-login
  adminLoginLoading: false,
  adminLoginRequest: async (data) => {
    try {
      set({ adminLoginLoading: true });
      let res = await adminApi.post("/login", data);

      if (res?.data?.success === true) {
        set({ adminLoginLoading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ adminLoginLoading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Something went wrong");
      set({ adminLoginLoading: false });
      return false;
    }
  },

  //! admin-verify
  adminVerifyRequest: async () => {
    try {
      await adminApi.get("/verify");

      return true;
    } catch (error) {
      console.log(error);
      if (error?.status === 401) {
        window.location.href = `${import.meta.env.BASE_URL}/login`;
      }
      ErrorToast("Error: Admin verification failed");
      return false;
    }
  },

  //! admin
  admin: null,
  adminRequest: async () => {
    try {
      let res = await adminApi.get("/");

      if (res?.data?.success === true) {
        set({ admin: res?.data?.data });

        return true;
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Something went wrong");
      return false;
    }
  },

  //! admin-update
  adminUpdateLoading: false,
  adminUpdateRequest: async (data) => {
    try {
      set({ adminUpdateLoading: true });
      let res = await adminApi.put("/update", data);

      if (res?.data?.success === true) {
        set({ adminUpdateLoading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ adminUpdateLoading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      set({ adminUpdateLoading: false });
      ErrorToast("Something went wrong");
      return false;
    }
  },

  //! admin-logout
  adminLogoutRequest: async () => {
    try {
      let res = await adminApi.get("/logout");

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
}));

export default adminStore;
