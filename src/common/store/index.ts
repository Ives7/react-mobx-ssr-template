import { RootStore } from './root.store';
import { configure, extendObservable } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import { isSSR } from '../helpers/env';
import { isMobxStore } from '../decorators/mobx-store';
if (isSSR()) {
  useStaticRendering(true);
}

configure({
  enforceActions: 'observed',
});

function getClientRootStore(): RootStore {
  const rootStore = new RootStore();
  Object.keys(rootStore).forEach(key => {
    if (isMobxStore(rootStore, key)) {
      rootStore[key] = extendObservable(
        rootStore[key],
        window.__ROOT__STORE__[key],
      );
    }
  });
  return rootStore;
}

export function getRootStore(): RootStore {
  if (isSSR()) {
    return new RootStore();
  }
  return getClientRootStore();
}
