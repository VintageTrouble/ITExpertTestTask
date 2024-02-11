import React from 'react'
import { Filter } from './Filter'

export const HeaderCell = ({children, sorted, order, filterable, filterPattern, onClick, onSearch}) => {
  return (
        <th className='border border-slate-600' >
          <div className='mx-2 flex flex-row items-center justify-between'>
            <div 
              className='hover:cursor-pointer place-items-start grow'
              onClick={() => {onClick(children)}}>
                {children}
                {sorted.toLowerCase()===children.toLowerCase() && (order === 'asc' ? '\\/' : '/\\')}
            </div>
            <div>
              {filterable && <Filter pattern={filterPattern} onSearch={onSearch}/>}
            </div>
          </div>
        </th>
  )
}
