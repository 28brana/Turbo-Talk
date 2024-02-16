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
import { SocketProvider } from './context/SocketContext';
import { PeerProvider } from './context/PeerContext';
import NotFound from './pages/notFound';
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
    path: "/chat",
    element: (
      <SocketProvider>
        <Chat />
      </SocketProvider>
    )
  },
  {
    path: "/chat/:conversationId",
    element: (
      <SocketProvider>
        <Chat />
      </SocketProvider>
    )
  },
  {
    path: "*",
    element: (
      <NotFound/>
    )
  },
]);

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PeerProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            theme='colored'
          />
        </QueryClientProvider>
      </PeerProvider>
    </Provider>
  </React.StrictMode>
);


