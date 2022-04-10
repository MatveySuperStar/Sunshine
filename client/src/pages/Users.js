import React, { useEffect, useState } from 'react';
import Navbar from './Account/Navbar'
import './Test/Test.scss'
import { getUsers } from '../../http/userAPI';
import './Test/Table.scss'
import { getAllUsersAction } from '../store/reducers/usersReducer';
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

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
  const user = useSelector(state => state.user.user)

  useEffect(async() => {
    dispatch(getAllUsersAction(await getUsers()))
  }, [])

  const addUpdateUser = (item) => {
    dispatch(updateUserAction({
      id: item[0],
      name: item[1], 
      surname: item[2], 
      patronymic: item[3],
      email: item[4],
      phone: item[5],
      status: item[6],
      group: item[7],
      update: true  
    }))
  }

  const params = [
    {label: 'Имя', type: 'text', action: updateNameAction, value: user.name},
    {label: 'Фамилия', type: 'text', action: updateSurnameAction, value: user.surname},
    {label: 'Отчество', type: 'text', action: updatePatronymicAction, value: user.patronymic},
    {label: 'Email', type: 'text', action: updateEmailAction, value: user.email},
    {label: 'Пароль', type: 'password', action: updatePasswordAction, value: user.password},
    {label: 'Телефон', type: 'phone', action: updatePhoneAction, value: user.phone},
    {label: 'Статус', type: 'select', action: updateStatusAction, value: user.status, options: ['Ученик', 'Преподаватель']},
    {label: 'Группа', type: 'select', action: updateGroupAction, value: user.group, options: ['1', '2', '4']}
  ]

  const legends = [
    ...params.filter( item => item.label !== 'Пароль').map(item => item.label),
  ]

  const items = users.filter((item, index) => index === 0).flat().map( item => {
      return [ item.id, item.first_name, item.second_name, item.patronymic, item.mail, item.phone, item.status, item.id_group]
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
        <Table addUpdate={addUpdateUser} items={items} legends={legends}/> 
      </div>
    </div>
  );
};

export default Users;