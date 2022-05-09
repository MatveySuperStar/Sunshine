import { defaultState } from "../state"

const AUTH_USER = "AUTH_USER"
const DEFAULT_AUTH_USER = "DEFAULT_AUTH_USER"

export const authUserReducer = (state = defaultState, action) => {
  switch(action.type) {
    case AUTH_USER :
      return {...state, authUser: action.payload}
    case DEFAULT_AUTH_USER :
      return {...state, authUser: { isAuth: false, user: {}}}
    default: 
      return {...state};
  }
}

export const authUserAction = (payload) => ({type: AUTH_USER, payload})
export const defaultAuthUserAction = (payload) => ({type: DEFAULT_AUTH_USER, payload})

