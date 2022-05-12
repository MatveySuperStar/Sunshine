import React, { useRef } from 'react';
import Benefits from './components/Benefits';
import Footer from './components/Footer';
import Head from './components/Head';
import About from './Components/About';
import Kurs from './components/Kurs';
import './Main.scss';

const Main = () => {
  const refBenefits = useRef();
  const refKurs = useRef();
  const refAbout = useRef();

  return (
    <>
      <Head refBenefits={refBenefits} refKurs={refKurs} refAbout={refAbout}/>
      <Benefits refBenefits={refBenefits} />
      <Kurs refKurs={refKurs} />
      <About refAbout={refAbout} />
      <Footer />
    </>
  );
};

export default Main;