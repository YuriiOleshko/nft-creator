import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import storage from 'src/helpers/storage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      storage.get('auth-ip-client_wallet_auth_key')
        ? <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);
export default PrivateRoute;
