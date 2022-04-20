import { defaultState } from "../state"

const UPDATE_ACCOUNT_PARAMETRS = "UPDATE_ACCOUNT_PARAMETRS"


export const parametrsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case UPDATE_ACCOUNT_PARAMETRS :
      return {...state, parametrs: [
        {...state.parametrs[0], number: action.payload.countStudents},
        {...state.parametrs[1], number: action.payload.countPlaces},
        {...state.parametrs[2], number: action.payload.countTeachers},
      ]}
    default: 
      return {...state};
  }
}

export const updateAccountParametrsAction = (payload) => ({type: UPDATE_ACCOUNT_PARAMETRS, payload})