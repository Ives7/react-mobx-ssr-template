import React from 'react';
import { Header } from '../header/header';
import { MenuRouteConfig } from '../../../common/routes/routes';
import { renderRoutes } from 'react-router-config';

export interface BaseProps {
  routes: MenuRouteConfig[];
}

export const Base: React.FC<BaseProps> = function Base(props) {
  return (
    <>
      <Header routes={props.routes} />
      <main>{renderRoutes(props.routes)}</main>
    </>
  );
};
