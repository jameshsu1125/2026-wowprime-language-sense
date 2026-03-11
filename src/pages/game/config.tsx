import { createContext, Dispatch, SetStateAction } from 'react';

export enum GameStepType {
  Tones = 'tones',
  Listening = 'listening',
  Taiko = 'taiko',
}

export type TGameState = { step: GameStepType };
export type TGameContext = [TGameState, Dispatch<SetStateAction<TGameState>>];

export const GameState: TGameState = { step: GameStepType.Listening };
export const GameContext = createContext<TGameContext>([GameState, () => {}]);
