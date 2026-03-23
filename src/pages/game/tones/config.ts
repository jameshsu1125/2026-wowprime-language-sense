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
    question: '愛好好吃的你，可以跟我一起好好吃好吃的嗎？',
    answer: [
      { index: 1, tone: 4 },
      { index: 2, tone: 3 },
      { index: 13, tone: 3 },
      { index: 14, tone: 3 },
      { index: 16, tone: 3 },
    ],
  },
  {
    question: '東西好不好好吃的我好好吃一吃就知道。',
    answer: [
      { index: 2, tone: 3 },
      { index: 4, tone: 3 },
      { index: 5, tone: 4 },
      { index: 9, tone: 3 },
      { index: 10, tone: 3 },
    ],
  },
  {
    question: '你這麼好吃，我們只好一起投其所好好吃的都給你。',
    answer: [
      { index: 3, tone: 4 },
      { index: 9, tone: 3 },
      { index: 15, tone: 4 },
      { index: 16, tone: 3 },
    ],
  },
  {
    question: '如果能跟他一起好好吃好不好吃都可以。',
    answer: [
      { index: 7, tone: 3 },
      { index: 8, tone: 3 },
      { index: 10, tone: 3 },
      { index: 12, tone: 3 },
    ],
  },
  {
    question: '最好好好一起跟好好吃的我，有好好的關係。',
    answer: [
      { index: 1, tone: 3 },
      { index: 2, tone: 3 },
      { index: 3, tone: 3 },
      { index: 7, tone: 3 },
      { index: 8, tone: 4 },
      { index: 14, tone: 3 },
      { index: 15, tone: 3 },
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
