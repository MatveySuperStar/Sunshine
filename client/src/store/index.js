import { createStore, combineReducers } from "redux";
import { testReducer } from "./reducers/testReducer";
import { userReducer } from "./reducers/userReducer";
import { usersReducer } from "./reducers/usersReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { groupsReducer } from "./reducers/groupsReducer";
import { userErrorReducer } from "./reducers/userErrorReducer";
import { groupReducer } from "./reducers/groupReducer";
import { emailReducer } from "./reducers/emailReducer";
import { testsReducer } from "./reducers/testsReducer";
import { parametrsReducer } from "./reducers/parametrsReducer";
import { placesReducer } from "./reducers/placesReducer";
import { answerReducer } from "./reducers/answerReducer";
import { errorReducer } from "./reducers/errorReducer";
import { authUserReducer } from "./reducers/authUserReducer";
import { oneKursReducer } from "./reducers/oneKursReducer";
import { kursReducer } from "./reducers/kursReducer";

const rootReducer = combineReducers({
  test: testReducer,
  tests: testsReducer,
  users: usersReducer,
  user: userReducer,
  groups: groupsReducer,
  group: groupReducer,
  userError: userErrorReducer,
  email: emailReducer,
  parametrs: parametrsReducer,
  places: placesReducer,
  answerUser: answerReducer,
  error: errorReducer,
  authUser: authUserReducer,
  oneKurs: oneKursReducer,
  kurs: kursReducer
  
})

export const store = createStore(rootReducer, composeWithDevTools());