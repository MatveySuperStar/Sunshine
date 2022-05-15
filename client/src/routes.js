import Account from "./pages/Account/Account";
import Groups from "./pages/Account/Groups/Groups";
import Main from "./pages/Main/Main";
import Tests from './pages/Account/Tests/Tests.js'
import Test from './pages/Account/Tests/Test/Test.js'
import Users from "./pages/Account/Users/Users";
import { ACCOUNT_ROUTE, MAIN_ROUTE, PLACES_ROUTE, GROUPS_ROUTE, USERS_ROUTE, TESTS_ROUTE, TEST_ROUTE, MATERIAL_ROUTE, TRIAL_TEST_ROUTE } from "./utils/consts";
import Places from "./pages/Account/Places/Places";
import TryTest from "./pages/TryTest";

export const authRoutes = [
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
    childRoutes: [
      {
        path: ACCOUNT_ROUTE,
        role: [
          "Админ",
          "Ученик",
          "Преподаватель"
        ],
        Component: Account,
      },
      {
        path: USERS_ROUTE,
        role: [
          "Админ",
          "Преподаватель"
        ],
        Component: Users,
      },
      {
        path: GROUPS_ROUTE,
        role: [
          "Админ",
          "Преподаватель"
        ],
        Component: Groups,
      },
      {
        path: TESTS_ROUTE,
        role: [
          "Админ",
          "Преподаватель"
        ],
        Component: Tests,
      },
      {
        path: TEST_ROUTE,
        role: [
          "Админ",
          "Преподаватель"
        ],
        Component: Test,
      },
      {
        path: PLACES_ROUTE,
        role: [
          "Админ",
        ],
        Component: Places,
      },
      {
        path: MATERIAL_ROUTE,
        role: [
          "Админ",
          "Преподаватель",
          "Ученик"
        ],
      },
      {
        path: TRIAL_TEST_ROUTE,
        role: [
          "Админ",
          "Преподаватель",
          "Ученик"
        ],
        Component: TryTest
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