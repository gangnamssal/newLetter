import { create } from "zustand";

interface Store {
  headline: string;
  datetime: string;
  nation: (string | null)[];
}

interface GnbStoreType {
  store: Store;
  setStore: (store: Store) => void;
}

const gnbStore = create<GnbStoreType>((set) => ({
  store: {
    headline: "",
    datetime: "",
    nation: [],
  },
  setStore: (store) => {
    set((state) => ({ ...state, store }));
  },
}));

export default gnbStore;
