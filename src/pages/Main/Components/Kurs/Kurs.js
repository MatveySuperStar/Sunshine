import React from 'react';
import './Kurs.scss'

const Kurs = () => {

  const kurs = [
    {text: 'английский для детей и подростков 1-11 класс'},
    {text: 'английский для детей и подростков 1-11 класс'},
    {text: 'английский для детей и подростков 1-11 класс'},
    {text: 'английский для детей и подростков 1-11 класс'},
    {text: 'английский для детей и подростков 1-11 класс'},
    {text: 'английский для детей и подростков 1-11 класс'},
    {text: 'английский для детей и подростков 1-11 класс'}
  ]

  return (
    <section className='kurs'>
      <h2>Наши услуги</h2>
      <div className='kurs__all'>
        <div className='kurs__boxes'>
          {kurs.map( item => <div className='kurs__box'>{item.text}</div>)}
        </div>
      </div>
    </section>
  );
};

export default Kurs;