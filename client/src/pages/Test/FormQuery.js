import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultUserAction, updateFioUserLike, updatePhoneUserLike} from '../../store/reducers/userReducer';
import { updateDataListUsersAction, updateUsersAction } from '../../store/reducers/usersReducer';
import { deleteUser, addUser, putUser, getLikeUsers } from '../../../http/userAPI';
import { userErrorAction } from '../../store/reducers/userErrorReducer';

const FormQuery = ({params, statusUpdate, openSubItem}) => {
  
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.users.dataListUsers)
  const userLike = useSelector(state => state.user.userForLike)
  return (
    <>
        {/*params.map( param => {
          return(
            param.type === 'select' ?
            <div className='col-md-12'>
              <label>{param.label}</label>
              <select name="select" value={param.value} onChange={(e) => dispatch(param.action(e.target.value))}>
                {param.options.map( option => <option 
                value={option.value}>{option.name}</option>)}
              </select>
            </div>
            : 
            <div className='col-md-12'>
              <label>{param.label}</label>
              <input type={param.type} value={param.value} onChange={(e) => dispatch(param.action(e.target.value))}/>
              <span className='error'>{param.error}</span>
            </div>
                )})*/}

        <div className='col-md-12'>
          <label>Добавить пользователя в группу</label>
        </div>
        <div className='col-md-12'>
          <label>ФИО</label>
          <input list="fio" value={userLike.fio} onChange={async(e) => {
            dispatch(updateFioUserLike(e.target.value))
            dispatch(updateDataListUsersAction(await getLikeUsers(userLike)))
          }}/>
          <datalist id='fio'>
            {
              usersList.map( dataList => {
                return <option value={dataList.fio}>{dataList.fio}</option>
              } )
            }
          </datalist>
        </div>
        <div className='col-md-12'>
          <label>Телефон</label>
          <input list='phone' value={userLike.phone} onChange={async(e) => {
            dispatch(updatePhoneUserLike(e.target.value))
            dispatch(updateDataListUsersAction(await getLikeUsers(userLike)))
              }}/>
          <datalist id='phone'>
            {
              usersList.map( dataList => {
                return <option value={dataList.phone}>{dataList.phone}</option>
              } )
            }
          </datalist>
        </div>


        <div className='row buttons'>
          <div className={`${statusUpdate === 'noActive'  ? 'active' : 'noActive'} col-md-12`}>
            <button onClick={async() => {
             
            }}>
              Добавить</button>
          </div>
          <div className={`${statusUpdate} col-md-6 `}>
            <button onClick={async() => {
             
            }
              }>Изменить</button>
          </div>
          <div className={`${statusUpdate} col-md-6`}>
            <button onClick={async() => {
              
            }
              }>Удалить</button>
          </div>
          <div className={`${statusUpdate} col-md-6`}>
            <button onClick={() => dispatch(defaultUserAction())}>Выйти</button>
          </div>
        </div>
      </>
  );
};

export default FormQuery;