export async function getDoggos(limit: string | number, page: string | number) {
  const response = await fetch(
    `https://api.thedogapi.com/v1/images/search?limit=${limit.toString()}&page=${page.toString()}`,
  );

  return response.json();
}
