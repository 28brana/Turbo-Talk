import { useState } from 'react';
import BottomInput from './BottomInput';
import ChatRender from './ChatRender';
import HeaderChat from './HeaderChat';
const ChatMain = () => {
    const [messages, setMessages] = useState([]);
    const handleAddMessage = (value) => {
        setMessages([...messages, value])
    }
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