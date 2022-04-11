import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultUserAction} from '../../store/reducers/userReducer';
import { updateUsersAction } from '../../store/reducers/usersReducer';
import { deleteUser, addUser, putUser } from '../../../http/userAPI';
import { userErrorAction } from '../../store/reducers/userErrorReducer';

const FormAdmin = ({params}) => {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const users = useSelector(state => state.users.users)
  const statusUpdate = user.update ? 'active' : 'noActive'

  return (
    <div className={`col-md-3 add_form `}>
        {params.map( param => {
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
          )})}
        <div className='row buttons'>
          <div className={`${!user.update ? 'active' : 'noActive'} col-md-12`}>
            <button onClick={async() => {
              const usersData = await addUser({...user, page: users.currentPage})
              console.log(usersData)
              if(usersData.errors) {
                dispatch(userErrorAction(usersData.errors))
              } else {
              
              dispatch(updateUsersAction({data: users.data, countPage: users.countPage}))
              }
            }}>
              Добавить</button>
          </div>
          <div className={`${statusUpdate} col-md-6 `}>
            <button onClick={async() => {
              dispatch(updateUsersAction(await putUser({...user, page: users.currentPage})))
            }
              }>Изменить</button>
          </div>
          <div className={`${statusUpdate} col-md-6`}>
            <button onClick={async() => {
              dispatch(updateUsersAction(await deleteUser(user.id, users.currentPage)))
              dispatch(defaultUserAction())
            }
              }>Удалить</button>
          </div>
          <div className={`${statusUpdate} col-md-6`}>
            <button onClick={() => dispatch(defaultUserAction())}>Выйти</button>
          </div>
        </div>
      </div>
  );
};

export default FormAdmin;