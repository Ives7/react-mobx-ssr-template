import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routes } from '../common/routes/routes';
import { Provider } from 'mobx-react';
import { Base } from './layouts/base/base';
import { useRootStore } from './hooks/useStore';

const rootStore = useRootStore();
export const App: React.FC = function App() {
  return (
    <Provider {...rootStore}>
      <BrowserRouter>
        <Base routes={routes} />
      </BrowserRouter>
    </Provider>
  );
};
