import { create } from "zustand";

export interface Store {
  headline: string;
  datetime: string;
  nations: string[];
}

export interface GnbStoreType {
  store: Store;
  setScrapStore: (store: Store) => void;
}

const scrapGnbStore = create<GnbStoreType>((set) => ({
  store: {
    headline: "",
    datetime: "",
    nations: [],
  },
  setScrapStore: (store) => {
    set((state) => ({ ...state, store }));
  },
}));

export default scrapGnbStore;
