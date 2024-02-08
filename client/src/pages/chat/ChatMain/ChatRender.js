import { useSelector } from 'react-redux';
import { formatTime } from '../../../utils/dateHelper';
import { useEffect, useRef } from 'react';

const Message = ({ text, isMe, createdAt }) => {
    return (
        <div className={`flex my-3 mx-3 ${isMe ? 'justify-end' : 'justify-star'}`}>
            <div className={`message ${isMe ? 'message-left' : 'message-right'}`}>
                <p className='text-base'>
                    {text}
                </p>
                <span className='text-xs self-end'>{formatTime(createdAt)}</span>
            </div>
        </div>
    )
}
const ChatRender = ({ messages }) => {
    const userDetail = useSelector(state => state.auth.userDetail);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div>
            <div className='[height:75vh] overflow-y-auto'>
                {
                    messages.map((message, index) => (
                        <Message key={index} {...message} isMe={message.sender === userDetail._id} />
                    ))
                }
                <div ref={messagesEndRef} />

            </div>
        </div>
    )
}

export default ChatRender;