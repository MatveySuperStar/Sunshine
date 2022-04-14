import { defaultState } from "../state"

const UPDATE_EMAIL_NAME = "UPDATE_GROUP"
const UPDATE_EMAIL_EMAIL = "UPDATE_EMAIL_EMAIL"
const UPDATE_EMAIL_PHONE = "UPDATE_EMAIL_PHONE"
const UPDATE_EMAIL_KURS = "UPDATE_EMAIL_KURS"
const UPDATE_EMAIL_DATALIST_KURS = "UPDATE_EMAIL_DATALIST_KURS"
const UPDATE_EMAIL_MESSAGE = "UPDATE_EMAIL_MESSAGE"
const UPDATE_EMAIL_ERRORS = "UPDATE_EMAIL_ERRORS"
const DEFAULT_EMAIL = "DEFAULT_EMAIL"

const defaultEmail = {name: '', kurs: {value: '', datalist: ''}, email: '', phone: '', message: ''}

const searchError = (arrayErrors, param) => {
  try {
    const error = arrayErrors.find( error => error.param === param).msg
    return error
  } catch(e) {
    return ''
  }
}

export const emailReducer = (state = defaultState, action) => {
  switch(action.type) {
    case UPDATE_EMAIL_NAME :
      return {...state, email: {...state.email, name: action.payload}}
    case UPDATE_EMAIL_EMAIL :
      return {...state, email: {...state.email, email: action.payload}}
    case UPDATE_EMAIL_PHONE :
      return {...state, email: {...state.email, phone: action.payload}}
    case UPDATE_EMAIL_KURS :
      return {...state, email: {...state.email, kurs: {...state.email.kurs, value: action.payload}}}
    case UPDATE_EMAIL_DATALIST_KURS :
      return {...state, email: {...state.email, kurs: {...state.email.kurs, datalist: action.payload}}}
    case UPDATE_EMAIL_MESSAGE :
      return {...state, email: {...state.email, message: action.payload}}
    case UPDATE_EMAIL_ERRORS :
      return {...state, email: {...state.email, errors: {name: searchError(action.payload, 'name'),
      email: searchError(action.payload, 'email'), 
      phone: searchError(action.payload, 'phone'), 
      message: searchError(action.payload, 'message')}}}
    case DEFAULT_EMAIL : 
      return {...state, email: defaultEmail}
    default: 
      return {...state};
  }
}

export const updateEmailNameAction = (payload) => ({type: UPDATE_EMAIL_NAME, payload})
export const updateEmailEmailAction = (payload) => ({type: UPDATE_EMAIL_EMAIL, payload})
export const updateEmailPhoneAction = (payload) => ({type: UPDATE_EMAIL_PHONE, payload})
export const updateEmailKursAction = (payload) => ({type: UPDATE_EMAIL_KURS, payload})
export const updateEmailDatalistKursAction = (payload) => ({type: UPDATE_EMAIL_DATALIST_KURS, payload})
export const updateEmailMessageAction = (payload) => ({type: UPDATE_EMAIL_MESSAGE, payload})
export const updateEmailErrorsAction = (payload) => ({type: UPDATE_EMAIL_ERRORS, payload})
export const defaultEmailAction = (payload) => ({type: DEFAULT_EMAIL, payload})