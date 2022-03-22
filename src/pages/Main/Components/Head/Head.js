import React from 'react';
import './Head.scss';
import backgroundImage from './bacground-head.jpg' 

const Head = () => {

  const linksData = [
    {
      label: 'Преимущества'
    },
    {
      label: 'Курсы'
    },
    {
      label: 'О нас'
    }
  ]

  return (
    <section className='head' style={{background: `url(${backgroundImage}) no-repeat`}}>
      <nav>
        <ul>
        {
          linksData.map( item => <li><a>{item.label}</a></li>)
        }
        <div className='button'>
          <li><a>Войти</a></li>
        </div>
        </ul>
      </nav>
      <div className='waves'></div>
    </section>
  );
};

export default Head;