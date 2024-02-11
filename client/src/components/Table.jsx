import React, {useState} from 'react'
import { HeaderCell } from './HeaderCell'
import { Pagination } from './Pagination'

export const Table = ({data, headers, currentPage, totalPages, pageSizeOptions, sortCallback, paginationCallback, onPageSizeChanged}) => {
    const [sortColumn, setSortColumn] = useState('Id')
    const [sortDirection, setSortDirection] = useState('asc')

    const onCellClick = (cellName) => {
        if(sortColumn === cellName) {
            const newOrder = sortDirection === 'asc' ? 'desc' : 'asc';
            setSortDirection(newOrder)
            sortCallback(sortColumn, newOrder)
        } else {
            setSortColumn(cellName)
            setSortDirection('asc')
            sortCallback(cellName, 'asc')
        }
    }

    return (
        <div className='flex flex-col'>
            <table className='border-collapse table-auto border border-slate-500 grow my-4'>
                <thead>
                    <tr>
                        {
                            headers && headers.map((item, index) =>
                                <HeaderCell 
                                    key={index}
                                    sorted={sortColumn} 
                                    order={sortDirection}
                                    filterable={item.filterable}
                                    onClick={onCellClick}
                                    onSearch={item.onSearch}>
                                        {item.value}
                                </HeaderCell>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map(item => 
                            <tr key={item.id}>
                                <td className='py-1 px-2 border border-slate-700'>{item.id}</td>
                                <td className='py-1 px-2 border border-slate-700'>{item.code}</td>
                                <td className='py-1 px-2 border border-slate-700'>{item.value}</td> 
                            </tr> 
                        )
                    }
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSizeOptions={pageSizeOptions}
                onPageChange={paginationCallback}
                onPageSizeChanged={onPageSizeChanged}
            />
        </div>
    )
}
