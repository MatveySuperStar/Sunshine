import React, { useRef } from 'react';
import Benefits from '../components/Benefits';
import Footer from '../components/Footer';
import Head from '../components/Head';
import About from '../components/About';
import Kurs from '../components/Kurs';
import '../scss/Main.scss';

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