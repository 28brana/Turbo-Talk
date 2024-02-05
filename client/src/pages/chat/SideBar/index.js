import { Power, ChatDots, MagnifyingGlass } from '@phosphor-icons/react';
import Users from './Users';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserConversation } from '../../../service/conversation.service';
const ListItem = ({ _id, avatar, name, lastMessage, lastActive, unseenMessage, isActive }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/chat/${_id}`);
    }
    return (
        <div onClick={handleClick} className={`flex items-center gap-4 px-4 py-3 border-b hover:bg-hover cursor-pointer ${isActive ? 'bg-hover' : ''}`}>
            <div className="rounded-full w-11 h-11 flex items-center justify-center overflow-hidden ">
                <img className="object-contain" src={avatar} alt="profile" />
            </div>
            <div className='flex flex-1 flex-col '>
                <p className='text-base font-semibold'>{name}</p>
                <p className='text-sm'>{lastMessage}</p>
            </div>
            <div className='flex flex-col items-end justify-between  gap-2'>
                <p className='text-xs'>{lastActive}</p>
                {unseenMessage && <div className='rounded-full w-5 h-5 text-white px-1 bg-red-400 flex items-center justify-center text-xs'>
                    <p>{unseenMessage}</p>
                </div>}
            </div>
        </div>
    )
}

const SideBar = () => {
    const { conversationId } = useParams();
    const [showUserList, setShowUserList] = useState(false);

    const { data: list } = useQuery({queryKey:['conversationList'], queryFn:getUserConversation});
    console.log({ list });
    const data = [
        {
            _id: "1",
            avatar: "https://picsum.photos/200/300",
            name: "Keerti Sharma",
            lastMessage: "How are u ?",
            lastActive: "8:25pm",
            unseenMessage: 5
        },
        {
            _id: "2",
            avatar: "https://picsum.photos/200/300",
            name: "Rahul",
            lastMessage: "How are u ?",
            lastActive: "8:25pm",
        },
    ]
    return (
        <div className="border relative h-full">
            <Users open={showUserList} onClose={() => { setShowUserList(false) }} />
            <div>
                <div className="flex px-3 border-b py-2 items-center justify-between">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center overflow-hidden ">
                        <img className="object-contain" src={"https://picsum.photos/200/300"} alt="profile" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className='icon-btn' onClick={() => { setShowUserList(true) }}>
                            <ChatDots size={24} />
                        </div>
                        <div className='icon-btn'>
                            <Power size={24} />
                        </div>
                    </div>
                </div>

                <div className='relative px-3 py-2 '>
                    <div className='absolute [top:18px] left-5'>
                        <MagnifyingGlass size={22} />
                    </div>
                    <input type='text' className='search' placeholder='Search chat' />
                </div>
            </div>
            <div className='overflow-auto  [height:83%]'>
                {
                    data.map((converationItem) => (
                        <ListItem key={converationItem._id} {...converationItem} isActive={converationItem._id === conversationId} />
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar;