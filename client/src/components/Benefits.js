import React from 'react';
import { motion } from 'framer-motion';
import '../scss/Benefits.scss';
import lev from '../image/lev.png';
import backgroundImage from '../image/Walves2.png' 

const leftAnimation = {
  hidden: {
    x: -1,
    opacity: 0,
  },
  visible: custom => ({
    x: 0,
    opacity: 1,
    transition: {delay: custom * 0.2}
  })
}

const rightAnimation = {
  hidden: {
    x: 1,
    opacity: 0,
  },
  visible: custom => ({
    x: 0,
    opacity: 1,
    transition: {delay: custom * 0.2}
  })
}

const Benefits = ({refBenefits}) => {

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}

      ref={refBenefits} className='benefits' id='benefits'>
      <div className='container'>
        <h2>Наши Преимущества</h2>
        <div className='row'>
          <div className='benefits_table col-xl-7 col-lg-7 col-md-12 col-xs-12'>
            <button><div className='circle'></div></button>
            <motion.div custom={1} variants={leftAnimation}>Обучение по коммуникативной методике</motion.div>
            <motion.div custom={2} variants={leftAnimation}>Грамотный и внимательный подход к каждому студенту</motion.div>
            <motion.div custom={3} variants={leftAnimation}>Подготовка к международным экзаменам</motion.div>
            <motion.div custom={4} variants={leftAnimation}>Подготовка к ЦТ</motion.div>
            <button><div className='circle'></div></button>
          </div>
          <motion.div custom={3} variants={rightAnimation} className='col-xl-5 col-lg-5 col-md-12 col-xs-12'>
            <img src='./lev.png' />
          </motion.div>
        </div>
      </div>
      <div className='walve' style={{background: `url(${backgroundImage}) no-repeat`}}></div>
    </motion.section>
  );
};

export default Benefits;