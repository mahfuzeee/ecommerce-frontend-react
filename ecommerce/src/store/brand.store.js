import { brandApi } from "../helper/api";
import { create } from "zustand";
import { ErrorToast, SuccessToast } from "../helper/helper";

const brandStore = create((set) => ({
  //All brand request
  allBrand: [],
  allBrandRequest: async (page, limit) => {
    try {
      const res = await brandApi.get(`/?page=${page}&limit=${limit}`);
      if (res?.data?.success === true) {
        set({ allBrand: res?.data?.data });
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

export default brandStore;
