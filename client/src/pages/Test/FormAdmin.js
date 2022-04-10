import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultUserAction} from '../../store/reducers/userReducer';
import { deleteDbUserAction, getAllUsersAction } from '../../store/reducers/usersReducer';
import { deleteUser, addUser, putUser } from '../../../http/userAPI';

const FormAdmin = ({params}) => {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
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
                value={option}>{option}</option>)}
              </select>
            </div>
            : 
            <div className='col-md-12'>
              <label>{param.label}</label>
              <input type={param.type} value={param.value} onChange={(e) => dispatch(param.action(e.target.value))}
              />
            </div>
          )})}
        <div className='row buttons'>
          <div className={`${!user.update ? 'active' : 'noActive'} col-md-12`}>
            <button onClick={async() => {
              console.log(user)
              const users = await addUser(user)
              dispatch(deleteDbUserAction(users))
              
            }}>
              Добавить</button>
          </div>
          <div className={`${statusUpdate} col-md-6 `}>
            <button onClick={async() => {
              const users = await putUser(user)
              dispatch(getAllUsersAction(users))
            }
              }>Изменить</button>
          </div>
          <div className={`${statusUpdate} col-md-6`}>
            <button onClick={async() => {
              const users = await deleteUser(user.id)
              dispatch(getAllUsersAction(users))
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