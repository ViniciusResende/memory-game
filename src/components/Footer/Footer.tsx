import styles from './Footer.module.scss';
import logoAmericanasSA from '../../assets/images/logoamericanassa.png';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <img src={logoAmericanasSA} alt='Logo Americanas SA' />
      <span>Feito com ❤ por Meu Nome</span>
    </footer>
  );
};
