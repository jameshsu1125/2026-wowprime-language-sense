import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomePageType {
  Unset = '',
  Landing = '/landing',
  Examiner = '/examiner',
  Login = '/login',
  Game = '/game',
}

export enum HomeStepType {
  unset,
  loaded,
}

export type THomeState = {
  step: HomeStepType;
  page: HomePageType;
  level: number;
  isFirstVisit: boolean;
};
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState: THomeState = {
  step: HomeStepType.unset,
  page: HomePageType.Examiner,
  level: 0,
  isFirstVisit: false,
};
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
