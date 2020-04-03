import { RootStore } from 'common/store/root.store';
import { getRootStore } from '../../common/store';

const rootStore = getRootStore();

export function useRootStore(): RootStore {
  return rootStore;
}

