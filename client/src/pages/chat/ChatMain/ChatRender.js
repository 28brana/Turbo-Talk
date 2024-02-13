import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllConversationMessage } from '../../../service/message.service';
import { formatTime } from '../../../utils/dateHelper';
import ImageViewer from '../../../component/ImageViewer';

const Message = ({ text, isMe, files, createdAt }) => {
    const [imageList, setImageList] = useState([]);
    return (
        <>
            <ImageViewer list={imageList} onClose={() => {
                setImageList([])
            }} />
            <div className={`flex my-3 mx-3 ${isMe ? 'justify-end' : 'justify-star'}`}>
                <div className={`message ${isMe ? 'message-left' : 'message-right'}`}>
                    {files.length > 0 && (
                        <div className='py-2 message-img-container' onClick={() => {
                            setImageList(files)
                        }} >
                            {
                                files.map((imgUrl, index) => {
                                    return (
                                        <div key={index} className='rounded-md overflow-hidden ]'>
                                            <img src={imgUrl} alt='pics' className='w-full h-full object-contain' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                    <p className='text-base'>
                        {text}
                    </p>
                    <span className='text-xs self-end'>{formatTime(createdAt)}</span>
                </div>
            </div>
        </>
    )
}

const OldChat = memo(() => {
    const userDetail = useSelector(state => state.auth.userDetail);
    const { conversationId } = useParams();
    const [page, setPage] = useState(1);
    const [remainingMessages, setRemainingMessages] = useState(0);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (conversationId) => {
            setLoading(true);
            const result = await getAllConversationMessage({ id: conversationId, page: 1 });
            setRemainingMessages(result.remainingMessages);
            setMessages(result.data.reverse());
            setLoading(false);
        }
        fetchData(conversationId);

        return () => {
            setPage(1);
        }

    }, [conversationId])

    const handleReadMore = async () => {
        setLoading(true);
        const result = await getAllConversationMessage({ id: conversationId, page: page + 1 });
        setRemainingMessages(result.remainingMessages);
        let resultArr = [...result.data].reverse();
        setMessages([...resultArr, ...messages,]);
        setPage(page + 1)
        setLoading(false);
    }

    return (
        <>
            {
                loading ? (
                    <div className='border flex items-center justify-center'>
                        <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
                    </div>
                ) : remainingMessages > 0 && (
                    <div onClick={handleReadMore} className='text-center border py-1 text-secondary cursor-pointer'>
                        Read more
                    </div>
                )
            }
            {
                messages?.map((message, index) => {
                    const isLastMessage = index === messages.length - 1;
                    let isSameDay = true;
                    const currentDay = new Date(message.createdAt);
                    if (!isLastMessage) {
                        const nextDay = new Date(messages[index + 1]?.createdAt);
                        isSameDay = currentDay.toDateString() === nextDay.toDateString();
                    }
                    return (
                        <div key={index}>
                            <Message  {...message} isMe={message.sender === userDetail._id} />
                            {
                                !isSameDay && (
                                    <div className='flex items-center justify-center py-1 text-center'>
                                        <hr className='flex-1 mx-4' />
                                        <div className='px-2 py-1 rounded-md text-sm font-semibold text-secondary bg-hover'>
                                            {currentDay.toDateString()}
                                        </div>
                                        <hr className='flex-1 mx-4' />
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </>
    )
})

const ChatRender = ({ messages }) => {
    const messagesEndRef = useRef(null);
    const userDetail = useSelector(state => state.auth.userDetail);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className='[height:75vh] overflow-y-auto'>
                <OldChat />
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