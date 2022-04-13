import React from 'react';
import Pagination from '@mui/material/Pagination';


const TableNested = ({activeRow, addUpdate, items, legends, countPage, currentPage, classBoot = 'col-md-9'}) => {

    const legendsTable = () => {
      return legends.map(legend => <th>{legend}</th>)
    }
  
    const itemsTable = () => {
      return items.data.map( item => {
        return (
          <>
            <tr className={`main_tr ${activeRow(item.id) ? 'active' : ''}`} onClick={() =>addUpdate(item)}>
              {Object.keys(item).filter( (subitem, index) => index != 0).map( subitem => {
                if(subitem !== 'childParams') {
                  return (
                    <td>{item[subitem]}</td>
                  )
                }
              })}
            </tr>
            {items.idGroup === item.id ?
             <tr>
              <td colspan="2">
              <table className='nasted_table'>
                <thead>
                <tr>
                  {items.legends.map( legend => <th>{legend}</th>)}
                </tr>
                </thead>
                <tbody>
                  {items.items.map(user => {
                    return <tr> {Object.keys(user).filter( (subitem, index) => index != 0).map( userData => {
                      if(userData != 'groupName' && userData !== 'groupId') {
                        return <td>{user[userData]}</td>
                      }
                    })} </tr>
                  })}
              
                </tbody>
              </table>
              </td>
            </tr> : ''
            }
          </>
        )
      })
    }
    
    return (
      <>
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
      </>
    );
  };

export default TableNested;