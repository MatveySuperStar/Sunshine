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
          <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 footer_about'> 
            <h3>О нас</h3>
            <p>
              обучение по коммуникативной методике, грамотный и внимательный подход к каждому студенту, 
              подготовка к международным экзаменам, подготовка к ЦТ, работа с аутентичными учебниками и материалами, 
              комплексное развитие навыков в процессе обучения, 
              грамотные и внимательные преподаватели, наличие у представителей кэмбриджиских сертификатов
            </p>
          </div>
          <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 footer_kurs'>
            <h3>Наши услуги</h3>
            <ul>
              {kurs.map( item => <li key={item.text}><a> {item.text} </a></li>) }
            </ul>
          </div>
          <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 footer_nav'>
            <h3>Навигация</h3>
            <ul>
              {linksData.map( link => <li key={link.label}><a>{link.label}</a></li>)}
            </ul>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 footer_feedback'> 
            <h3>Контакты</h3>
            <p>Телефон: +375 (33) 336-23-23</p>
            <p>Email: </p>
            <p>Адрес: Ленинская улица, 34, Кричев</p>
            @Copyright 2022 Sunshine with <a href='https://github.com/MatveySuperStar'>MatveySuperStar</a>
            <h3>Социальные сети</h3>
            <div className='icons'>
              {icons.map( icon => <a key={icon.label} href={icon.path}><img src={icon.label} /></a>) }
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;