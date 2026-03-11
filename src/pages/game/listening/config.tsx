import { createContext, Dispatch, SetStateAction } from 'react';

export enum ListeningStepType {
  intro,
  question,
}
export type TListeningState = { step: ListeningStepType; index: number; selected: number[] };
export type TListeningContext = [TListeningState, Dispatch<SetStateAction<TListeningState>>];

export const ListeningState: TListeningState = {
  step: ListeningStepType.intro,
  index: 0,
  selected: [],
};
export const ListeningContext = createContext<TListeningContext>([ListeningState, () => {}]);

export const ListeningQuestions = [
  {
    question: { sound: 'sound1', text: '請問說話者最有可能是在對誰說話?' },
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound2', text: '請問說話者最有可能是在對誰說話?' },
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound3', text: '請問說話者最有可能是在對誰說話?' },
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound4', text: '請問說話者最有可能是在對誰說話?' },
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound5', text: '請問說話者最有可能是在對誰說話?' },
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
];
