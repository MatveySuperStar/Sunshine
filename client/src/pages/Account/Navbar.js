import React from 'react'
import './Navbar.scss'
import logo from './logo2.png'

const Navbar = () => {
  return (
    <nav>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-1'>
            <img src={logo} />
          </div>
          <div className='col-sm-11'>
            <ul>
              <li>Успеваемость</li>
              <li>Меню
                <ul>

                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar