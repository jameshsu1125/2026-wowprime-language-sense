import { createContext, Dispatch, SetStateAction } from 'react';

export enum GameEndStepType {
  unset,
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
  rank: number;
};

export type TGameEndState = {
  step: GameEndStepType;
  result: GameEndGameResult;
  final: GameEndFinalType;
};
export type TGameEndContext = [TGameEndState, Dispatch<SetStateAction<TGameEndState>>];

export const GameEndState = {
  step: GameEndStepType.unset,
  result: { bestScore: 0, currentScore: 0, coupon: '', rank: 0 },
  final: GameEndFinalType.card,
};

export const GameEndContext = createContext<TGameEndContext>([GameEndState, () => {}]);

export const GameEndStayDuration = 2000;
