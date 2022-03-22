import React from 'react';
import './Footer.scss';

const Footer = () => {
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
    <footer>
      <div className='container d-flex justify-content-center'>
        <div className='row'>
          <div className='col-md-5'> 
            <h3>О нас</h3>
            обучение по коммуникативной методике, грамотный и внимательный подход к каждому студенту, 
            подготовка к международным экзаменам, подготовка к ЦТ, работа с аутентичными учебниками и материалами, 
            комплексное развитие навыков в процессе обучения, 
            грамотные и внимательные преподаватели, наличие у представителей кэмбриджиских сертификатов
          </div>
          <div className='col-md-2 justify-content-center '>
            <h3 >Навигация</h3>
            <ul>
              {linksData.map( item => <li>{item.label}</li>)}
            </ul>

          </div>
          <div className='d-flex p-2 justify-content-center col-md-5'> asdsad</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;