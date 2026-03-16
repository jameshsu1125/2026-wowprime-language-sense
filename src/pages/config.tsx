import { createContext, Dispatch, SetStateAction } from 'react';

export type TResetState = { index: number };
export type TResetContext = [TResetState, Dispatch<SetStateAction<TResetState>>];

export const ResetState = { index: 0 };
export const ResetContext = createContext<TResetContext>([ResetState, () => {}]);
