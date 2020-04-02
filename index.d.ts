import { RootStore } from './src/common/store/root.store';



declare global {
  export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };
  export type StringMap = Record<string,string>
  interface Window {
    __ROOT__STORE__: RootStore;
  }
}

