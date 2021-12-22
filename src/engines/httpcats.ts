import { getRandomNumberBetween, shuffleArray } from '../utils';

import { possibleHTTPArray } from '../constants/httpcats';
import { GenericCardType } from '../types/cards';

export function getHttpArray() {
  let HTTPArray: GenericCardType[] = [];
  let chosenIndexes: number[] = [];
  for (let index = 0; index < 6; index++) {
    let randomIndex = Math.round(
      getRandomNumberBetween(0, possibleHTTPArray.length - 1),
    );
    while (chosenIndexes.find((item) => item === randomIndex)) {
      randomIndex = Math.round(
        getRandomNumberBetween(0, possibleHTTPArray.length),
      );
    }

    chosenIndexes = [...chosenIndexes, randomIndex];

    HTTPArray = [
      ...HTTPArray,
      {
        id: Number(possibleHTTPArray[randomIndex].status),
        comparsionValue: Number(possibleHTTPArray[randomIndex].status),
        name: possibleHTTPArray[randomIndex].message,
        imgUrl: `https://http.cat/${possibleHTTPArray[randomIndex].status}.jpg`,
      },
      {
        id: Number(possibleHTTPArray[randomIndex].status) * 4 + 1,
        comparsionValue: Number(possibleHTTPArray[randomIndex].status),
        name: possibleHTTPArray[randomIndex].message,
        imgUrl: `https://http.cat/${possibleHTTPArray[randomIndex].status}.jpg`,
      },
    ];
  }

  const shuffledArray: GenericCardType[] = shuffleArray(HTTPArray);

  return shuffledArray;
}
