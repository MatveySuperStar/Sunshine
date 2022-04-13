import { defaultState } from "../state"

const UPDATE_USER = "UPDATE_USER"
const DEFAULT_USER = "DEFAULT_USER"
const UPDATE_DB_USER = "UPDATE_DB_USER"
const ADD_DB_USER = "ADD_DB_USER"
const UPDATE_EMAIL = "UPDATE_EMAIL"
const UPDATE_NAME = "UPDATE_NAME"
const UPDATE_SURNAME = "UPDATE_SERNAME"
const UPDATE_PATRONYMIC = "UPDATE_PATRONYMIC"
const UPDATE_PHONE = "UPDATE_PHONE"
const UPDATE_PASSWORD = "UPDATE_PASSWORD"
const UPDATE_GROUP = "UPDATE_GROUP"
const UPDATE_STATUS = "UPDATE_STATUS"

const UPDATE_FIO_USER_LIKE = "UPDATE_FIO_USER_LIKE"
const UPDATE_PHONE_USER_LIKE = "UPDATE_PHONE_USER_LIKE"
const UPDATE_DATA_LIST_USER_LIKE = "UPDATE_DATA_LIST_USER_LIKE"

const defaultUser = {id: 0, email: '', name: '', surname: '', patronymic: '', phone: '', group: '', status: '', update: false}

export const userReducer = (state = defaultState, action) => {
  switch(action.type) {
    case UPDATE_USER :
      return {...state, user: action.payload}
    case UPDATE_DB_USER :
      return {...state, user: defaultUser}
    case ADD_DB_USER :
      return {...state, user: defaultUser}
    case DEFAULT_USER :
      return {...state, user: defaultUser}
    case UPDATE_EMAIL : 
      return {...state, user: {...state.user, email: action.payload}}
    case UPDATE_NAME :
      return {...state, user: {...state.user, name: action.payload}}
    case UPDATE_SURNAME :
      return {...state, user: {...state.user, surname: action.payload}}
    case UPDATE_PATRONYMIC :
      return {...state, user: {...state.user, patronymic: action.payload}}
    case UPDATE_PHONE :
      return {...state, user: {...state.user, phone: action.payload}}
    case UPDATE_PASSWORD :
      return {...state, user: {...state.user, password: action.payload}}
    case UPDATE_GROUP :
      return {...state, user: {...state.user, groupId: action.payload}}
    case UPDATE_STATUS :
      return {...state, user: {...state.user, status: action.payload}}


    case UPDATE_FIO_USER_LIKE : 
      return {...state, userForLike: {...state.userForLike, fio: action.payload}}  
    case UPDATE_PHONE_USER_LIKE : 
      return {...state, userForLike: {...state.userForLike, phone: action.payload}}  
    case UPDATE_DATA_LIST_USER_LIKE : 
      return {...state, userForLike: {...state.userForLike, update: action.payload}} 
    default: 
      return {...state};
  }
}

export const updateUserAction = (payload) => ({type: UPDATE_USER, payload})
export const defaultUserAction = (payload) => ({type: DEFAULT_USER, payload})

export const UpdateDbUserAction = (payload) => ({type: UPDATE_DB_USER, payload})
export const addDbUserAction = (payload) => ({type: ADD_DB_USER, payload})

export const updateEmailAction = (payload) => ({type: UPDATE_EMAIL, payload})
export const updateNameAction = (payload) => ({type: UPDATE_NAME, payload})
export const updateSurnameAction = (payload) => ({type: UPDATE_SURNAME, payload})
export const updatePatronymicAction = (payload) => ({type: UPDATE_PATRONYMIC, payload})
export const updatePhoneAction = (payload) => ({type: UPDATE_PHONE, payload})
export const updatePasswordAction = (payload) => ({type: UPDATE_PASSWORD, payload})
export const updateGroupAction = (payload) => ({type: UPDATE_GROUP, payload})
export const updateStatusAction = (payload) => ({type: UPDATE_STATUS, payload})

export const updateFioUserLike = (payload) => ({type: UPDATE_FIO_USER_LIKE, payload})
export const updatePhoneUserLike = (payload) => ({type: UPDATE_PHONE_USER_LIKE, payload})
export const updateDataListUserLikeLike = (payload) => ({type: UPDATE_DATA_LIST_USER_LIKE, payload})