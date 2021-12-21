export async function getPokemons(
  limit: string | number,
  offset: string | number,
) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit.toString()}&offset=${offset.toString()}`,
  );

  return response.json();
}
