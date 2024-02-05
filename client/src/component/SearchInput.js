import {  MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';

const SearchInput = ({callBack}) => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (event) => {
        const newSearchQuery = event.target.value;
        setSearch(newSearchQuery);
        callBack(newSearchQuery);
    }
    return (
        <div className='border relative px-3 py-2 '>
            <div className='absolute [top:18px] left-5'>
                <MagnifyingGlass size={22} />
            </div>
            <input type='text' className='search' value={search} onChange={handleSearchChange} placeholder='Search chat' />
        </div>
    )
}

export default SearchInput;