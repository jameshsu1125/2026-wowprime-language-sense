import { createContext, Dispatch, SetStateAction } from 'react';

export enum GameStepType {
  question1 = 'question-1',
  question2 = 'question-2',
  question3 = 'question-3',
  question4 = 'question-4',
  question5 = 'question-5',
}

export type TGameState = { step: GameStepType };
export type TGameContext = [TGameState, Dispatch<SetStateAction<TGameState>>];

export const GameState: TGameState = { step: GameStepType.question1 };
export const GameContext = createContext<TGameContext>([GameState, () => {}]);
