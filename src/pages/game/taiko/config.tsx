import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaikoStepType {
  intro,
  game,
}
export type TTaikoState = { step: TaikoStepType; heart: number };
export type TTaikoContext = [TTaikoState, Dispatch<SetStateAction<TTaikoState>>];

export const TaikoState: TTaikoState = { step: TaikoStepType.intro, heart: 3 };
export const TaikoContext = createContext<TTaikoContext>([TaikoState, () => {}]);

export const TaikoBullseye = 84.4; // 點擊位置%
export const TaikoTolerance = 10; // 容錯率
