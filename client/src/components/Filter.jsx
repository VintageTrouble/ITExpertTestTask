import React, { useState } from 'react'

export const Filter = ({onSearch}) => {
    const [filter, setFilter] = useState('')

    const handleChange = (event) => {
        setFilter(event.target.value);
        onSearch(event.target.value);
    }

    const clean = () => {
        setFilter('');
        onSearch('');
    }
    
    return (
        <div className='flex flex-row items-center justify-between rounded-full border-2 p-1 px-4'>
            <input 
                placeholder='Search...'
                onChange={handleChange}
                value={filter}/>
            <div 
                className='hover:cursor-pointer'
                onClick={clean}>X</div>
        </div>
    )
}
