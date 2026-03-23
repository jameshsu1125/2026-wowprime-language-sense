import Button from '@/components/button';
import Heading from '@/components/heading';
import Literal from '@/components/literal';
import { SETTING } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { shuffleArray } from '@/utils';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { GameContext, GameStepType } from '../config';
import { TonesContext, TonesQuestions } from './config';
import './question.less';

type TQuestionProps = IReactProps & {
  transition: boolean;
};

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

const Question = memo(({ children, transition }: TQuestionProps) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 300 });
    }
  }, [transition]);

  return <div style={style}>{children}</div>;
});

const NextButton = memo(({ transition, onClick }: { transition: boolean; onClick: () => void }) => {
  const [style, setStyle] = useTween({ opacity: 0, x: -50 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, x: 0 }, { duration: 500, delay: 1000 });
    }
  }, [transition]);

  return (
    <div className='mr-2 mb-5 w-[48%]' style={style}>
      <Button
        disabled={clicked}
        className={twMerge(clicked && 'grayscale')}
        onClick={() => {
          if (clicked) return;
          setClicked(true);
          onClick();
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
  const [, setContext] = useContext(Context);
  const ref = useRef<{ check: () => void }>(null);

  const [transition, setTransition] = useState(false);
  const [state, setState] = useContext(TonesContext);
  const [, setGameState] = useContext(GameContext);

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

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        requestAnimationFrame(() => {
          setTransition(true);
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        });
      }}
    >
      <div className='TonesQuestion'>
        <Headline transition={transition} />
        <div className='body'>
          <Question transition={transition}>
            <Literal
              ref={ref}
              text={questionData.question}
              answer={questionData.answer}
              onComplete={() => {}}
            />
          </Question>
          <div className='flex w-full justify-end'>
            <NextButton
              transition={transition}
              onClick={() => {
                ref.current?.check();
                setTimeout(() => {
                  if (state.index >= 2) {
                    setGameState((S) => ({ ...S, step: GameStepType.Listening }));
                  } else {
                    setState((S) => ({ ...S, index: S.index + 1 }));
                  }
                }, SETTING.checkAnswerReactDuration);
              }}
            />
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default TonesQuestion;
