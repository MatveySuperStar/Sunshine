import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { deleteAllRating, deleteOneRating, getAllRaiting, getGroupRaiting, getGroupUsersRating } from '../../../../http/raitingAPI';
import './tableRating.scss';

const TableRating = (all, navRating) => {
  const [items, setItems] = useState([{}])
  const [subItems, setSubItems] = useState([{}])
  const [activeItems, setActiveItems] = useState([{}])

  const authUser = useSelector(state => state.authUser?.authUser);

  useEffect(async() => {
    if(all.all) {
      const rating = await getAllRaiting();
      setItems(rating)
      setActiveItems(rating.map( item => { return {id: item.id, active: false} }))
    } else {
      const rating = await getGroupRaiting(authUser.user.id_group);
      setItems(rating)
      setActiveItems(rating.map( item => { return {id: item.id, active: false} }))
    }
  }, [all.all])

  const legends = [
    'Название теста',
    'Название группы',
    'Дата прохождения',
    'Удалить'
  ]

  const subLegends = [
    'Имя',
    'Фамилия',
    'Отчество',
    'Оценка',
    'Удалить'
  ]

  const legendsTable = useMemo(() => {
    return legends.map(legend => <th key={legend}>{legend}</th>)
  }, [legends])

  const subLegendsTable = useMemo(() => {
    return subLegends.map(subLegend => <th key={subLegend}>{subLegend}</th>)
  }) 

 const subTable = useMemo(() => {
      return (
        <tr>
          <td colSpan="4">
            <table className='nasted_table'>
              <thead>
              <tr>
                {subLegends.map( legend => <th key={legend}>{legend}</th>)}
              </tr>
              </thead>
              <tbody>
                {subItems.map(user => {
                  return (
                    <tr key={user.id}>  
                    {
                      Object.keys(user).map( userData => {
                        if(userData != 'id' && userData !== 'idTest' && userData !== 'date') {
                          return <td key={userData}>{user[userData]}</td>
                        }
                      })
                    } 
                    <td className='wr_del'><button 
                     className='delete'
                     onClick={async () => await deleteOneRating(user.id) }>Удалить</button></td>
                    </tr>)
                })}
            
              </tbody>
            </table>
          </td>
        </tr>
      )
  }, [items, subLegends, subItems])

  const itemsTable = useMemo(() => {
    return items.map( (item, index) => {
      return (
       <>
          <tr className={`main_tr ${activeItems[index]?.active ? 'active' : ''}`} 
          onClick={async() => {
            setSubItems(await getGroupUsersRating(item.idTest, authUser.user.id_group, item.date))
            setActiveItems(activeItems.map( state => state.id === item.id ? 
              {...state, active: !state.active} : {...state, active: false}))
            }}>
            {
              Object.keys(item).filter( (subitem, index) => index != 0).map( subitem => {
                if(subitem === "date") {
                  return (
                    <td>
                      {`${new Date(item[subitem]).getFullYear()}-${new Date(item[subitem]).getMonth()+1}-${new Date(item[subitem]).getDate()}`}
                    </td>
                  )
                }
                else if(subitem !== "idTest") {
                  return <td>{item[subitem]}</td>
                }
              })
            }
            <td><button onClick={async () => {
              
              await deleteAllRating(item.date, item.nameGroup, item.idTest)
              if(all.all) {
              const rating = await getAllRaiting();
              setItems(rating) 
              } else {
                const rating = await getGroupRaiting(authUser.user.id_group);
                setItems(rating)
              }
              }} className='delete'>Удалить</button></td>
          </tr>

          {
          subItems[0]?.idTest === item.idTest && subItems[0]?.date === item.date && activeItems[index]?.active ? 
            subTable : ''
          }
        </>
      )
    })      
  }, [items, subItems, activeItems, getGroupUsersRating, setSubItems])

  return (
    <div>
      <table className='main_table rating'>
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
        {/*<Pagination 
          count={countPage} 
          variant="outlined" 
          shape="rounded"
          onChange={(event, value)=>currentPage(value)}/>
  */}
      </div>
    </div>
    );
  };


export default TableRating;