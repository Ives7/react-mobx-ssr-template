import { RootStore } from './store/root.store';
import { MatchedRoute } from 'react-router-config';

export interface LoadDataComponent<T extends StringMap = StringMap> {
  loadData?: (
    initialStore: DeepPartial<RootStore>,
    matchedRoute: MatchedRoute<T>,
  ) => void;
}
