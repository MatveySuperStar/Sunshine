import Account from "./pages/Account/Account";
import Groups from "./pages/Account/Groups/Groups";
import Main from "./pages/Main/Main";
import Tests from './pages/Tests.js'
import Test from './pages/Test/Test.js'
import Users from "./pages/Account/Users/Users";
import { ACCOUNT_ROUTE, MAIN_ROUTE, PLACES_ROUTE, GROUPS_ROUTE, USERS_ROUTE, TESTS_ROUTE, TEST_ROUTE, MATERIAL_ROUTE } from "./utils/consts";
import Places from "./pages/Account/Places/Places";

export const authRoutes = [
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
    childRoutes: [
      {
        path: ACCOUNT_ROUTE,
        role: [
          "Admin",
          "Ученик",
          "Преподаватель"
        ],
        Component: Account,
      },
      {
        path: USERS_ROUTE,
        role: [
          "Admin",
          "Преподаватель"
        ],
        Component: Users,
      },
      {
        path: GROUPS_ROUTE,
        role: [
          "Admin",
          "Преподаватель"
        ],
        Component: Groups,
      },
      {
        path: TESTS_ROUTE,
        role: [
          "Admin",
          "Преподаватель"
        ],
        Component: Tests,
      },
      {
        path: TEST_ROUTE,
        role: [
          "Admin",
          "Преподаватель"
        ],
        Component: Test,
      },
      {
        path: PLACES_ROUTE,
        role: [
          "Admin",
        ],
        Component: Places,
      },
      {
        path: MATERIAL_ROUTE,
        role: [
          "Admin",
          "Преподаватель",
          "Ученик"
        ],
      }
    ]
  }
]

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main
  },
]