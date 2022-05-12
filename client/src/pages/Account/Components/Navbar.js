import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-5 col-sm-4 col-md-4 col-lg-3 col-xl-2'>
            <Link to="account/">
              <img src='../logo_white.png' />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar