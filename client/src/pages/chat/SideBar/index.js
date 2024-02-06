import { Power, ChatDots } from '@phosphor-icons/react';
import Users from './Users';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserConversation } from '../../../service/conversation.service';
import { debounce } from 'lodash';
import SearchInput from '../../../component/SearchInput';
import { useDispatch } from 'react-redux';
import { currentConversation } from '../../../redux/slice/conversation.slice';
import { useSelector } from 'react-redux';

const ListItem = ({ _id, avatar, name, lastMessage, lastActive, unseenMessage, isActive }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const conversation = useSelector(state => state.conversation);
    if (isActive && conversation.userDetail._id !== _id) {
        dispatch(currentConversation({
            _id,
            avatar,
            name,
            lastMessage,
            lastActive,
            unseenMessage,
            isActive
        }))
    }
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

    const [filter, setFilter] = useState({
        page: 1,
        limit: 20,
        searchQuery: ''
    })
    const { data, refetch } = useQuery({ queryKey: ['conversationList', filter], queryFn: ({ queryKey }) => getUserConversation(queryKey[1]) });
    const debouncedSetFilter = debounce((value) => {
        setFilter({
            ...filter,
            searchQuery: value,
            page: 1
        })
    }, 600);
    return (
        <div className="border relative h-full">
            <Users open={showUserList} refetch={refetch} onClose={() => { setShowUserList(false) }} />
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

                <SearchInput callBack={debouncedSetFilter} />

            </div>
            <div className='overflow-auto  [height:83%]'>
                {
                    data?.data?.length === 0 && <div className='text-center py-2'>No conversation found.</div>
                }
                {
                    data?.data?.map((converationItem) => (
                        <ListItem key={converationItem._id} {...converationItem} isActive={converationItem._id === conversationId} />
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar;