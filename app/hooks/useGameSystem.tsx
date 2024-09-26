import { cards } from './const';

// ... 保持现有的Card接口和cards数组不变 ...

export function useGameSystem() {

  const drawCard = () => {


    const randomCardIndex = Math.floor(Math.random() * cards.length);

    const newCard = cards[randomCardIndex];

    return newCard;
  }

  return { drawCard };
}