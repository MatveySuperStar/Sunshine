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

const GET_ALL_USERS = "GET_ALL_USERS"
const DELETE_DB_USER = "DELETE_DB_USER"

export const usersReducer = (state = defaultState, action) => {
  switch(action.type) {
    case GET_ALL_USERS :
      return {...state, users: pagination(11, action.payload)}
    case DELETE_DB_USER :
      return {...state, users: pagination(11, action.payload)}

    default: 
      return {...state};
  }
}

export const getAllUsersAction = (payload) => ({type: GET_ALL_USERS, payload})
export const deleteDbUserAction = (payload) => ({type: DELETE_DB_USER, payload})