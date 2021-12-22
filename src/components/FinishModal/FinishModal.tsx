import { Link } from 'react-router-dom';
import cx from 'classnames';

import { CloseIcon } from '../../assets/svg';
import styles from './FinishModal.module.scss';

interface ModalProps {
  isOpen: boolean;
  handleOnClose: () => void;
}

export const FinishModal = ({ isOpen, handleOnClose }: ModalProps) => {
  return (
    <>
      <div
        className={cx(styles.overlay, { [styles.isOpen]: isOpen })}
        onClick={handleOnClose}
      />
      <div className={cx(styles.wrapper, { [styles.isOpen]: isOpen })}>
        <button className={styles.closeButton} onClick={handleOnClose}>
          <CloseIcon />
        </button>
        <header className={styles.header}>
          <h3>Parabéns!</h3>
        </header>
        <main className={styles.mainContent}>
          <strong>Você conseguiu achar todas as duplas!</strong>
          <button onClick={handleOnClose}>Jogar Novamente</button>
          <Link to='/' onClick={handleOnClose}>
            Voltar ao Iníco
          </Link>
        </main>
      </div>
    </>
  );
};
