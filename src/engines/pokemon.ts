import { getPokemons } from '../services/pokemon.service';
import { getRandomNumberBetween, shuffleArray } from '../utils';
import { GenericCardType } from '../types/cards';

type FetchedPokemonsType = {
  name: string;
  url: string;
};

async function handleFetchIndiviualPokemon(
  fetchedPokemonsArray: FetchedPokemonsType[],
) {
  let newPokemonsArray: GenericCardType[] = [];
  for (const fetchedPokemon of fetchedPokemonsArray) {
    const response = await fetch(fetchedPokemon.url);
    const { id, name, sprites } = await response.json();

    newPokemonsArray = [
      ...newPokemonsArray,
      { id, comparsionValue: id, name, imgUrl: sprites.front_default },
      {
        id: id * 2,
        comparsionValue: id,
        name,
        imgUrl: sprites.front_default,
      },
    ];
  }

  return newPokemonsArray;
}

export async function getPokemonsArray() {
  const offset = getRandomNumberBetween(0, 1000);

  const response = await getPokemons(5, offset);
  const fetchedPokemons: FetchedPokemonsType[] = response.results;

  const detailedPokemonArray = await handleFetchIndiviualPokemon(
    fetchedPokemons,
  );

  const shuffledArray: GenericCardType[] = shuffleArray(detailedPokemonArray);

  return shuffledArray;
}
