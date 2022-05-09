import React from 'react'
import './Navbar.scss'
import logo from './logo2.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { defaultAuthUserAction } from '../../store/reducers/authUserReducer'
import { logout } from '../../../http/userAPI'
import { useCookies } from 'react-cookie';

const Navbar = () => {

  const history =  useNavigate()
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.authUser.authUser)
  const [cookies, setCookie, removeCookie] = useCookies();

  const logoutAccount = async () => {
    const responce = await logout()
    removeCookie('refreshToken')
    localStorage.removeItem('token')  
    dispatch(defaultAuthUserAction())
    history('/')
    console.log(authUser.user)
  }

  const accessNavbar = () => {
    if(authUser.user.status === "Админ") {
      return (<ul>
        <li><Link to="account/">Главная</Link></li>
        <li><Link to="account/users">Пользователи</Link></li>
        <li><Link to="account/tests">Тесты</Link></li>
        <li><Link to="account/groups">Группы</Link></li>
        <li><Link to="account/places">Местоположения</Link></li>
        <li><a href='https://drive.google.com/drive/folders/1YChCSgHLfSVRztQANkghsx7bgNc27xIg?usp=sharing' target="_blank">Учебный материал</a></li>
        <li><a onClick={logoutAccount}>Выйти</a></li>
      </ul>)
    } else if(authUser.user.status === "Преподаватель") {
      return (<ul>
        <li><Link to="account/">Главная</Link></li>
        <li><Link to="account/users">Пользователи</Link></li>
        <li><Link to="account/tests">Тесты</Link></li>
        <li><Link to="account/groups">Группы</Link></li>
        <li><a href='https://drive.google.com/drive/folders/1YChCSgHLfSVRztQANkghsx7bgNc27xIg?usp=sharing' target="_blank">Учебный материал</a></li>
        <li><a onClick={logoutAccount}>Выйти</a></li>
      </ul>)
    } 
    else if(authUser.user.status === "Ученик") {
      return (<ul>
        <li><Link to="account/">Главная</Link></li>
        <li><a href='https://drive.google.com/drive/folders/1YChCSgHLfSVRztQANkghsx7bgNc27xIg?usp=sharing' target="_blank">Учебный материал</a></li>
        <li><a to="/" onClick={logoutAccount}>Выйти</a></li>
      </ul>)
    }
  }

  return (
    <>
    <nav>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-1'>
            <img src={logo} />
          </div>
          <div className='col-sm-11'>
            {accessNavbar()}
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar