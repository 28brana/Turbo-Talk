import { Phone, VideoCamera } from '@phosphor-icons/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserDetail from '../SideBar/UserDetail';
const HeaderChat = () => {

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
        </div>
    )
}

export default HeaderChat;