import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  const goToPreviousPath = () => {
    navigate(-1);
  };

  return (
    <main className={styles.container}>
      <h1>404</h1>
      <h2>Ops. Parece que a rota que você procura não existe.</h2>
      <button onClick={goToPreviousPath} className={styles.goBackButton}>
        Voltar à Navegação
      </button>
    </main>
  );
};
