import { defaultState } from "../state"

const CUSTOM_ERROR = "CUSTOM_ERROR"
const DEFAULT_CUSTOM_ERROR = "DEFAULT_CUSTOM_ERROR"

export const errorReducer = (state = defaultState, action) => {
  switch(action.type) {
    case CUSTOM_ERROR :
      return {...state, customError: action.payload}
    case DEFAULT_CUSTOM_ERROR :
      return {...state, customError: []}
    default: 
      return {...state};
  }
}

export const customErrorAction = (payload) => ({type: CUSTOM_ERROR, payload})
export const defaultCustomErrorAction = (payload) => ({type: DEFAULT_CUSTOM_ERROR, payload})

