import { createContext, Dispatch, SetStateAction } from 'react';

export enum ListeningStepType {
  intro,
  question,
}
export type TListeningState = { step: ListeningStepType; index: number; selected: number[] };
export type TListeningContext = [TListeningState, Dispatch<SetStateAction<TListeningState>>];

export const ListeningState: TListeningState = {
  step: ListeningStepType.question,
  index: 0,
  selected: [],
};
export const ListeningContext = createContext<TListeningContext>([ListeningState, () => {}]);

export const ListeningQuestions = [
  {
    question: 'sound1',
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: 'sound2',
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: 'sound3',
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: 'sound3',
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: 'sound4',
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: 'sound5',
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
];
