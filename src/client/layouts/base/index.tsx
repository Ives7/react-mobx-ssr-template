import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import Header from '../header';

const Base: React.FC<RouteConfigComponentProps> = function(
  props: RouteConfigComponentProps,
) {
  return (
    <>
      <Header {...props} />
      {renderRoutes(props.route.routes)}
    </>
  );
};

export default Base;
