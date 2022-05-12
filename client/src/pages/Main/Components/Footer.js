import React from 'react';
import './Footer.scss';
import { icons } from '../Constants';

const Footer = () => {

  return (
    <footer>
      <div className='container d-flex justify-content-center'>
        <div className='row'>
          <div className='col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 footer_about'> 
            <a><img src='./logo_white.png' /></a>
          </div>
          <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-5 footer_kurs'>
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
                {icons.map( icon => <a key={icon.label} href={icon.path} target="_blank"><img src={icon.label} /></a>) }
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 footer_author'>
              <p>@Copyright 2022 Sunshine with <a href='https://github.com/MatveySuperStar' target="_blank">MatveySuperStar</a></p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;