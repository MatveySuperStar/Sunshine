import React, { useState } from 'react';

const BurgerMenu = () => {
  
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);

  const linksData = [
    {
      label: 'Преимущества',
      path: '#benefits'
    },
    {
      label: 'Курсы',
      path: '#kurs'
    },
    {
      label: 'О нас',
      path: '#about_us'
    }
  ]

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
          linksData.map( item => <li><a href={item.path} >{item.label}</a></li>)
        }
        </ul>
      </div>
      <div className={`menu-bg ${activeBurgerMenu ? 'change-bg' : ''}`}></div>
    </div>
  );
};

export default BurgerMenu;