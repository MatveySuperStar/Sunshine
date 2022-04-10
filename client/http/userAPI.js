import $api from "."
import jwt_decode from 'jwt-decode'

export const login = async (email, password) => {
  const {data} = await $api.post('api/user/login', {email, password})
  console.log(data)
  return jwt_decode(data.token)
}

export const getUsers = async () => {
  const {data} = await $api.get('api/user/')
  
  /*return jwt_decode(data.token)*/
  return data.users
}

export const deleteUser = async (id) => {
  
  const {data} = await $api.delete('api/user/delete', {data: {id: id}})
  /*return jwt_decode(data.token)*/
  return data.users
}

export const addUser = async ({email, name, surname, patronymic, phone, group, password, status}) => {
  try{
  const dbw = await $api.post('api/user/registration', {email: email, name: name, surname: surname, patronymic: patronymic,
     phone: phone, id_group: group, password: password, status: status})
     .then(result => console.log(result))
     .catch((e) => console.log(e.response.data.errors.errors))
  
  /*return jwt_decode(data.token)*/
  return dbw
  } catch(e) {
    console.log(e)
  }
}

export const putUser = async ({id, email, name, surname, patronymic, phone, group, password, status}) => {
  const {data} = await $api.put('api/user/put', {id: id, email: email, name: name, surname: surname, patronymic: patronymic,
    phone: phone, id_group: group, password: password, status: status})
    .then(result => result)
    .catch((e) => console.log(e.response.data.errors.errors))
  /*return jwt_decode(data.token)*/

  return data.users
}