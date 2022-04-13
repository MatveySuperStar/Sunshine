import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';


const Table = ({activeRow, addUpdate, items, legends, countPage, currentPage, classBoot = 'col-md-9'}) => {

  const legendsTable = () => {
    return legends.map(legend => <th>{legend}</th>)
  }

  const itemsTable = () => {
    return items.map( item => {
      return (
        <tr className={`main_tr ${activeRow(item[0]) ? 'active' : ''}`} onClick={() =>addUpdate(item)}>
          {item.filter((subitem, index) => index != 0).map( subitem => {
            return (
              <td>{subitem}</td>
            )
          })}
        </tr>
      )
    })
  }
  
  return (
    <div className={`${classBoot} main_table`}>
      <table className='main_table'>
        <thead>
          <tr>
            {legendsTable()}
          </tr>
        </thead>
        <tbody>
          {itemsTable()}
        </tbody>
      </table>
      <div className='pagination'>
        <Pagination 
          count={countPage} 
          variant="outlined" 
          shape="rounded"
          onChange={(event, value)=>currentPage(value)}/>
      </div>
    </div>
  );
};

export default Table;