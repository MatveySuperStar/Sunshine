import { defaultState } from "../state"

const GET_ALL_GROUPS = "GET_ALL_GROUPS"

export const groupsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case GET_ALL_GROUPS:
      return {...state, groups: action.payload}
    default: 
      return {...state};
  }
}

export const getAllGroupsAction = (payload) => ({type: GET_ALL_GROUPS, payload})
