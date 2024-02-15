import { Phone} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserDetail from '../SideBar/UserDetail';
import { useSocket } from '../../../context/SocketContext';
import VideoCall from '../../../component/VideoCall';
const HeaderChat = () => {

    const conversation = useSelector(state => state.conversation);
    const userStatus = useSelector(state => state.userStatus);
    const [typing, setTyping] = useState(false);
    const socket = useSocket();
    useEffect(() => {
        const handleUserTyping = (status) => {
            setTyping(status);
        }
        socket.on('user:typing', handleUserTyping);

        return () => {
            socket.off('user:typing', handleUserTyping);
        }
    }, [socket])
    const [openDetail, setOpenDetail] = useState(false);

    const status = userStatus?.onlineUsers?.includes(conversation.userDetail?.userId);
    return (
        <div className='flex flex-col h-full'>
            <UserDetail open={openDetail} onClose={() => { setOpenDetail(false) }} userDetail={conversation.userDetail} />
            <div className="border flex px-3 py-2 items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div onClick={() => { setOpenDetail(true) }} className="rounded-full cursor-pointer w-10 h-10 flex items-center justify-center relative">
                        <img className="object-contain" src={conversation.userDetail.avatar} alt="profile" />
                        {
                            status && <span className='absolute w-3 h-3 bottom-0 right-0 border border-white bg-green-500 z-10 rounded-full' />
                        }
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
                    <VideoCall/>
                    
                </div>
            </div>
        </div>
    )
}

export default HeaderChat;