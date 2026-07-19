import { create } from "zustand";
import { cartApi } from "../helper/api";
import { ErrorToast, SuccessToast } from "../helper/helper";

//Cart Store start
const cartStore = create((set) => ({
  //! cart
  cartLoading: false,
  cart: [],
  getCart: async () => {
    set({ cartLoading: true });
    try {
      const res = await cartApi.get("/");
      if (res?.data?.success === true) {
        set({ cart: res?.data?.data });
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      set({ cartLoading: false });
    }
  },

  //! Add to cart item
  addCart: async (data) => {
    set({ cartLoading: true });
    try {
      const res = await cartApi.post("/", data);
      if (res?.data?.success === true) {
        set({ cartLoading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ cartLoading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (error) {
      console.error("Failed to add cart item", error);
      if (error?.status === 401) {
        return 401;
      }
      ErrorToast("Something went wrong");
      set({ cartLoading: false });
    }
  },

  //!Update cart item
  updateCart: async (id, data) => {
    set({ cartLoading: true });
    try {
      const res = await cartApi.put(`/${id}`, data);
      if (res?.data?.success === true) {
        set({ cartLoading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ cartLoading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (error) {
      console.error("Failed to update cart item", error);
      if (error?.status === 401) {
        return 401;
      }
      ErrorToast("Something went wrong");
      set({ cartLoading: false });
    }
  },

  //! Delete cart item
  deleteCart: async (id) => {
    set({ cartLoading: true });
    try {
      const res = await cartApi.delete(`/${id}`);
      if (res?.data?.success === true) {
        set({ cartLoading: false });
      }
    } catch (error) {
      console.error("Failed to delete cart item", error);
      set({ cartLoading: false });
    }
  },
}));

export default cartStore;
