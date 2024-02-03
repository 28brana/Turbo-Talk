import { Power, ChatDots, MagnifyingGlass } from '@phosphor-icons/react';

const ListItem = () => {
    return (
        <div className='flex items-center gap-4 px-4 py-3 border-b hover:bg-black cursor-pointer'>
            <div className="rounded-full w-12 h-12 flex items-center justify-center overflow-hidden ">
                <img className="object-contain" src={"https://picsum.photos/200/300"} alt="profile" />
            </div>
            <div className='flex flex-1 flex-col '>
                <p className='text-lg font-semibold'>Keerti </p>
                <p className='text-sm'>hello ki krdi </p>
            </div>
            <div className='flex flex-col items-end justify-between  gap-2'>
                <p className='text-xs'>8:25pm </p>
                <div className='rounded-full w-6 h-6 px-1 bg-red-400 flex items-center justify-center text-sm'>
                    <p>9</p>
                </div>
            </div>
        </div>
    )
}

const SideBar = () => {
    return (
        <div className="border">
            <div>
                <div className="flex px-3 py-2 items-center justify-between">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center overflow-hidden ">
                        <img className="object-contain" src={"https://picsum.photos/200/300"} alt="profile" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className='icon-btn'>
                            <ChatDots size={24} />
                        </div>
                        <div className='icon-btn'>
                            <Power size={24} />
                        </div>
                    </div>
                </div>

                <div className='border relative px-3 py-2 '>
                    <div className='absolute [top:18px] left-5'>
                        <MagnifyingGlass size={22} />
                    </div>
                    <input type='text' className='search' placeholder='Search chat' />
                </div>
            </div>
            <div>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
            </div>
        </div>
    )
}

export default SideBar;