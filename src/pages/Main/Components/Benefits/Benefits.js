import React from 'react';
import './Benefits.scss';
import lev from './lev.png';
import backgroundImage from './Walves2.png' 

const Benefits = ({refBenefits}) => {

  return (
    <section ref={refBenefits} className='benefits' id='benefits'>
      <div className='container'>
        <h2>Наши Преимущества</h2>
        <div className='row'>
          <div className='benefits_table col-xl-7 col-lg-7 col-md-12 col-xs-12'>
            <button><div className='circle'></div></button>
            <div>обучение по коммуникативной методике</div>
            <div>грамотный и внимательный подход к каждому студенту</div>
            <div>подготовка к международным экзаменам</div>
            <div>подготовка к ЦТ</div>
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