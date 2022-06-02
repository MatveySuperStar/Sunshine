import { defaultState } from "../state"

const UPDATE_ONE_KURS = "UPDATE_ONE_KURS"
const DEFAULT_ONE_KURS = "DEFAULT_ONE_KURS"
const UPDATE_TITLE_ONE_KURS = "UPDATE_TITLE_ONE_KURS"
const UPDATE_DESCRIPTION_ONE_KURS = "UPDATE_DESCRIPTION_ONE_KURS"
const UPDATE_PRICE_ONE_KURS = "UPDATE_PRICE_ONE_KURS"
const UPDATE_TIME_ONE_KURS = "UPDATE_TIME_ONE_KURS"


const defaultUser = {id:0, title: '', description: '', price: 0, time: 60, update: false}

export const oneKursReducer = (state = defaultState, action) => {
  switch(action.type) {
    case UPDATE_ONE_KURS :
      return {...state, oneKurs: action.payload}
    case DEFAULT_ONE_KURS :
      return {...state, oneKurs: defaultUser}
    case UPDATE_TITLE_ONE_KURS :
      return {...state, oneKurs: {...state.kurs, title: action.payload}}
    case UPDATE_DESCRIPTION_ONE_KURS :
      return {...state, oneKurs: {...state.kurs, description: action.payload}}
    case UPDATE_PRICE_ONE_KURS : 
      return {...state, oneKurs: {...state.kurs, price: action.payload}}
    case UPDATE_TIME_ONE_KURS :
      return {...state, oneKurs: {...state.kurs, time: action.payload}}
    default: 
      return {...state};
  }
}

export const updateOneKursAction = (payload) => ({type:  UPDATE_ONE_KURS, payload})
export const defaultOneKursAction = (payload) => ({type: DEFAULT_ONE_KURS, payload})
export const UpdateTitleOneKursAction = (payload) => ({type: UPDATE_TITLE_ONE_KURS, payload})
export const UpdateDescriptionOneKursAction = (payload) => ({type: UPDATE_DESCRIPTION_ONE_KURS, payload})
export const UpdatePriceOneKursAction = (payload) => ({type: UPDATE_PRICE_ONE_KURS, payload})
export const UpdateTimeOneKursAction = (payload) => ({type: UPDATE_TIME_ONE_KURS, payload})
