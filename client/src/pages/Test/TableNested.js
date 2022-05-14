import React, { useCallback, useMemo } from 'react';
import Pagination from '@mui/material/Pagination';


const TableNested = ({activeRow, addUpdate, items, legends, countPage, currentPage, classBoot = 'col-md-9'}) => {

    const legendsTable = useMemo(() => {
      return legends.map(legend => <th key={legend}>{legend}</th>)
    }, [legends])
  
    const subTable = useCallback((item) => {
      if(items.idGroup === item.id) {
        return (
          <tr>
            <td colSpan="2">
              <table className='nasted_table'>
                <thead>
                <tr>
                  {items.legends.map( legend => <th key={legend}>{legend}</th>)}
                </tr>
                </thead>
                <tbody>
                  {items.items.map(user => {
                    return <tr key={user}>  {Object.keys(user).filter( (subitem, index) => index != 0).map( userData => {
                      if(userData != 'groupName' && userData !== 'groupId') {
                        return <td key={userData}>{user[userData]}</td>
                      }
                    })} </tr>
                  })}
              
                </tbody>
              </table>
            </td>
          </tr>
        )
      }
    }, [items])

    const itemsTable = useMemo(() => {
      return items.data.map( item => {
        return (
          <>
            <tr className={`main_tr ${activeRow(item.id) ? 'active' : ''}`} onClick={() => addUpdate(item)}>
              {Object.keys(item).filter( (subitem, index) => index != 0).map( subitem => <td>{item[subitem]}</td>)}
            </tr>

            {subTable(item)}
          </>
        )
      })      
    }, [items, activeRow, addUpdate])
    
    return (
      <>
        <table className='main_table'>
          <thead>
            <tr>
              {legendsTable}
            </tr>
          </thead>
          <tbody>
            {itemsTable}
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