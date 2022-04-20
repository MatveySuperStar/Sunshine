import { defaultState } from "../state"

const ADD_ALL_TESTS = "ADD_ALL_TESTS"

export const testsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_ALL_TESTS : {
      return {...state, tests: action.payload}
    }
    default: {
      return {...state};
    }
  }
}

export const addAllTestsAction = (payload) => ({type: ADD_ALL_TESTS, payload})
