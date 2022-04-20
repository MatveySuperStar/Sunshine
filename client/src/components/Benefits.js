import React from 'react';
import '../scss/Benefits.scss';
import lev from '../image/lev.png';
import backgroundImage from '../image/Walves2.png' 

const Benefits = ({refBenefits}) => {

  return (
    <section ref={refBenefits} className='benefits' id='benefits'>
      <div className='container'>
        <h2>Наши Преимущества</h2>
        <div className='row'>
          <div className='benefits_table col-xl-7 col-lg-7 col-md-12 col-xs-12'>
            <button><div className='circle'></div></button>
            <div>Обучение по коммуникативной методике</div>
            <div>Грамотный и внимательный подход к каждому студенту</div>
            <div>Подготовка к международным экзаменам</div>
            <div>Подготовка к ЦТ</div>
            <button><div className='circle'></div></button>
          </div>
          <div className='col-xl-5 col-lg-5 col-md-12 col-xs-12'>
            <img src='./lev.png' />
          </div>
        </div>
      </div>
      <div className='walve' style={{background: `url(${backgroundImage}) no-repeat`}}></div>
    </section>
  );
};

export default Benefits;