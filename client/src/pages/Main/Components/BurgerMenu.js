import React, { useState } from 'react';
import { linksData } from '../Constants';

const BurgerMenu = ({scroll, activeAuth}) => {
  
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);

  /*function menuOnClick() {
    document.querySelector(".menu-bar").classList.toggle("change");
    document.querySelector(".menu-bar ul").classList.toggle("change");
    document.querySelector(".menu-bg").classList.toggle("change-bg");
  }*/

  return (
    <div>
      <div className="menu">
        <div className={`menu-bar ${activeBurgerMenu ? 'change' : ''}`} onClick={() => setActiveBurgerMenu(!activeBurgerMenu)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={` ${activeBurgerMenu ? 'change' : ''}`}>
        {
          linksData.map( item => <li key={item.label}><a href={item.path} >{item.label}</a></li>)
        }
        <li onClick={activeAuth}><a >Войти</a></li>
        </ul>
      </div>
      <div className={`menu-bg ${activeBurgerMenu ? 'change-bg' : ''}`}></div>
    </div>
  );
};

export default BurgerMenu;