import { createContext, Dispatch, SetStateAction } from 'react';

export enum GameStepType {
  Question1 = 'question-1',
  Question2 = 'question-2',
  Question3 = 'question-3',
  Taiko = 'taiko',
}

export type TGameState = { step: GameStepType };
export type TGameContext = [TGameState, Dispatch<SetStateAction<TGameState>>];

export const GameState: TGameState = { step: GameStepType.Taiko };
export const GameContext = createContext<TGameContext>([GameState, () => {}]);
