import { defaultState } from "../state"

const USER_ERROR = "USER_ERROR"
const DEFAULT_ERROR_USER = "DEFAULT_ERROR_USER"

const searchErrorUser = (arrayErrors, param) => {
  try {
    const error = arrayErrors.find( error => error.param === param).msg
    return error
  } catch(e) {
    return ''
  }
}

const defaultErrorUser = {password: '', email: '', name: '', surname: '', patronymic: '', phone: ''}

export const userErrorReducer = (state = defaultState, action) => {
  switch(action.type) {
    case USER_ERROR :
      return {...state, userError: {name: searchErrorUser(action.payload, 'name'),
    surname: searchErrorUser(action.payload, 'surname'), 
    patronymic: searchErrorUser(action.payload, 'patronymic'), 
    email: searchErrorUser(action.payload, 'email'), 
    phone: searchErrorUser(action.payload, 'phone'), 
    password: searchErrorUser(action.payload, 'password')}}
    case DEFAULT_ERROR_USER :
      return {...state, userError: defaultErrorUser}
    default: 
      return {...state};
  }
}

export const userErrorAction = (payload) => ({type: USER_ERROR, payload})
export const defaultErrorUserAction = (payload) => ({type: DEFAULT_ERROR_USER, payload})

