import { defaultState } from "../state"

const UPDATE_GROUP = "UPDATE_GROUP"
const UPDATE_GROUP_NAME = "UPDATE_GROUP_NAME"
const UPDATE_GROUP_USER_NAME = "UPDATE_GROUP_USER_NAME"
const DEFAULT_GROUP = "DEFAULT_GROUP"

const defaultGroup = {id: 0, name: '', update: false}

export const groupReducer = (state = defaultState, action) => {
  switch(action.type) {
    case UPDATE_GROUP :
      return {...state, group: action.payload}
    case UPDATE_GROUP_NAME :
      return {...state, group: {...state.group, name: action.payload}}
    case UPDATE_GROUP_USER_NAME :
      return {...state, user: {...state.user, name: action.payload}}
    case DEFAULT_GROUP : 
      return {...state, group: defaultGroup}
    default: 
      return {...state};
  }
}

export const updateGroupAction = (payload) => ({type: UPDATE_GROUP, payload})
export const updateGroupNameAction = (payload) => ({type: UPDATE_GROUP_NAME, payload})
export const defaultGroupAction = (payload) => ({type: DEFAULT_GROUP, payload})