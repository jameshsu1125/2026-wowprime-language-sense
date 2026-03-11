import { createContext, Dispatch, SetStateAction } from 'react';

export enum TonesStepType {
  intro,
  question,
}

export type TTonesState = {
  step: TonesStepType;
  index: number;
  selected: number[];
};
export type TTonesContext = [TTonesState, Dispatch<SetStateAction<TTonesState>>];

export const TonesState: TTonesState = {
  step: TonesStepType.intro,
  index: 0,
  selected: [],
};
export const TonesContext = createContext<TTonesContext>([TonesState, () => {}]);

export const TonesIntroSwitchBoxTime = 800;

export const TonesQuestions = [
  {
    question: '愛好好吃的你，可以和我一起好好吃好吃的嗎?',
    answer: [
      { index: 1, tone: 4 },
      { index: 2, tone: 3 },
      { index: 13, tone: 3 },
      { index: 14, tone: 3 },
      { index: 16, tone: 3 },
    ],
  },
  {
    question: '行行出狀元，他在銀行工作，工作很行',
    answer: [
      { index: 0, tone: 2 },
      { index: 1, tone: 2 },
      { index: 9, tone: 2 },
      { index: 16, tone: 2 },
    ],
  },
  {
    question: '老師說詩人寫詩時，要把詩寫實。',
    answer: [
      { index: 3, tone: 1 },
      { index: 6, tone: 1 },
      { index: 11, tone: 1 },
    ],
  },
  {
    question: '四是四，十是十，十四是十四，四十是四十',
    answer: [
      { index: 0, tone: 4 },
      { index: 4, tone: 2 },
      { index: 9, tone: 4 },
      { index: 11, tone: 2 },
      { index: 17, tone: 4 },
    ],
  },
  {
    question: '你想不想像小翔一樣，想像很多想像的事情',
    answer: [
      { index: 1, tone: 3 },
      { index: 3, tone: 3 },
      { index: 10, tone: 3 },
      { index: 14, tone: 3 },
    ],
  },
];

export const TonesMandarin = [
  'ㄅ',
  'ㄆ',
  'ㄇ',
  'ㄈ',
  'ㄉ',
  'ㄊ',
  'ㄋ',
  'ㄌ',
  'ㄍ',
  'ㄎ',
  'ㄏ',
  'ㄐ',
  'ㄑ',
  'ㄒ',
  'ㄓ',
  'ㄔ',
  'ㄕ',
  'ㄖ',
  'ㄗ',
  'ㄘ',
  'ㄙ',
];
