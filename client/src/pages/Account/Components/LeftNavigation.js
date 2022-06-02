import React, {useMemo, useState, useEffect, useCallback} from 'react'
import './leftNavigation.scss'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { defaultAuthUserAction } from '../../../store/reducers/authUserReducer'
import { logout } from '../../../../http/userAPI'
import { useCookies } from 'react-cookie';

const LeftNavigation = () => {
  const history =  useNavigate()
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.authUser.authUser)
  const [cookies, setCookie, removeCookie] = useCookies();

  const [activeMenu, setActiveMenu] = useState(false);
  const [linksData, setLinksData] = useState([
    { path: "account/", active: false, title: "Главная", role: ['Админ', 'Преподаватель', 'Ученик'] },
    { path: "account/users", active: false, title: "Пользователи", role: ['Админ', 'Преподаватель'] },
    { path: "account/tests", active: false, title: "Тесты", role: ['Админ', 'Преподаватель'] },
    { path: "account/groups", active: false, title: "Группы", role: ['Админ', 'Преподаватель'] },
    { path: "account/places", active: false, title: "Местоположения", role: ['Админ'] },
    { path: "account/kurs", active: false, title: "Курсы", role: ['Админ', 'Преподаватель'] },
    { path: "account/rating", active: false, title: "Рейтинги", role: ['Админ', 'Преподаватель'] },
    { path: "account/rating", active: false, title: "Мой Рейтинг", role: ['Ученик'] },
    { href: "https://drive.google.com/drive/folders/1YChCSgHLfSVRztQANkghsx7bgNc27xIg?usp=sharing", title: "Учебный материал", role: ['Админ', 'Преподаватель', 'Ученик'] },
    { path: "#", active: false, title: "Выйти", clickHandler: logoutAccount,  role: ['Админ', 'Преподаватель', 'Ученик'] },
  ]);

  const [scroll, setScroll] = useState(0);

  const handleScroll = useCallback(() => {
    setScroll(window.scrollY)   
  }, [window.scrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [])

  const activeLink = useCallback(async(link) => {
    setLinksData(linksData.map( state => {
      return state.title === link.title ? {...state, active: true} : {...state, active: false}
    }))
    if(link.title === 'Выйти') {
      await logoutAccount()
    }
  }, [linksData]);

  const logoutAccount = useCallback(async () => {
    await logout()
    removeCookie('refreshToken')
    localStorage.removeItem('token')  
    dispatch(defaultAuthUserAction())
    history('/')
  }, [localStorage, logout, removeCookie, dispatch]);

  const accessNavbar = useMemo(() => {
    return (
      <ul>
        {
          linksData.map( link => {
            if(link.role.includes(authUser.user.status)) {
              if(link.path) {
                return ( 
                  <li key={link.title} className={link.active ? 'active' : ''} onClick={async() => {
                    setActiveMenu(false)
                    await activeLink(link)
                    }}>
                    <Link to={link.path}>{link.title}</Link>
                  </li>
                )
              } else {
                return <li key={link.title}><a href={link.href} target="_blank">{link.title}</a></li>
              }
            }
          })
        }
      </ul>
    )
  },[linksData, authUser]);

  return (
    <div className={`wrapper ${ scroll > 120 ? 'p_fixed' : 'p_abs'} ${activeMenu ? 'is-nav-open' : ''}`}>
      <div className="nav">
          <button
              className="nav__icon"
              type="menu-fold"
              onClick={() => setActiveMenu(!activeMenu)}/>
          <div className="nav__body">
            {accessNavbar}
          </div>
      </div>
    </div>
  )
}

export default LeftNavigation