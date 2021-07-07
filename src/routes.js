import React from 'react';
import Login from './page/Login';
import RenderRoutes from './components/RenderRoutes';
import Layout from './Layouts/Layout';
import Main from "./page/Main";
import {Redirect} from "react-router";

const routes = [
  { path: '/login', key: 'ROOT', exact: true, component: () => <Login /> },
  {
    path: '/',
    key: 'HOME',
    component: (props) => {
      if (!localStorage.getItem('privateKey') ) {
        return <Redirect to="/login" />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/',
        key: 'MAIN',
        exact: true,
        component: () => (
         <Layout><Main/></Layout>
        ),
      },

    ],
  },
];

export default routes;
