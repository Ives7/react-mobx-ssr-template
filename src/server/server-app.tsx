import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { routes } from '../common/routes/routes';
import { getRootStore } from '../common/store';
import { renderRoutes } from 'react-router-config';

const rootStore = getRootStore();

export interface ServerAppProps {
  location: string;
  context?: Record<string, any>;
  basename?: string;
}

export const ServerApp: React.FC<ServerAppProps> = function ServerRouter(
  props: ServerAppProps,
) {
  return (
    <Provider {...rootStore}>
      <StaticRouter {...props}>{renderRoutes(routes)}</StaticRouter>
    </Provider>
  );
};
