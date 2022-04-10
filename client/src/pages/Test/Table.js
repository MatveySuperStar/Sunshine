import React from 'react';
import { useSelector } from 'react-redux';

const Table = ({addUpdate, items, legends}) => {

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
          {item.filter((item, index) => index != 0).map( subitem => {
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
        <div>
          <div>1</div>
          <div>1</div>
        </div>
      </table>
    </div>
  );
};

export default Table;