import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import Header from '../header';
import Helmet from 'react-helmet';

const Base: React.FC<RouteConfigComponentProps> = function(
  props: RouteConfigComponentProps,
) {
  return (
    <>
      <Helmet defaultTitle="SSR-template" />
      <Header {...props} />
      {renderRoutes(props.route.routes)}
    </>
  );
};

export default Base;
