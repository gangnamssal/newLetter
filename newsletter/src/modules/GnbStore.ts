import { create } from "zustand";

export interface Store {
  headline: string;
  datetime: string;
  nations: string[];
}

export interface GnbStoreType {
  store: Store;
  setStore: (store: Store) => void;
}

const gnbStore = create<GnbStoreType>((set) => ({
  store: {
    headline: "",
    datetime: "",
    nations: [],
  },
  setStore: (store) => {
    set((state) => ({ ...state, store }));
  },
}));

export default gnbStore;
