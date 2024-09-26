import { Card } from "./type";

export const cards: Card[] = [
  { id: 1, imageUrl: '/assets/cards/1.png', name: '伊布' },
  { id: 2, imageUrl: '/assets/cards/2.png', name: '火伊布' },
  { id: 3, imageUrl: '/assets/cards/3.png', name: '水伊布' },
  { id: 4, imageUrl: '/assets/cards/4.png', name: '电伊布' },
  { id: 5, imageUrl: '/assets/cards/5.png', name: '太阳伊布' },
  { id: 6, imageUrl: '/assets/cards/6.png', name: '月伊布' },
  { id: 7, imageUrl: '/assets/cards/7.png', name: '冰伊布' },
  { id: 8, imageUrl: '/assets/cards/8.png', name: '草伊布' },
  { id: 9, imageUrl: '/assets/cards/9.png', name: '仙子伊布' },
];

export type Player = 'player' | 'robot';
export type Mode = 'single' | 'double';

export const PlayerName = {
    'player': '玩家',
    'robot': '机器人'
}

export const ModeName = {
    'single': '单人对对碰',
    'double': '人机对战'
}