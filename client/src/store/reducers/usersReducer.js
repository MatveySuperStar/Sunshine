import { defaultState } from "../state"

function randomInt() {
  return parseInt(Math.random() * 1000)
}

function pagination(size, array) {
  return array.reduce((p,c)=>{
    if(p[p.length-1].length == size){
      p.push([]);
    }
    
    p[p.length-1].push(c);
    return p;
  }, [[]]);
}

const INIT_USERS = "INIT_USERS"
const ADD_CURRENT_PAGE = "ADD_CURRENT_PAGE"
const UPDATE_USERS = "UPDATE_USERS"
const UPDATE_ALL_USERS  = "UPDATE_ALL_USERS"
const UPDATE_DATA_LIST_USERS = "UPDATE_DATA_LIST_USERS"

export const usersReducer = (state = defaultState, action) => {
  switch(action.type) {
    case INIT_USERS :
      return {...state, users: {data: action.payload.data, countPage: action.payload.countPage, currentPage: action.payload.currentPage}}
    case ADD_CURRENT_PAGE :
      return {...state, users: { ...state.users,currentPage: action.payload.currentPage}}
    case UPDATE_USERS :
      return {...state, users: {...state.users, data: action.payload.data, countPage: action.payload.countPage}}
    case UPDATE_ALL_USERS :
      return {...state, users: {...state.users, data: action.payload.data, idGroup: action.payload.idGroup}}

    case UPDATE_DATA_LIST_USERS :
      console.log(action.payload)
      return {...state, dataListUsers: action.payload.data }
    default: 
      return {...state};
  }
}

export const initUsersAction = (payload) => ({type: INIT_USERS, payload})
export const addCurrentPageAction = (payload) => ({type: ADD_CURRENT_PAGE, payload})
export const updateUsersAction = (payload) => ({type: UPDATE_USERS, payload})
export const updateAllUsersAction = (payload) => ({type: UPDATE_ALL_USERS, payload})
export const updateDataListUsersAction = (payload) => ({type: UPDATE_DATA_LIST_USERS, payload})