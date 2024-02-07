import { VideoCamera, Phone } from '@phosphor-icons/react';
import ChatRender from './ChatRender';
import { useSelector } from 'react-redux';
import UserDetail from '../SideBar/UserDetail';
import { useState } from 'react';
import BottomInput from './BottomInput';
const ChatScreen = () => {

    const conversation = useSelector(state => state.conversation);
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
                        <p className="text-xs">online</p>
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
            <div className='border flex-1'>
                <ChatRender />
            </div>
            <div className='border'>
                <BottomInput/>
            </div>
        </div>
    )
}

export default ChatScreen;