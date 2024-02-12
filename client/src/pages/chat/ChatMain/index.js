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
        socket.emit('message:sent', { ...value, conversation: conversationId });
    }
    useEffect(() => {
        const handleMessageSentByOther = (value) => {
            setMessages(prevMessages => [...prevMessages, value]);
            // console.log('this chat')
            // if(conversationId === value.conversation){
            //     console.log('this chat')
            //     // socket.emit('message:received',value);
            // }else{
            //     console.log('someoneelse chat chat')
            //     // socket.emit('message:delivered',value);
            // }
        };
        socket.on('message:sent', handleMessageSentByOther);
        return () => {
            socket.off('message:sent', handleMessageSentByOther);
        };
    }, [conversationId, socket])

    useEffect(() => {
        setMessages([]);
    }, [conversationId])

    return (
        <div className='flex flex-col h-full relative'>
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