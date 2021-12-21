import { getPokemons } from '../services/pokemon.service';
import { getRandomNumberBetween, shuffleArray } from '../utils';
import { PokemonsArrayType } from '../types/pokemon';

type FetchedPokemonsType = {
  name: string;
  url: string;
};

async function handleFetchIndiviualPokemon(
  fetchedPokemonsArray: FetchedPokemonsType[],
) {
  let newPokemonsArray: PokemonsArrayType[] = [];
  for (let index = 0; index < fetchedPokemonsArray.length; index++) {
    const response = await fetch(fetchedPokemonsArray[index].url);
    const { id, name, sprites } = await response.json();

    newPokemonsArray = [
      ...newPokemonsArray,
      { id, name, imgUrl: sprites.front_default },
      {
        id: id * 2,
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

  const shuffledArray: PokemonsArrayType[] = shuffleArray(detailedPokemonArray);

  return shuffledArray;
}
