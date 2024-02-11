import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from "../utils/config";
import { store } from "../redux/store";
import { useDispatch } from 'react-redux';
import { updateUserStatusList } from '../redux/slice/userStatus.slice';
const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const token = store.getState().auth.token;
    const socket = io(BASE_URL, { auth: { token: `Bearer ${token}` } });
    const dispatch = useDispatch();
    
    useEffect(() => {
        const handleSetOnlineUser = (userList) => {
            dispatch(updateUserStatusList(userList))
        }
        socket.on('connect_error', (err) => {
            console.log('Connection Error', err)
        });


        socket.emit('user:connect');
        socket.on('user:online', handleSetOnlineUser)
        return () => {
            socket.off('user:connect');
            socket.off('user:online', handleSetOnlineUser)
        }
    }, [dispatch, socket])
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
