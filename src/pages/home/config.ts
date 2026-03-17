import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomePageType {
  Landing = '/landing',
  Examiner = '/examiner',
  Login = '/login',
  Game = '/game',
}

export enum HomeStepType {
  unset,
  loaded,
}

export type THomeState = { step: HomeStepType; page: HomePageType; level: number };
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState: THomeState = {
  step: HomeStepType.unset,
  page: HomePageType.Examiner,
  level: 0,
};
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
