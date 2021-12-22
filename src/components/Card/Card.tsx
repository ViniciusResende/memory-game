import cx from 'classnames';

import { BoneIcon, ErrorIcon, PokeballIcon } from '../../assets/svg';
import { useGame } from '../../hooks';
import { GenericCardType } from '../../types/cards';
import styles from './Card.module.scss';

type CardProps = {
  cardData: GenericCardType;
  handleFlipCard: (card: GenericCardType) => void;
  isFlipped: boolean;
  isMemorized: boolean;
};

export const Card = ({
  cardData,
  handleFlipCard,
  isFlipped,
  isMemorized,
}: CardProps) => {
  const currentGame = useGame();

  function handleRetrieveBackCardImage() {
    switch (currentGame) {
      case 'DOGGO_GAME':
        return <BoneIcon className={styles.front} />;
      case 'HTTP_GAME':
        return <ErrorIcon className={styles.front} />;
      case 'MEMORY_DEX':
        return <PokeballIcon className={styles.front} />;
    }
  }

  return (
    <div
      className={cx(styles.flipper, {
        [styles.flipped]: isFlipped || isMemorized,
        [styles[currentGame || '']]: currentGame,
      })}>
      <div
        className={cx(styles.container, { [styles.memorized]: isMemorized })}
        onClick={() => handleFlipCard(cardData)}>
        <div className={styles.content}>
          <img className={styles.back} src={cardData.imgUrl} alt='' />
          <span className={styles.text}>{cardData.name}</span>
          {handleRetrieveBackCardImage()}
        </div>
      </div>
    </div>
  );
};
