import { create } from "zustand";

interface GnbStoreType {
  headline: string;
  setHeadline: (headline: string) => void;
  datetime: string;
  setDatetime: (datetime: string) => void;
  nation: (string | null)[];
  setNation: (nation: string[]) => void;
}

const gnbStore = create<GnbStoreType>((set) => ({
  headline: "",
  setHeadline: (headline) => {
    set((state) => ({ ...state, headline }));
  },
  datetime: "",
  setDatetime: (datetime) => {
    set((state) => ({ ...state, datetime }));
  },
  nation: [],
  setNation: (nation) => {
    set((state) => ({ ...state, nation }));
  },
}));

export default gnbStore;
