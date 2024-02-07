import { VideoCamera, Phone, Info } from '@phosphor-icons/react';
import ChatRender from './ChatRender';
import {useSelector} from 'react-redux';
// import { useParams } from 'react-router-dom';

const ChatScreen = () => {

    const conversation=useSelector(state=>state.conversation);
   
    return (
        <div className='flex flex-col h-full'>
            <div className="border flex px-3 py-2 items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center overflow-hidden ">
                        <img className="object-contain" src={conversation.userDetail.avatar} alt="profile" />
                    </div>
                    <div className="flex flex-col border">
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
                    <div className="icon-btn">
                        <Info size={24} />
                    </div>
                </div>
            </div>
            <div className='border flex-1'>
               <ChatRender/>
            </div>
            <div className='border'>
                bottom
            </div>
        </div>
    )
}

export default ChatScreen;