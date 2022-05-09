import React from 'react';
import '../scss/Footer.scss';
import instagram from '../image/icons/instagram.png';
import vk from '../image/icons/vk.png';
import telegram from '../image/icons/telegram.png';
import tiktok from '../image/icons/tiktok.png';


const Footer = () => {
  const kurs = [
    {text: 'Английский для детей и подростков 1-11 класс'},
    {text: 'Английский для взрослых'},
    {text: 'Подготовка к ЦТ'},
    {text: 'Дошкольники: 3-4 года'},
    {text: 'Подготовка к школе'},
    {text: 'Немецкий и испанский'},
    {text: 'Услуги распечатки и ксерокопии'},
    {text: 'Продажа учебной литературы'}
  ]

  const icons = [
    { 
      label: instagram,
      path: 'www.instagram.com/sunshine_krichev'
    },
    { 
      label: tiktok,
      path: '#'
     },
    { 
      label: vk,
      path: 'https://vk.com/sunshine.krichev'
     },
    { 
      label: telegram,
      path: '#'
     },
  ]

  const linksData = [
    {
      label: 'Преимущества'
    },
    {
      label: 'Курсы'
    },
    {
      label: 'О нас'
    },
    {
      label: 'Войти'
    }
  ]

  return (
    <footer>
      <div className='container d-flex justify-content-center'>
        <div className='row'>
          <div className='col-4 col-sm-4 col-md-6 col-lg-1 col-xl-1 footer_about'> 
            <a><img src='./logo2.png' /></a>
          </div>
          <div className='col-8 col-sm-8 col-md-6 col-lg-6 col-xl-7 footer_kurs'>
            <div>
              <p>+375 (33) 336-23-23</p>
              <p>sunshine@gmail.com</p>
              <p>Ленинская улица, 34, Кричев</p>
            </div>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 wrapper_footer_feedback'>
            <div className="row footer_feedback">
              <div> 
                <p>Присоединийся к нам в социальных сетях</p>
              </div>
              <div className='icons'>
                {icons.map( icon => <a key={icon.label} href={icon.path}><img src={icon.label} /></a>) }
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 footer_author'>
              @Copyright 2022 Sunshine with <a href='https://github.com/MatveySuperStar'>MatveySuperStar</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;