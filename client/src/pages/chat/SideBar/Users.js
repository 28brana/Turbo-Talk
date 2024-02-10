import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllUser } from '../../../service/user.service';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import SearchInput from '../../../component/SearchInput';
import {
    useMutation
} from '@tanstack/react-query';
import { conversationService } from '../../../service';
import { toast } from 'react-toastify';

const UserListItem = ({ _id, avatar, username, email, onClose, refetch }) => {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: conversationService.createConversation,
        onSuccess: (data) => {
            if(!data?.alreadyExists){
                refetch()
            }
            onClose();
            navigate(`/chat/${data?.data?._id}`);
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })
    const handleClick = () => {
        mutate({
            participants: [_id],
        });
    }
    return (
        <div onClick={handleClick} className='flex items-center gap-4 px-4 py-3 border-b hover:bg-hover cursor-pointer'>
            <div className="rounded-full w-11 h-11 flex items-center justify-center overflow-hidden ">
                <img className="object-contain" src={avatar} alt="profile" />
            </div>
            <div className='flex flex-1 flex-col '>
                <p className='text-base font-semibold'>{username}</p>
                <p className='text-sm'>{email}</p>
            </div>
        </div>
    )
}
const Users = ({ open, onClose, refetch }) => {
    
    const [filter, setFilter] = useState({
        page: 1,
        limit: 20,
        searchQuery: ''
    })
    const [previousData, setPreviousData] = useState([]);
    const { data } = useQuery({ queryKey: ['userList', filter], queryFn: ({ queryKey }) => getAllUser(queryKey[1]) });

    const debouncedSetFilter = debounce((value) => {
        setPreviousData([]);
        setFilter({
            ...filter,
            searchQuery: value,
            page: 1
        })
    }, 600);


    const handleMore = () => {
        setPreviousData(data?.users || []);
        setFilter({
            ...filter,
            page: filter.page + 1
        })
    }
    const userList = [...previousData, ...(data?.users || [])];
    return (
        <div className={`absolute border translate-x-0 w-full h-full bg-white z-10 left-0 top-0 ease-in-out duration-300 sidebar ${open ? 'open' : 'closed'}`}>
            <div className="flex items-center  px-3 py-2 gap-4">
                <div className="icon-btn" onClick={onClose}>
                    <ArrowLeft size={24} />
                </div>
                <p className='text-lg font-semibold'>New Chat</p>
            </div>
            <SearchInput callBack={debouncedSetFilter} />
            <div>
                {
                    userList?.length === 0 && <div className='text-center py-2'>No User found.</div>
                }
                {
                    userList?.map((userDetail) => (
                        <UserListItem {...userDetail} key={userDetail._id} refetch={refetch} onClose={onClose} />
                    ))
                }
                {
                    data?.remainingUserCount > 0 && <div onClick={handleMore} className='border text-center py-2 text-secondary cursor-pointer'>View more</div>
                }
            </div>
        </div>
    )
}

export default Users;