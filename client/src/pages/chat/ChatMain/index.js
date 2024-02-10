import { useEffect, useState } from 'react';
import BottomInput from './BottomInput';
import ChatRender from './ChatRender';
import HeaderChat from './HeaderChat';
import { useSocket } from '../../../context/SocketContext';

const ChatMain = ({ conversationId }) => {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);

    const handleAddMessage = (value) => {
        setMessages(prevMessages => [...prevMessages, value]);
        socket.emit('message:sent', { message: value, conversationId });
    }
    useEffect(() => {
        const handleReceivedMessage = (value) => {
            setMessages(prevMessages => [...prevMessages, value]);
        };
        socket.on('message:receive', handleReceivedMessage);
        return () => {
            socket.off('message:receive', handleReceivedMessage);
        };
    }, [socket])

    useEffect(() => {
        setMessages([]);
    }, [conversationId])
    
    return (
        <div className='flex flex-col h-full'>
            <div className='border'>
                <HeaderChat />
            </div>
            <div className='border flex-1'>
                <ChatRender messages={messages} />
            </div>
            <div className='border'>
                <BottomInput handleAddMessage={handleAddMessage} />
            </div>
        </div>
    )
}

export default ChatMain;