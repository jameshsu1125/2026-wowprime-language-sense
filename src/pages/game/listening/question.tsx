import Button from '@/components/button';
import Heading from '@/components/heading';
import { SETTING } from '@/settings/config';
import { ActionType, IReactProps } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { GameContext, GameStepType } from '../config';

import Radio from '@/components/radio';
import { ListeningContext, ListeningQuestions } from './config';
import './question.less';
import { Context } from '@/settings/constant';
import { SoundName } from '@/components/sounds/type';

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
      setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 400 });
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

type TListeningDescriptionProps = {
  transition: boolean;
  soundName: string;
};

const ListeningDescription = memo(({ transition, soundName }: TListeningDescriptionProps) => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;

  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 300 });
    }
  }, [transition]);
  return (
    <div className='w-[18%]' style={style}>
      <Button
        onClick={() => {
          sounds.tracks?.play(soundName as SoundName);
        }}
      >
        <div className='sounds pointer-events-none' />
      </Button>
    </div>
  );
});

const ListeningCFA = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 200 });
    }
  }, [transition]);
  return (
    <div className='w-full text-xl font-black tracking-wide md:text-xl' style={style}>
      請按下下方聲音鍵，在聽完對話後，
      <br />
      選出正確答案。
    </div>
  );
});

const ListeningQuestion = memo(({ questions }: { questions: typeof ListeningQuestions }) => {
  const ref = useRef<{ check: () => void }>(null);
  const [transition, setTransition] = useState(false);
  const [state, setState] = useContext(ListeningContext);
  const [, setGameState] = useContext(GameContext);
  const questionData = questions[state.index] ?? questions[0];
  console.log(questionData, questions, state.index);

  if (!state.isSoundsLoaded) return null;

  return (
    <OnloadProvider
      onload={() => {
        setTransition(true);
      }}
    >
      <div className='ListeningQuestion'>
        <Headline transition={transition} />
        <div className='body'>
          <div className='flex w-full flex-col items-center gap-5'>
            <ListeningCFA transition={transition} />
            <div className='flex w-full flex-row justify-start'>
              <ListeningDescription
                transition={transition}
                soundName={questionData.question.sound}
              />
            </div>
            <Question transition={transition}>
              <Radio
                ref={ref}
                text={questionData.question.text}
                options={questionData.answer}
                index={state.index + 1}
              />
            </Question>
          </div>

          <div className='flex w-full justify-end'>
            <NextButton
              transition={transition}
              onClick={() => {
                ref.current?.check();
                setTimeout(() => {
                  if (state.index >= 2) {
                    setGameState((S) => ({ ...S, step: GameStepType.Taiko }));
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
export default ListeningQuestion;
