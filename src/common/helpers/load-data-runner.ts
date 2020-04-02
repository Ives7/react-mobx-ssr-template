import { MatchedRoute } from 'react-router-config';
import { RootStore } from '../store/root.store';

export async function loadDataRunner<
  Params extends { [K in keyof Params]?: string }
>(
  matchedRoutes: Array<MatchedRoute<Params>>,
  initRootStore: DeepPartial<RootStore>,
): Promise<void> {
  for (let i = 0; i < matchedRoutes.length; i++) {
    const { match, route } = matchedRoutes[i];
    if (typeof route.loadData === 'function') {
      await route.loadData(initRootStore, match);
    }
  }
}
