import React from 'react';
import Benefits from './Components/Benefits/Benefits';
import Footer from './Components/Footer/Footer';
import Head from './Components/Head/Head';
import About from './Components/About/About';
import Kurs from './Components/Kurs/Kurs';
import './Main.scss'

const Main = () => {
  return (
    <div>
      <Head />
      <Benefits />
      <Kurs />
      <About />
      <Footer />
    </div>
  );
};

export default Main;