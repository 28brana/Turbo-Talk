import { X } from '@phosphor-icons/react';
const UserDetail = ({ open, onClose ,userDetail}) => {
    if (!open) {
        return <></>
    }
    return (
        <div className="fixed w-screen h-screen left-0 top-0 backdrop-blur-sm flex items-center justify-center z-30" >
            <div className='bg-white shadow-sm border p-8 rounded-md'>
                <div className='flex cursor-pointer mb-2  justify-end'>
                    <div className='icon-btn' onClick={onClose}>
                        <X weight='bold' size={26} />
                    </div>
                </div>
                <div className=" flex flex-col items-center ">
                    <div className="rounded-full w-52 h-52 flex items-center justify-center overflow-hidden ">
                        <img className="object-contain" src={userDetail.avatar} alt="profile" />
                    </div>
                    <p className="text-xl mt-3 font-semibold">{userDetail.username || userDetail.name}</p>
                    <p className="text-lg mt-2">{userDetail.email}</p>
                </div>
            </div>
        </div>
    )
}
export default UserDetail;