import { isSSR } from '../../common/helpers/env';

export function useSSRWillMount<T extends Function>(cb: T): void {
  isSSR() && cb();
}
