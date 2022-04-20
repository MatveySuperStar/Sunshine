import Account from "./pages/Account";
import Groups from "./pages/Groups";
import Main from "./pages/Main";
import Tests from './pages/Tests.js'
import Test from './pages/Test/Test.js'
import Users from "./pages/Users";
import { ACCOUNT_ROUTE, MAIN_ROUTE, PLACES_ROUTE, GROUPS_ROUTE, USERS_ROUTE, TESTS_ROUTE, TEST_ROUTE, MATERIAL_ROUTE } from "./utils/consts";
import Places from "./pages/Places";
import Material from "./pages/Material";

export const authRoutes = [
  {
    path: USERS_ROUTE,
    Component:'',
  }
]

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main
  },
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
    childRoutes: [
      {
        path: ACCOUNT_ROUTE,
        Component: Account,
      },
      {
        path: USERS_ROUTE,
        Component: Users,
      },
      {
        path: GROUPS_ROUTE,
        Component: Groups,
      },
      {
        path: TESTS_ROUTE,
        Component: Tests,
      },
      {
        path: TEST_ROUTE,
        Component: Test,
      },
      {
        path: PLACES_ROUTE,
        Component: Places,
      },
      {
        path: MATERIAL_ROUTE,
        Component: Material,
      }
    ]
  }

]