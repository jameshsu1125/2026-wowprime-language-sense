import { createContext, Dispatch, SetStateAction } from 'react';

export type TResetState = { index: number; navto: 'home' | 'game' };
export type TResetContext = [TResetState, Dispatch<SetStateAction<TResetState>>];

export const ResetState: TResetState = { index: 0, navto: 'home' };
export const ResetContext = createContext<TResetContext>([ResetState, () => {}]);
