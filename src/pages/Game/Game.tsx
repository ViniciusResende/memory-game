import { useEffect, useState } from 'react';
import cx from 'classnames';

import { getDoggosArray } from '../../engines/doggo';
import { getHttpArray } from '../../engines/httpcats';
import { getPokemonsArray } from '../../engines/pokemon';
import { GenericCardType } from '../../types/cards';
import { useGame } from '../../hooks';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Footer } from '../../components/Footer';
import { FinishModal } from '../../components/FinishModal';

import styles from './Game.module.scss';

export const Game = () => {
  const [cards, setCards] = useState<GenericCardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<GenericCardType[]>([]);
  const [memorizedCards, setMemorizedCards] = useState<GenericCardType[]>([]);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const currentGame = useGame();

  async function setUpDoggos() {
    setCards(await getDoggosArray());
  }

  function setUpHTTPs() {
    setCards(getHttpArray());
  }

  async function setUpPokemons() {
    setCards(await getPokemonsArray());
  }

  useEffect(() => {
    async function setUpGame() {
      switch (currentGame) {
        case 'DOGGO_GAME':
          await setUpDoggos();
          break;
        case 'HTTP_GAME':
          setUpHTTPs();
          break;
        case 'MEMORY_DEX':
          await setUpPokemons();
          break;
      }
    }

    setUpGame();
  }, [isFinishModalOpen]);

  function checkIfTheGameIsFinished() {
    if (cards.length === 0) return;

    if (memorizedCards.length === cards.length) {
      setFlippedCards([]);
      setMemorizedCards([]);
      setIsFinishModalOpen(true);
    }
  }

  useEffect(() => {
    checkIfTheGameIsFinished();
  }, [memorizedCards]);

  function memorizeCards(card: GenericCardType) {
    if (
      flippedCards.length <= 1 &&
      flippedCards[0]?.comparsionValue === card.comparsionValue
    ) {
      setMemorizedCards([...memorizedCards, flippedCards[0], card]);
    }
  }

  function handleFlipCard(card: GenericCardType) {
    memorizeCards(card);

    if (flippedCards.length >= 2) {
      setFlippedCards([card]);
      return;
    }

    setFlippedCards([...flippedCards, card]);
  }

  function verifyIfIsFlipped(cardId: number | string) {
    return !!flippedCards.find((card) => card.id === cardId);
  }

  function verifyIfIsMemorized(cardId: number | string) {
    return !!memorizedCards.find((card) => card.id === cardId);
  }

  return (
    <div
      className={cx(styles.container, {
        [styles[currentGame || '']]: currentGame,
      })}>
      <Header />
      <FinishModal
        isOpen={isFinishModalOpen}
        handleOnClose={() => setIsFinishModalOpen(false)}
      />
      <main className={styles.cardsContainer}>
        {cards.map((card) => (
          <Card
            key={card.id}
            handleFlipCard={handleFlipCard}
            cardData={card}
            isFlipped={verifyIfIsFlipped(card.id)}
            isMemorized={verifyIfIsMemorized(card.id)}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};
