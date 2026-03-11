import { createContext, Dispatch, SetStateAction } from 'react';

export enum TonesStepType {
  intro,
  question,
}

export type TTonesState = { step: TonesStepType; index: number; selected: number[] };
export type TTonesContext = [TTonesState, Dispatch<SetStateAction<TTonesState>>];

export const TonesState: TTonesState = { step: TonesStepType.question, index: 0, selected: [] };
export const TonesContext = createContext<TTonesContext>([TonesState, () => {}]);

export const TonesIntroSwitchBoxTime = 800;

export const TonesQuestions = [
  {
    question: '愛好好吃的你，可以和我一起好好吃好吃的嗎?1',
    answer: [
      { index: 1, tone: 4 },
      { index: 2, tone: 3 },
      { index: 12, tone: 3 },
      { index: 13, tone: 3 },
      { index: 15, tone: 3 },
    ],
  },
  {
    question: '愛好好吃的你，可以和我一起好好吃好吃的嗎?2',
    answer: [
      { index: 1, tone: 4 },
      { index: 2, tone: 3 },
      { index: 12, tone: 3 },
      { index: 13, tone: 3 },
      { index: 15, tone: 3 },
    ],
  },
  {
    question: '愛好好吃的你，可以和我一起好好吃好吃的嗎?3',
    answer: [
      { index: 1, tone: 4 },
      { index: 2, tone: 3 },
      { index: 12, tone: 3 },
      { index: 13, tone: 3 },
      { index: 15, tone: 3 },
    ],
  },
  {
    question: '愛好好吃的你，可以和我一起好好吃好吃的嗎?4',
    answer: [
      { index: 1, tone: 4 },
      { index: 2, tone: 3 },
      { index: 12, tone: 3 },
      { index: 13, tone: 3 },
      { index: 15, tone: 3 },
    ],
  },
  {
    question: '愛好好吃的你，可以和我一起好好吃好吃的嗎?5',
    answer: [
      { index: 1, tone: 4 },
      { index: 2, tone: 3 },
      { index: 12, tone: 3 },
      { index: 13, tone: 3 },
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
