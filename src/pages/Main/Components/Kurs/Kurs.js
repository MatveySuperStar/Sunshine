import React from 'react';
import './Kurs.scss'
import backgroundImage from './Walves3.png'

const Kurs = ({refKurs}) => {

  const kurs = [
    {
      text: 'Английский для детей и подростков 1-11 класс',
      description: '60 минут',
      price: '75р'
    },
    {
      text: 'Английский для взрослых',
      description: '60 минут',
      price: '75р'
    },
    {
      text: 'Подготовка к ЦТ',
      description: '60 минут',
      price: '75р'
    },
    {
      text: 'Дошкольники: 3-4 года',
      description: '60 минут',
      price: '75р'
    },
    {
      text: 'Подготовка к школе',
      description: '60 минут',
      price: '75р'
    },
    {
      text: 'Немецкий и испанский',
      description: '60 минут',
      price: '75р'
    },
    {
      text: 'Услуги распечатки и ксерокопии',
      description: '60 минут',
      price: '75р'}
  ]

  return (
    <section ref={refKurs} className='kurs' id='kurs'>
      <div className='container'>
        <h2>Наши услуги</h2>
        <div className='row kurs_boxes'>
            {kurs.map( item => <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'><div><p>{item.text}</p><p>{item.description} - {item.price}</p></div></div>)}
        </div>
      </div>
      <div className='walve' style={{background: `url(${backgroundImage}) no-repeat`}}></div>
    </section>
  );
};

export default Kurs;