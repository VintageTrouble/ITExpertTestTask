import React, {useEffect, useState} from 'react';

export const Pagination = ({ currentPage, totalPages, pageSizeOptions, onPageChange, onPageSizeChanged }) => {
    const [pageNumbers, setPageNumbers] = useState([]);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const handlePageSizeChanged = (e) => {
        onPageSizeChanged(e.target.value);
    }

    useEffect(() => {
        const pages = []
        if(currentPage > 1 && currentPage < totalPages) pages.push(currentPage);
        if(currentPage > 2) pages.push(currentPage - 1);
        if(currentPage < totalPages - 1) pages.push(currentPage + 1);

        pages.sort()

        setPageNumbers(pages.sort())
    }, [currentPage, totalPages])

    return (
        <div className='flex flex-row items-center'>
            <div className='ml-2 pr-2'>Pages:</div>
            <div className='flex flex-row grow'>
                { currentPage !== 1 &&
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}>
                        &lt;
                    </button>
                }

                <button 
                    className='flex flex-row'
                    onClick={() => handlePageChange(1)}>
                        <div className={`${(currentPage === 1 ? 'font-bold' : '')}`}>1</div>{totalPages > 1 && <div>|</div>}
                </button>

                { currentPage > 3 &&
                    <div>...|</div>
                }
                
                {pageNumbers.map((item, index) => 
                    <button 
                        className='flex flex-row'
                        key={index}
                        onClick={() => handlePageChange(item)}>
                            <div className={`${(currentPage === item ? 'font-bold' : '')}`}>{item}</div>|
                    </button>
                )}

                { currentPage < totalPages - 2 &&
                    <div>...|</div>
                }
                { totalPages > 1 &&
                    <button 
                    className={`${(currentPage === totalPages ? 'font-bold' : '')}`}
                        onClick={() => handlePageChange(totalPages)}>
                            {totalPages}
                    </button>
                }
                { currentPage !== totalPages &&
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}>
                        &gt;
                    </button>
                }
            </div>
            <div className='pr-2'>Page size:</div>
            <div>
                <select className='rounded-full border-2 mr-2' onChange={handlePageSizeChanged}
                    defaultValue={10}>
                    {pageSizeOptions.map((item, index) => 
                        <option key={index}>{item}</option>
                    )}
                </select>
            </div>
        </div>
    );
};