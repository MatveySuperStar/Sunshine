import React from 'react';


const TableKurs = ({items =[], legends, activeRow, addUpdate}) => {
    console.log(legends)
  const legendsTable = () => {
    return legends.map(legend => <th>{legend}</th>)
  }

  const itemsTable = () => {
    return items?.map( item => {
      return (
        <tr className={`main_tr ${activeRow(item[0]) ? 'active' : ''}`} onClick={() =>addUpdate(item)}>
          {
            Object.keys(item).filter((item, index) => index !== 0 && index !== 2).map( state => <td>{item[state]}</td>)
          }
        </tr>
      )
    })
  }
  
  return (
    <div className={`main_table`}>
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
    </div>
  );
};

export default TableKurs;