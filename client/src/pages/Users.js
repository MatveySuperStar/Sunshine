import React, { useEffect, useState } from 'react';
import Navbar from './Account/Navbar'
import './Test/Test.scss'
import { getUsers } from '../../http/userAPI';
import './Test/Table.scss'
import { addCurrentPageAction, initUsersAction, updateUsersAction } from '../store/reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { 
  updateNameAction, 
  updateEmailAction, 
  updateSurnameAction, 
  updatePatronymicAction,
  updatePasswordAction,
  updatePhoneAction,
  updateStatusAction,
  updateGroupAction, 
  updateUserAction
} from '../store/reducers/userReducer';
   
import Table from './Test/Table';
import FormAdmin from './Test/FormAdmin';
import { getAllGroupsAction } from '../store/reducers/groupsReducer';
import { getGroups } from '../../http/groupAPI';
import { defaultErrorUserAction } from '../store/reducers/userErrorReducer';

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
  const user = useSelector(state => state.user.user)
  const groups = useSelector(state => state.groups.groups)
  const userError = useSelector(state => state.userError.userError)

  useEffect(async() => {
    dispatch(getAllGroupsAction(await getGroups()))
    const users = await getUsers()
    dispatch(initUsersAction(users))
  }, [])

  const addUpdateUser = (user) => {
    const group = groups.find(group => group.name === user[7])
    dispatch(defaultErrorUserAction())
    dispatch(updateUserAction({
      id: user[0],
      name: user[1], 
      surname: user[2], 
      patronymic: user[3],
      email: user[4],
      phone: user[5],
      status: user[6],
      groupId: group !== undefined ? group.id : 0,
      update: true  
    }))
  }

  const currentPage = async(value) =>{
    dispatch(addCurrentPageAction({currentPage: value}))
    dispatch(updateUsersAction(await getUsers(value)))
  }

  const params = [
    {label: 'Имя', type: 'text', action: updateNameAction, value: user.name, error: userError.name},
    {label: 'Фамилия', type: 'text', action: updateSurnameAction, value: user.surname, error: userError.surname},
    {label: 'Отчество', type: 'text', action: updatePatronymicAction, value: user.patronymic, error: userError.patronymic},
    {label: 'Email', type: 'text', action: updateEmailAction, value: user.email, error: userError.email},
    {label: 'Пароль', type: 'password', action: updatePasswordAction, value: user.password, error: userError.password},
    {label: 'Телефон', type: 'phone', action: updatePhoneAction, value: user.phone, error: userError.phone},
    {label: 'Статус', type: 'select', action: updateStatusAction, value: user.status, options: [
      {value: 'Ученик', name: 'Ученик'},
      {value: 'Преподаватель', name: 'Преподаватель'}]},
    {label: 'Группа', type: 'select', action: updateGroupAction, value: user.groupId, options: 
    [{value: 0, name: 'По умолчанию'}, 
    ...groups.map( group => 
      {
        return {value: group.id, name: group.name }
      }
    )]
    }
  ]

  const legends = [
    ...params.filter( item => item.label !== 'Пароль').map(item => item.label),
  ]

 
  const items = users.data.map( item => {
      return [ item.id, item.name, item.surname, item.patronymic, item.email, item.phone, item.status, item.groupName]
    })
 
  return (
    <div className='container'>
      <div className='row header_table'>
        <div className='col-md-6'>
          <h3>Таблица пользователей</h3>
        </div>
      </div>
      <div className='row'>
        <FormAdmin  params={params}/>
        <Table 
          addUpdate={addUpdateUser} 
          items={items} 
          legends={legends} 
          countPage={users.countPage}
          currentPage={currentPage}
        /> 
      </div>
    </div>
  );
};

export default Users;