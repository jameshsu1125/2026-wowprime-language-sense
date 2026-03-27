import { createContext } from 'react';
import { PAGE } from './config';
import {
  ActionType,
  IAction,
  IState,
  LoadingProcessType,
  TContext,
  TLoadingProcessState,
  TMenu,
  TModal,
  TPlaying,
  TSounds,
  TUser,
} from './type';

export const LoadingProcessState: TLoadingProcessState = {
  enabled: true,
  type: LoadingProcessType.SpinningBubbles,
  body: '',
};

export const UserState: TUser = {
  nickname: '',
  phone: '',
};

export const MenuState: TMenu = {
  enabled: false,
};

export const PlayingState: TPlaying = {
  enabled: false, // 分數版是否顯示
  score: 0,
  isEnd: false, // 遊戲是否結束
  openRanking: false, // 是否開啟排行榜
  openAnnouncement: false,
};

export const SoundsState: TSounds = {
  tracks: undefined,
};

export const ModalState: TModal = {
  enabled: false,
  title: '系統訊息',
  content: '',
  Label: ['確認'],
  closeOnOverlay: true,
};

export const InitialState: IState = {
  [ActionType.Page]: PAGE.home,
  [ActionType.LoadingProcess]: LoadingProcessState,
  [ActionType.User]: UserState,
  [ActionType.Menu]: MenuState,
  [ActionType.Playing]: PlayingState,
  [ActionType.Sounds]: SoundsState,
  [ActionType.Modal]: ModalState,
};

export const Context = createContext<TContext>([InitialState, () => {}]);
export const Reducer = (state: IState, action: IAction): IState => {
  if (action.state instanceof Object) {
    let stateStorage: { [key: string]: any } = {};
    Object.entries(action.state)
      .filter((actionState) => {
        const value = Object.values(ActionType).filter(
          (actionValue) => actionValue === actionState[0],
        );
        if (value.length > 0 || action.type) return true;
        return false;
      })
      .map((actionState) => {
        const value = Object.values(ActionType).filter(
          (actionValue) => actionValue === actionState[0],
        );
        if (value.length > 0) return actionState;
        return [action.type, Object.fromEntries([actionState])];
      })
      .forEach((actionState) => {
        if (actionState) {
          const [key, value] = actionState;
          const stringKey = String(key);
          const cloneVale = Object.fromEntries(
            Object.entries(state).filter((stateValue) => stateValue[0] === stringKey),
          )[action.type];
          if (Object.prototype.hasOwnProperty.call(stateStorage, stringKey)) {
            stateStorage = {
              [stringKey]: { ...stateStorage[stringKey], ...value },
            };
          } else stateStorage = { [stringKey]: { ...cloneVale, ...value } };
        }
      });
    return { ...state, ...stateStorage };
  }
  if (action.type) return { ...state, [action.type]: action.state };
  return state;
};
