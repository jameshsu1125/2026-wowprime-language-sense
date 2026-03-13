import { createContext, Dispatch, SetStateAction } from 'react';

export enum GameEndStepType {
  landing,
}
export type TGameEndState = { step: GameEndStepType };
export type TGameEndContext = [TGameEndState, Dispatch<SetStateAction<TGameEndState>>];

export const GameEndState = { step: GameEndStepType.landing };
export const GameEndContext = createContext<TGameEndContext>([GameEndState, () => {}]);
