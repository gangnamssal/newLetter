import { Store } from "../../modules/GnbStore";

export interface NationObject {
  [key: string]: boolean;
  대한민국: boolean;
  중국: boolean;
  일본: boolean;
  미국: boolean;
  북한: boolean;
  러시아: boolean;
  프랑스: boolean;
  영국: boolean;
}

export interface Prop {
  dialogRef: React.RefObject<HTMLDialogElement>;
  setStore: (store: Store) => void;
}
