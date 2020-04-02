import { RootStore } from '../store/root.store';
import { useRootStore } from '../../client/hooks/useStore';

export function genInitStore(): DeepPartial<RootStore> {
  const initRootStore: Partial<RootStore> = {};
  const rootStore = useRootStore();
  Object.keys(rootStore).forEach(key => {
    initRootStore[key] = {};
  });
  return initRootStore;
}
