import Button from '@/components/button';
import Heading from '@/components/heading';
import Literal from '@/components/literal';
import { shuffleArray } from '@/utils';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { GameContext, GameStepType } from '../config';
import { TonesContext, TonesQuestions } from './config';
import './question.less';

const Headline = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500 });
    }
  }, [transition]);

  return (
    <Heading.H1 style={style}>
      <div className='heading' />
    </Heading.H1>
  );
});

const Question = memo(
  ({
    questionData,
    transition,
    setIsPassed,
  }: {
    questionData: (typeof TonesQuestions)[0];
    transition: boolean;
    setIsPassed: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const [style, setStyle] = useTween({ opacity: 0, y: 50 });

    useEffect(() => {
      if (transition) {
        setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 300 });
      }
    }, [transition]);

    return (
      <div style={style}>
        <Literal
          text={questionData.question}
          answer={questionData.answer}
          onComplete={() => {
            setIsPassed(true);
          }}
        />
      </div>
    );
  },
);

const NextButton = memo(({ transition, isPassed }: { transition: boolean; isPassed: boolean }) => {
  const [, setGameState] = useContext(GameContext);
  const [state, setState] = useContext(TonesContext);

  const [style, setStyle] = useTween({ opacity: 0, x: -50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, x: 0 }, { duration: 500, delay: 1000 });
    }
  }, [transition]);

  return (
    <div className='mr-2 mb-5 w-[48%]' style={style}>
      <Button
        className={twMerge(isPassed && 'grayscale duration-200')}
        onClick={() => {
          if (isPassed === false) return;

          if (state.index < 2) {
            setState((S) => ({ ...S, index: S.index + 1 }));
          } else {
            setGameState((S) => ({ ...S, step: GameStepType.Listening }));
          }
        }}
      >
        <Button.large>
          <div className='btn-next' />
        </Button.large>
      </Button>
    </div>
  );
});

const TonesQuestion = memo(() => {
  const [transition, setTransition] = useState(false);
  const [state, setState] = useContext(TonesContext);
  const [isPassed, setIsPassed] = useState(false);

  const [questionIndex] = useState(() => {
    const unselectedData = [...new Array(TonesQuestions.length).keys()].filter(
      (i) => !state.selected.includes(i),
    );
    const [currentIndex] = shuffleArray(unselectedData);
    return currentIndex ?? 0;
  });

  useEffect(() => {
    setState((currentState) => {
      if (currentState.selected.includes(questionIndex)) return currentState;
      return { ...currentState, selected: [...currentState.selected, questionIndex] };
    });
  }, [questionIndex, setState]);

  const questionData = TonesQuestions[questionIndex] ?? TonesQuestions[0];

  return (
    <OnloadProvider
      onload={() => {
        setTransition(true);
      }}
    >
      <div className='TonesQuestion'>
        <Headline transition={transition} />
        <div className='body'>
          <Question questionData={questionData} transition={transition} setIsPassed={setIsPassed} />
          <div className='flex w-full justify-end'>
            <NextButton transition={transition} isPassed={isPassed} />
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default TonesQuestion;
