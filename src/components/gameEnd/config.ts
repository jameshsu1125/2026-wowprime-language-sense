import { createContext, Dispatch, SetStateAction } from 'react';

export enum GameEndStepType {
  landing,
  result,
}

export enum GameEndFinalType {
  card,
  award,
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
  step: GameEndStepType.landing,
  result: { bestScore: 0, currentScore: 0, coupon: '' },
  final: GameEndFinalType.card,
};

export const GameEndContext = createContext<TGameEndContext>([GameEndState, () => {}]);

export const GameEndStayDuration = 2000;
