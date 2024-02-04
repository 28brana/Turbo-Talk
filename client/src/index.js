import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient, QueryClientProvider
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './pages/chat';
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
        element: <Register />
      }
    ]
  },
  {
    path:"/chat",
    element:<Chat/>
  },
  {
    path:"/chat/:conversationId",
    element:<Chat/>
  },
]);

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          theme='colored'
        />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);


