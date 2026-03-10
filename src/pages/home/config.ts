import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomePageType {
  Landing = '/landing',
  Examiner = '/examiner',
  Game = '/game',
}

export enum HomeStepType {
  unset,
  loaded,
}
export type THomeState = { step: HomeStepType; page: HomePageType };
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState: THomeState = { step: HomeStepType.unset, page: HomePageType.Examiner };
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
