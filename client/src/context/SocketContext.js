import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from "../utils/config";
import { store } from "../redux/store";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const token = store.getState().auth.token;
    const socket = io(BASE_URL, { auth: { token: `Bearer ${token}` } });
   
    useEffect(()=>{
        socket.on('connect_error', (err) => {
            console.log('Connection Error', err)
        });
    },[socket])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
};

export { SocketProvider, useSocket };
