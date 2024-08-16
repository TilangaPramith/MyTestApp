import { store } from "./store"

export const storeData = (data: any, setMethod: any) => {
  store.dispatch(setMethod(data));
}