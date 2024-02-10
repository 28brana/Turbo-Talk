import { Phone, VideoCamera } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserDetail from '../SideBar/UserDetail';
import { useSocket } from '../../../context/SocketContext';
const HeaderChat = () => {

    const conversation = useSelector(state => state.conversation);
    const [status, setStatus] = useState(false);
    const [typing, setTyping] = useState(false);
    const socket = useSocket();
    useEffect(() => {
        const handleUserStatus = (result) => {
            setStatus(result.status);
        }
        const handleUserTyping = (status) => {
            setTyping(status);
        }
        socket.on('user:status', handleUserStatus);
        socket.on('user:typing', handleUserTyping);

        return () => {
            socket.off('user:status', handleUserStatus);
            socket.off('user:typing', handleUserTyping);
        }
    }, [socket])
    const [openDetail, setOpenDetail] = useState(false);
    return (
        <div className='flex flex-col h-full'>
            <UserDetail open={openDetail} onClose={() => { setOpenDetail(false) }} userDetail={conversation.userDetail} />
            <div className="border flex px-3 py-2 items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div onClick={() => { setOpenDetail(true) }} className="rounded-full cursor-pointer w-10 h-10 flex items-center justify-center overflow-hidden ">
                        <img className="object-contain" src={conversation.userDetail.avatar} alt="profile" />
                    </div>
                    <div className="flex flex-col ">
                        <p className="text-base font-semibold">{conversation.userDetail.name}</p>
                        <p className="text-xs">
                            {
                                typing ? 'Typing ...' : status ? 'online' : ''
                            }
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="icon-btn">
                        <VideoCamera size={24} />
                    </div>
                    <div className="icon-btn">
                        <Phone size={24} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderChat;