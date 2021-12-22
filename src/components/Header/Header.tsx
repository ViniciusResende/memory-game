import { Link } from 'react-router-dom';

import { useGame } from '../../hooks';
import { SignOutIcon } from '../../assets/svg';
import styles from './Header.module.scss';
import logoDoggoGame from '../../assets/images/logoDoggoGame.png';
import logoHttpGame from '../../assets/images/logoHttpGame.png';
import logoMemoryDex from '../../assets/images/logo.png';

export const Header = () => {
  const currentGame = useGame();

  function handleRetrieveImage() {
    switch (currentGame) {
      case 'DOGGO_GAME':
        return logoDoggoGame;
      case 'HTTP_GAME':
        return logoHttpGame;
      case 'MEMORY_DEX':
        return logoMemoryDex;
    }
  }

  return (
    <header className={styles.container}>
      <img src={handleRetrieveImage()} alt='Logo' />
      <Link to='/' className={styles.exitIcon}>
        <SignOutIcon />
        Sair
      </Link>
    </header>
  );
};
