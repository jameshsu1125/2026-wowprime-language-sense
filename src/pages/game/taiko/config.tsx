import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaikoStepType {
  intro,
  game,
}
export type TTaikoState = { step: TaikoStepType; heart: number };
export type TTaikoContext = [TTaikoState, Dispatch<SetStateAction<TTaikoState>>];

export const TaikoState: TTaikoState = { step: TaikoStepType.intro, heart: 3 };
export const TaikoContext = createContext<TTaikoContext>([TaikoState, () => {}]);

export const TaikoBullseye = 79.4; // 點擊位置%
export const TaikoTolerance = 10; // 容錯率

const params = new URLSearchParams(window.location.search);
const speed = parseInt(params.get('speed') || '4000') || 4000;
const min = parseInt(params.get('min') || '280') || 280;
const level = parseInt(params.get('level') || '75') || 75;
const start = parseInt(params.get('start') || '1000') || 1000;

export const TaikoNoteSpeed = speed;
export const TaikoMinGap = min;
export const TaikoLevelChangeInterval = level;
export const TaikoInitInterval = start;
