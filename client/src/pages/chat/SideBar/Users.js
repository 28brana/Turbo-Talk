import { ArrowLeft, MagnifyingGlass } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ avatar, name, lastActive,onClose }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Create new conversation
        const conversationId = 5;
        navigate(`/chat/${conversationId}`);
        onClose();
    }
    return (
        <div onClick={handleClick} className='flex items-center gap-4 px-4 py-3 border-b hover:bg-hover cursor-pointer'>
            <div className="rounded-full w-11 h-11 flex items-center justify-center overflow-hidden ">
                <img className="object-contain" src={avatar} alt="profile" />
            </div>
            <div className='flex flex-1 flex-col '>
                <p className='text-base font-semibold'>{name}</p>
                <p className='text-sm'>{lastActive}</p>
            </div>
        </div>
    )
}
const Users = ({ open, onClose }) => {

    const data = [
        {
            _id: "1",
            avatar: "https://picsum.photos/200/300",
            name: "Keerti Sharma",
            lastActive: "Online",
        },
        {
            _id: "1",
            avatar: "https://picsum.photos/200/300",
            name: "RRK",
            lastActive: "8:25pm",
        },

    ]
    return (
        <div className={`absolute border translate-x-0 w-full h-full bg-white z-10 left-0 top-0 ease-in-out duration-300 sidebar ${open ? 'open' : 'closed'}`}>
            <div className="flex items-center  px-3 py-2 gap-4">
                <div className="icon-btn" onClick={onClose}>
                    <ArrowLeft size={24} />
                </div>
                <p className='text-lg font-semibold'>New Chat</p>
            </div>
            <div className='border relative px-3 py-2 '>
                <div className='absolute [top:18px] left-5'>
                    <MagnifyingGlass size={22} />
                </div>
                <input type='text' className='search' placeholder='Search chat' />
            </div>
            <div>
                {
                    data.map((userDetail) => (
                        <ListItem {...userDetail} key={userDetail._id} onClose={onClose} />
                    ))
                }

            </div>
        </div>
    )
}

export default Users;