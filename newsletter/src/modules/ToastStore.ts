import { create } from "zustand";

export interface ToastStoreType {
  toast: boolean;
  setToast: (value: boolean) => void;
  toastState: string;
  setToastState: (value: string) => void;
}

const toastStore = create<ToastStoreType>((set) => ({
  toast: false,
  setToast: (value: boolean) => {
    set((state) => ({ ...state, toast: value }));
  },
  toastState: "",
  setToastState: (value: string) => {
    set((state) => ({ ...state, toastState: value }));
  },
}));

export default toastStore;
