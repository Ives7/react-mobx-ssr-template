import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { isSSR } from '../../../common/helpers/env';

export default class NotFound extends React.Component<RouteComponentProps, {}> {
  UNSAFE_componentWillMount(): void {
    isSSR() && (this.props.staticContext.statusCode = 404);
  }

  render() {
    return <div>404 not found</div>;
  }
}
