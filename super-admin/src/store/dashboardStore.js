import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast } from "../helper/helper";
import { dashboardApi } from "../helper/api";

const dashboardStore = create((set) => ({
  dashboardLoading: false,
  dashboardData: null,
  dashboardRequest: async () => {
    try {
      set({ dashboardLoading: true });
      let res = await dashboardApi.get("/");

      if (res?.data?.success === true) {
        set({ dashboardLoading: false });
        set({ dashboardData: res?.data?.data });
        return true;
      } else {
        set({ dashboardLoading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      ErrorToast("Something went wrong");
      set({ dashboardLoading: false });
      return false;
    }
  },
}));

export default dashboardStore;
