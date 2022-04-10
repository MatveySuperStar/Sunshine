import { createStore, combineReducers } from "redux";
import { testReducer } from "./reducers/testReducer";
import { userReducer } from "./reducers/userReducer";
import { usersReducer } from "./reducers/usersReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  test: testReducer,
  users: usersReducer,
  user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools());