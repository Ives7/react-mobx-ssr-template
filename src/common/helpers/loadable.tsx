import originLoadable, {
  DefaultComponent,
  LoadableComponent,
  Options,
} from '@loadable/component';
import React from 'react';

export function loadable<T>(
  asyncMethod: (props: T) => Promise<DefaultComponent<T>>,
  options: Options<T> = {},
): LoadableComponent<T> {
  return originLoadable(asyncMethod, {
    ssr: true,
    fallback: <div>loading</div>,
    ...options,
  });
}
