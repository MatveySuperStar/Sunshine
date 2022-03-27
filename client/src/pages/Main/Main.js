import React, { useRef } from 'react';
import Benefits from './Components/Benefits/Benefits';
import Footer from './Components/Footer/Footer';
import Head from './Components/Head/Head';
import About from './Components/About/About';
import Kurs from './Components/Kurs/Kurs';
import './Main.scss'

const Main = () => {
  const refBenefits = useRef();
  const refKurs = useRef();
  const refAbout = useRef();

  return (
    <div>
      <Head refBenefits={refBenefits} refKurs={refKurs} refAbout={refAbout}/>
      <Benefits refBenefits={refBenefits} />
      <Kurs refKurs={refKurs} />
      <About refAbout={refAbout} />
      <Footer />
    </div>
  );
};

export default Main;