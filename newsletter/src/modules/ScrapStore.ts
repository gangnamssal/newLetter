import { create } from "zustand";
import { Docs } from "../components/HomeScreen/HomeScreenType";

export interface GnbStoreType {
  store: Docs[];
  setStore: () => void;
}

const scrapStore = create<GnbStoreType>((set) => ({
  store: localStorage.getItem("scrap-data")
    ? JSON.parse(localStorage.getItem("scrap-data") as string)
    : [],
  setStore: () => {
    set((state) => ({ ...state }));
  },
}));

export default scrapStore;
