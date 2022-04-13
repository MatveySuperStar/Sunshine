import { defaultState } from "../state"

const GET_ALL_GROUPS = "GET_ALL_GROUPS"
const GET_ALL_GROUPS_WITH_PAGE = "GET_ALL_GROUPS_WITH_PAGE"
const ADD_CURRENT_PAGE_GROUPS = "ADD_CURRENT_PAGE_GROUPS"
const UPDATE_ALL_GROUPS = "UPDATE_ALL_GROUPS"

export const groupsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case GET_ALL_GROUPS:
      return {...state, groups: {data: action.payload.data}}
    case UPDATE_ALL_GROUPS:
      return {...state, groups: {...state.groups, data: action.payload.data, countPage: action.payload.countPage}}
    case ADD_CURRENT_PAGE_GROUPS :
      return {...state, groups: { ...state.groups, currentPage: action.payload.currentPage}}
    case GET_ALL_GROUPS_WITH_PAGE:
      return {...state, groups: {data: action.payload.data, countPage: action.payload.countPage, currentPage: action.payload.currentPage}}
    default: 
      return {...state};
  }
}

export const getAllGroupsAction = (payload) => ({type: GET_ALL_GROUPS, payload})
export const updateAllGroupsAction = (payload) => ({type: UPDATE_ALL_GROUPS, payload}) 
export const getAllGroupsWithPageAction = (payload) => ({type: GET_ALL_GROUPS_WITH_PAGE, payload})
export const addCurrentPageGroupsAction = (payload) => ({type: ADD_CURRENT_PAGE_GROUPS, payload})