import './App.css';
import { api } from './Api';
import { useEffect, useState } from 'react';
import { Table } from './components/Table';

function App() {
  const [textAreaValue, setTextAreaValue] = useState('');
  
  const [codeFilter, setCodeFilter] = useState('');
  const [valueFilter, setValueFilter] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [list, setList] = useState([]);
 
  const handleTextAreaChange = (e) => {
   setTextAreaValue(e.target.value)
  };
  const handleCreateClick = () => {
    api.createObj(textAreaValue)
    .then(res => fetchData());
  }

  const handlePageSizeChanged = (size) => {
    setPageSize(size)
  };
  const handleSortChange = (column, direction) => {
    setSortColumn(column.toLowerCase() ?? '');
    setSortOrder(direction ?? '');
  };
  const handleCurrentPageChanged = (page) => {
    setPage(page);
  }

  const fetchData = () => {
    api.getData({
      codeFilter: codeFilter,
      valueFilter: valueFilter,
      sortColumn: sortColumn,
      sortOrder: sortOrder,
      page: page,
      pageSize: pageSize
    })
    .then(res => {
      const totalPages = Math.ceil(res.totalCount / res.pageSize)
      setPage(res.page)
      setTotalPages(totalPages > 0 ? totalPages : 1)
      console.log(res.items)
      setList(res.items)
    });
  }


  useEffect(() => {
    fetchData();
  }, [page, pageSize, codeFilter, valueFilter, sortColumn, sortOrder]);

  return (
    <div className='app'>
      <div className='app-wrapper'>
        <div className="flex flex-col">
          <h2 className='font-sans font-semibold text-xl'>Input Json:</h2>
          <textarea className='rounded-lg border-2 p-2' placeholder='Place your JSON here...' onChange={handleTextAreaChange}></textarea>
          <button className='self-start my-2 p-2 px-4 border-2 rounded-lg bg-green-500 hover:bg-green-600' type='button' onClick={handleCreateClick}>Create</button>
        </div>

        <Table 
          data={list} 
          headers={[
            {
              value: 'Id', 
              filterable: false
            },
            {
              value: 'Code', 
              filterable: true,
              onSearch: (value) => setCodeFilter(value)
            },
            {
              value: 'Value', 
              filterable: true,
              onSearch: (value) => setValueFilter(value)
            },
          ]}
          currentPage={page}
          totalPages={totalPages}
          pageSizeOptions={[2, 5, 10]}
          sortCallback={handleSortChange}
          paginationCallback={handleCurrentPageChanged}
          onPageSizeChanged={handlePageSizeChanged}/>
      </div>
    </div>
  );
}

export default App;
