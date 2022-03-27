import React from 'react'
import './About.scss'
import foto from './Foto1.jpg'
import foto2 from './Foto2.jpg'

const About = ({refAbout}) => {
  return (
    <section ref={refAbout} id='about_us' className='about_us'>
      <div className='container'>
        <h2>О нас</h2>

        <div className='about_us__text'>
          <p>
            Обучение по коммуникативной методике, грамотный и внимательный подход к каждому студенту, 
            подготовка к международным экзаменам, подготовка к ЦТ, работа с аутентичными учебниками и материалами, 
            комплексное развитие навыков в процессе обучения, 
            грамотные и внимательные преподаватели, наличие у представителей кэмбриджиских сертификатов.
          </p>
        </div>
        <div className='row about_us__foto'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <img src={foto} />
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <img src={foto2}></img>
          </div>
        </div>
        <div className='row about_us_form'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <img />
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <form className='row'>
              <h3> Форма связи с нами </h3>
              <div className='col-md-6'>
                <p>Имя</p>
                <input />
              </div>
              <div className='col-md-6'>
                <p>Предпочитаемый курс</p>
                <input />
              </div>
              <div className='col-md-6'>
                <p>Email</p>
                <input />
              </div>
              <div className='col-md-6'>
                <p>Номер телефон</p>
                <input />
              </div>
              <div className='col-md-12'>
                <p>Ваше сообщение</p>
                <textarea />
              </div>
              <div className='col-md-12'>
                <p>Заполняя форму, Вы даете свое согласие на обработку персональных данных.</p>
                <input type='submit' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;