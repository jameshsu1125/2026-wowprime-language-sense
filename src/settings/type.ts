import Sounds from '@/components/sounds';
import { Dispatch, ReactNode } from 'react';

export enum ActionType {
  Page = 'page',
  LoadingProcess = 'loadingProcess',
  User = 'user',
  Menu = 'menu',
  Playing = 'playing',
  Sounds = 'sounds',
}

export enum LoadingProcessType {
  Ball = 'balls',
  Bars = 'bars',
  Bubbles = 'bubbles',
  Cubes = 'cubes',
  Cylon = 'cylon',
  Spin = 'spin',
  SpinningBubbles = 'spinningBubbles',
  Spokes = 'spokes',
}

export enum TransitionType {
  Unset = 0,
  FadeIn = 1,
  FadeOut = 2,
  DidFadeIn = 3,
  DidFadeOut = 4,
  Loop = 5,
  Stop = 6,
}

export type TLoadingProcessState = {
  enabled?: boolean;
  type?: LoadingProcessType;
  body?: '';
};

export type TUser = {
  nickname: string;
  phone: string;
  token?: string;
};

export type TMenu = {
  enabled?: boolean;
};

export type TPlaying = {
  enabled?: boolean;
  score?: number;
  isEnd?: boolean;
};

export type TReset = {
  index: number;
};

export type TSounds = {
  tracks?: Sounds;
};

export interface IState {
  page?: string;
  loadingProcess?: TLoadingProcessState;
  user?: TUser;
  menu?: TMenu;
  playing?: TPlaying;
  sounds?: TSounds;
}

export interface IAction {
  state: IState | TLoadingProcessState | TUser | TMenu | TPlaying | TSounds;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
