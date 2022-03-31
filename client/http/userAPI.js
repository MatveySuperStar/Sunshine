import $api from "."
import jwt_decode from 'jwt-decode'

export const login = async (email, password) => {
  const {data} = await $host.post('api/user/login', {email, password})
  console.log(data)
  return jwt_decode(data.token)
}