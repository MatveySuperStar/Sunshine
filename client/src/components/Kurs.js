import React, { useEffect } from 'react';
import '../scss/Kurs.scss'
import backgroundImage from '../image/Walves3.png'
import { useDispatch } from 'react-redux';
import { updateEmailDatalistKursAction } from '../store/reducers/emailReducer';
import { motion } from 'framer-motion';

const Kurs = ({refKurs}) => {

  const dispatch = useDispatch()

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

  useEffect(()=>{
    const textKurs = kurs.map(item => item.text)
    dispatch(updateEmailDatalistKursAction(textKurs))
  }, [])
  

  const topAnimation = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: custom => ({
      y: 0,
      opacity: 1,
      transition: {delay: custom * 0.2}
    })
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      ref={refKurs} 
      className='kurs' 
      id='kurs'>
      <div className='container'>
        <h2>Наши услуги</h2>
        <div className='row kurs_boxes'>
            {kurs.map( (item, index) => {
             return (
              <motion.div custom={index} variants={topAnimation} key={item.text} className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
               <div><p>{item.text}</p><p>{item.description} - {item.price}</p></div>
              </motion.div>)})}
        </div>
      </div>
      <div className='walve' style={{background: `url(${backgroundImage}) no-repeat`}}></div>
    </motion.section >
  );
};

export default Kurs;