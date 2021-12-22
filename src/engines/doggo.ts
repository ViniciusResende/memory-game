import { getDoggos } from '../services/doggo.service';
import { getRandomNumberBetween, shuffleArray } from '../utils';
import { GenericCardType } from '../types/cards';

type BreesType = {
  name: string;
};

type FetcheDoggosType = {
  breeds: BreesType[];
  url: string;
  height: number;
  id: string;
};

function handleOrganizeDoggosArray(fetchedDoggosArray: FetcheDoggosType[]) {
  let newDoggosArray: GenericCardType[] = [];
  for (const fetchedoggo of fetchedDoggosArray) {
    newDoggosArray = [
      ...newDoggosArray,
      {
        id: fetchedoggo.id,
        comparsionValue: fetchedoggo.id,
        name: fetchedoggo.breeds[0]?.name || 'Nome Indisponível',
        imgUrl: fetchedoggo.url,
      },
      {
        id: fetchedoggo.id + 'diff',
        comparsionValue: fetchedoggo.id,
        name: fetchedoggo.breeds[0]?.name || 'Nome Indisponível',
        imgUrl: fetchedoggo.url,
      },
    ];
  }

  return newDoggosArray;
}

export async function getDoggosArray() {
  const page = getRandomNumberBetween(0, 1000);

  const response = await getDoggos(6, page);
  const fetchedDoggos: FetcheDoggosType[] = response;

  const detailedDoggosArray = handleOrganizeDoggosArray(fetchedDoggos);

  const shuffledArray: GenericCardType[] = shuffleArray(detailedDoggosArray);

  return shuffledArray;
}
