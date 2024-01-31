import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Auth/Login';
import Signin from './Auth/Signin';
import { Provider } from 'react-redux'
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Signin />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


