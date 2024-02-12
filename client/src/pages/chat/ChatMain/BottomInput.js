import { useRef, useState } from 'react';
import EmojiPicker from '../../../component/EmojiPicker';
import { PaperPlaneRight } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../../context/SocketContext';
import Upload from '../../../component/Upload';

const BottomInput = ({ handleAddMessage }) => {
    const socket = useSocket();
    const userDetail = useSelector(state => state.auth.userDetail);
    const [text, setText] = useState('');
    const [files, setFiles] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const typingInstance = useRef(null);

    const handleTyping = () => {
        if (isTyping) {
            clearTimeout(typingInstance.current);
            typingInstance.current = setTimeout(() => {
                setIsTyping(false);
                socket.emit('user:typing', false);
            }, 600);
        } else {
            setIsTyping(true);
            socket.emit('user:typing', true);
            typingInstance.current = setTimeout(() => {
                setIsTyping(false);
                socket.emit('user:typing', false);
            }, 600);
        }
    }
    const handleChangeInput = (event) => {
        setText(event.target.value);
        handleTyping();
    }
    const addEmoji = (emoji) => {
        setText(text.concat(emoji))
    }

    const handleSubmit = () => {
        const createdAt = new Date();
        const formatMessage = {
            sender: userDetail._id,
            text: text,
            files: files,
            createdAt: createdAt.toString(),
        }
        handleAddMessage(formatMessage);
        setText("");
        setFiles([]);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }
    return (
        <div className="border  px-4 py-2 flex items-center gap-5">
            <EmojiPicker addEmoji={addEmoji} />
            <input
                value={text}
                className='chat-input'
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
                placeholder='Type a message'
            />
            <Upload fileList={files} setFiles={setFiles} />
            <div className='icon-btn' onClick={handleSubmit}>
                <PaperPlaneRight size={26} />
            </div>
        </div>
    )
}

export default BottomInput;