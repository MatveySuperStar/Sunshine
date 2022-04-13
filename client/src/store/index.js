import { createStore, combineReducers } from "redux";
import { testReducer } from "./reducers/testReducer";
import { userReducer } from "./reducers/userReducer";
import { usersReducer } from "./reducers/usersReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { groupsReducer } from "./reducers/groupsReducer";
import { userErrorReducer } from "./reducers/userErrorReducer";
import { groupReducer } from "./reducers/groupReducer";

const rootReducer = combineReducers({
  test: testReducer,
  users: usersReducer,
  user: userReducer,
  groups: groupsReducer,
  group: groupReducer,
  userError: userErrorReducer
})

export const store = createStore(rootReducer, composeWithDevTools());