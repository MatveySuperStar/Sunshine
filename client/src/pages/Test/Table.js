import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';


const Table = ({addUpdate, items, legends, countPage, currentPage}) => {

  const user = useSelector(state => state.user.user)  

  const activeRow = (id) => {
    return user.id === id
  }

  const legendsTable = () => {
    return legends.map(legend => <th>{legend}</th>)
  }

  const itemsTable = () => {
    return items.map( item => {
      return (
        <tr className={`${activeRow(item[0]) ? 'active' : ''}`} onClick={() =>addUpdate(item)}>
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
    <div className='col-md-9'>
          <table>
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