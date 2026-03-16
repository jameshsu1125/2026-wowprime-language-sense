import { createContext, Dispatch, SetStateAction } from 'react';

export enum GameEndStepType {
  landing,
  result,
}

export enum GameEndFinalType {
  card,
  award,
  ranking,
}

export type GameEndGameResult = {
  bestScore: number;
  currentScore: number;
  coupon: string;
};

export type TGameEndState = {
  step: GameEndStepType;
  result: GameEndGameResult;
  final: GameEndFinalType;
};
export type TGameEndContext = [TGameEndState, Dispatch<SetStateAction<TGameEndState>>];

export const GameEndState = {
  step: GameEndStepType.result,
  result: { bestScore: 13000, currentScore: 3000, coupon: 'WOW-EAT-0002' },
  final: GameEndFinalType.card,
};

export const GameEndContext = createContext<TGameEndContext>([GameEndState, () => {}]);
