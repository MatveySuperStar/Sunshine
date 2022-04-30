import React from 'react'
import './Navbar.scss'
import logo from './logo2.png'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <>
    {cookies?.isAuth?.value ?  
    <nav>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-1'>
            <img src={logo} />
          </div>
          <div className='col-sm-11'>
            <ul>
            {cookies.user.status === 'Преподаватель' || 'Админ' ?
              <>
              <li><Link to="account/users">Пользователи</Link></li>
              <li><Link to="account/tests">Тесты</Link></li>
              <li><Link to="account/groups">Группы</Link></li>
              <li><Link to="account/places">Местоположения</Link></li>
              <li><Link to="account/material">Учебный материал</Link></li>
              <li><Link to="/" onClick={()=>{setCookie('isAuth', false)}}>Выйти</Link></li>
              </>
              : 
              <>
              <li><Link to="account/material">Учебный материал</Link></li>
              <li><Link to="/">Выйти</Link></li>
              </>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
     : '' }
    </>
  )
}

export default Navbar