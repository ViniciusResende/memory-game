import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useResize } from '../../hooks';

import { Slider } from '../../components/Slider';
import DogsImage from '../../assets/images/dogs.png';
import DogsMobileImage from '../../assets/images/dogsMobile.png';
import HTTPCatImage from '../../assets/images/httpcat.png';
import HTTPCatMobileImage from '../../assets/images/httpcatMobile.png';
import MemoryexImage from '../../assets/images/memorydex.png';
import styles from './SelectGame.module.scss';

export const SelectGame = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  function onResize() {
    setIsMobile(window.innerWidth <= 750);
  }
  useResize(onResize);

  return (
    <main className={styles.content}>
      <h2 className={styles.title}>Memory Game</h2>
      <h4 className={styles.subtitle}>
        Selecione o seu estilo favorito para jogar
      </h4>
      <Slider className={styles.slider} delay={10000}>
        <div className={styles.card}>
          <header>
            <h3>Doggo Game</h3>
            <span>Um jogo da memória para os amantes de cachorrinhos</span>
          </header>
          <img
            src={isMobile ? DogsMobileImage : DogsImage}
            alt='Ilustração de cachorrinhos'
          />

          <Link to='play/1' className={styles.playGame}>
            jogar
          </Link>
        </div>

        <div className={styles.card}>
          <header>
            <h3>HTTP Game</h3>
            <span>
              Um jogo da memória para se divertir e aprender os códigos HTTP's
            </span>
          </header>
          <img
            src={isMobile ? HTTPCatMobileImage : HTTPCatImage}
            alt='102 status code cat'
          />

          <Link to='play/2' className={styles.playGame}>
            jogar
          </Link>
        </div>

        <div className={styles.card}>
          <header>
            <h3>Memorydex</h3>
            <span>Um jogo da memória para os amantes do universo Pokemon</span>
          </header>
          <img src={MemoryexImage} alt='Memorydex logo' />

          <Link to='play/3' className={styles.playGame}>
            jogar
          </Link>
        </div>
      </Slider>
    </main>
  );
};
