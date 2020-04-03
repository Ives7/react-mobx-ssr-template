import React from 'react';
import Helmet from 'react-helmet';

export default function User(): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>user</title>
      </Helmet>
      <div>User 777</div>
    </>
  );
}
