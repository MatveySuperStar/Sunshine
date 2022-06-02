import { defaultState } from "../state"

const INIT_KURS = "INIT_USERS"
const ADD_CURRENT_PAGE_KURS = "ADD_CURRENT_PAGE_KURS"
const UPDATE_KURS = "UPDATE_KURS"

export const kursReducer = (state = defaultState, action) => {
  switch(action.type) {
    case INIT_KURS :
      console.log(action.payload)
      return {...state, kurs: {data: action.payload.data, countPage: action.payload.countPage, currentPage: action.payload.currentPage}}
    case ADD_CURRENT_PAGE_KURS :
      return {...state, kurs: { ...state.kurs, currentPage: action.payload.currentPage}}
    case UPDATE_KURS :
      return {...state, kurs: {...state.kurs, data: action.payload.data, countPage: action.payload.countPage}}
    default: 
      return {...state};
  }
}

export const initKursAction = (payload) => ({type: INIT_KURS, payload})
export const addCurrentPageKursAction = (payload) => ({type: ADD_CURRENT_PAGE_KURS, payload})
export const updateKursAction = (payload) => ({type: UPDATE_KURS, payload})
