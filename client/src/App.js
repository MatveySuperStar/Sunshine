import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Route, Routes} from 'react-router-dom'
import Navbar from './pages/Account/Components/Navbar';
import { publicRoutes, authRoutes } from './routes';
import { checkAuth } from '../http/userAPI';
import { useDispatch } from 'react-redux';
import { authUserAction } from './store/reducers/authUserReducer';
import { useCookies } from 'react-cookie';
import LeftNavigation from './pages/Account/Components/LeftNavigation';


const App = () => {
  const authUser = useSelector(state => state.authUser?.authUser)
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies();
  
  useEffect(async() => {
    if(localStorage.getItem('token')) {
      const data = await checkAuth(cookies.refreshToken)
      localStorage.setItem('token', data.data.accessToken)  
      setCookie('refreshToken', data.data.refreshToken, {httpOnly: false})  
      dispatch(authUserAction({isAuth: true, user: data.data.user}))
    } 
  }, [checkAuth])

  return (
    <>
      {authUser.isAuth ?
      <>
      <Navbar />
        <LeftNavigation />
        {/*<Navbar />*/}
        <Routes>
          {
            publicRoutes.map(({path, Component}) => {
            return <Route key={path} path={path} element={<Component />} />
            })
          }
          {
            authRoutes.map(({path, childRoutes, Component}) => {
              if(childRoutes) {
                return (
                  <Route key={path} path={path} >
                    {childRoutes.map(({path, role, Component}) => {
                      if(role.includes(authUser.user.status)) {

                        return  <Route key={path} path={path} element={<Component />}/>
                      }
                    })}
                  </Route>
                )
              } else {
                return <Route key={path} path={path} element={<Component />} />
              }
            })
          }
        </Routes>
      </>
      : <Routes>
          {
            publicRoutes.map(({path, Component}) => {
            return <Route key={path} path={path} element={<Component />} />
            })
          }
        </Routes>}
    </>
  );
};

export default App;