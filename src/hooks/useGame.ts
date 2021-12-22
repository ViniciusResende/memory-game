import { useParams } from 'react-router-dom';

function useGame() {
  const { gameId } = useParams();

  switch (Number(gameId)) {
    case 1:
      return 'DOGGO_GAME';
    case 2:
      return 'HTTP_GAME';
    case 3:
      return 'MEMORY_DEX';
  }
}

export default useGame;
