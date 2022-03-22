import React from 'react';
import './Benefits.scss';
import lev from './lev.png';

const Benefits = () => {
  return (
    <section className='benefits'>
      <h2>Наши Преимущества</h2>
      <div className='wrapperbenefits'>
        <div className='table'>
          <button><div className='circle'></div></button>
          <div>обучение по коммуникативной методике</div>
          <div>грамотный и внимательный подход к каждому студенту</div>
          <div>подготовка к международным экзаменам</div>
          <div>подготовка к ЦТ</div>
          <button><div className='circle'></div></button>
        </div>
        <img src='./lev.png' />
      </div>
    </section>
  );
};

export default Benefits;