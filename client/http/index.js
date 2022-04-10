import axios from 'axios'

export const API_URL = 'http://localhost:5000/'

const $api = axios.create({
  
  baseURL: API_URL
})

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use( config => {
  return config
},  ( async error => {
    const originRequest = error.config
    if(error.response.status == 401 && error.config && !error.config._isRetry) {
      try{
        originRequest._isRetry = true

        const responce = await axios.get(`${API_URL}/refresh`)
        localStorage.setItem('token', responce.data.accessToken)
        return $api.request(originRequest)
      } catch(e) {
        console.log(e)
      }
    }
    throw error
}))

export default $api