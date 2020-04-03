import React from 'react';
import Helmet from 'react-helmet';

import { RouteComponentProps } from 'react-router-dom';

const User: React.FC<RouteComponentProps> = function User() {
  return (
    <>
      <Helmet>
        <title>user</title>
      </Helmet>
      <div>User 777</div>
    </>
  );
};

export default User;
