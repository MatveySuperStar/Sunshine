import React from 'react'
import './About.scss'
import foto from './Foto1.jpg'
import foto2 from './Foto2.jpg'

const About = () => {
  return (
    <section className='about_us'>
      <div className='about_us_wrapper'>
        <h2>О нас</h2>
        <div>
          <div className='about_us__text'>
            обучение по коммуникативной методике, грамотный и внимательный подход к каждому студенту, 
            подготовка к международным экзаменам, подготовка к ЦТ, работа с аутентичными учебниками и материалами, 
            комплексное развитие навыков в процессе обучения, 
            грамотные и внимательные преподаватели, наличие у представителей кэмбриджиских сертификатов.
          </div>
          <div className='about_us__foto'>
            <img src={foto}></img>
            <img src={foto2}></img>
          </div>
          <div className='about_us_form'>
            <img></img>
            <form>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;