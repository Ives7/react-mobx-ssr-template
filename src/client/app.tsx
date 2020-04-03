import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routes } from '../common/routes/routes';
import { Provider } from 'mobx-react';
import { useRootStore } from './hooks/useStore';
import { renderRoutes } from 'react-router-config';

const rootStore = useRootStore();
export const App: React.FC = function App() {
  return (
    <Provider {...rootStore}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );
};
