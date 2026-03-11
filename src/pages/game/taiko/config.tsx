import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaikoStepType {
  intro,
  game,
}
export type TTaikoState = { step: TaikoStepType };
export type TTaikoContext = [TTaikoState, Dispatch<SetStateAction<TTaikoState>>];

export const TaikoState: TTaikoState = { step: TaikoStepType.intro };
export const TaikoContext = createContext<TTaikoContext>([TaikoState, () => {}]);
