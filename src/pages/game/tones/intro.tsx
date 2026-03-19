import Button from '@/components/button';
import Heading from '@/components/heading';
import { Context } from '@/settings/constant';
import CharTransition from 'lesca-react-char-transition';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { GameContext, GameStepType } from '../config';
import { TonesContext, TonesIntroSwitchBoxTime, TonesMandarin, TonesStepType } from './config';
import './intro.less';
import { ActionType } from '@/settings/type';

const Headline = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) setStyle({ opacity: 1, y: 0 }, 500);
  }, [transition]);

  return (
    <Heading.H2 style={style}>
      <div className='heading' />
    </Heading.H2>
  );
});

const Content = forwardRef(({ transition }: { transition: boolean }, ref) => {
  const boxRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    getBox() {
      return boxRef.current;
    },
  }));

  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (transition) setStyle({ opacity: 1 }, { duration: 500, delay: 800 });
  }, [transition]);

  return (
    <div className='content' style={style}>
      <div ref={boxRef} />
    </div>
  );
});

const StartButton = memo(({ transition }: { transition: boolean }) => {
  const [, setState] = useContext(TonesContext);

  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 1800 });
  }, [transition]);

  return (
    <div className='w-1/2' style={style}>
      <Button
        onClick={() => {
          setState((S) => ({ ...S, step: TonesStepType.question }));
        }}
      >
        <Button.large>
          <div className='btn-start' />
        </Button.large>
      </Button>
    </div>
  );
});

const SkipButton = memo(({ transition }: { transition: boolean }) => {
  const [, setState] = useContext(GameContext);
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 2000 });
  }, [transition]);

  return (
    <Button
      style={style}
      className='w-fit'
      onClick={() => {
        setState((S) => ({ ...S, step: GameStepType.Listening }));
      }}
    >
      <Button.Skip>略過此關</Button.Skip>
    </Button>
  );
});

const TonesIntro = memo(() => {
  const [, setContext] = useContext(Context);
  const [transition, setTransition] = useState(false);
  const boxRef = useRef<{ getBox: () => HTMLDivElement | null }>(null);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    const offsets = [0, 21, 45, 68, 92];
    const animate = { index: Math.floor(Math.random() * offsets.length) };
    const setOffset = () => {
      const box = boxRef.current?.getBox();
      if (box) {
        animate.index += 1;
        const offset = offsets[animate.index % offsets.length];
        box.style.left = `${offset}%`;
      }
    };

    setOffset();
    const interval = setInterval(setOffset, TonesIntroSwitchBoxTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        setTransition(true);
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      }}
    >
      <div className='TonesIntro'>
        <div className='flex w-full flex-col items-center justify-center gap-10'>
          <Headline transition={transition} />
          <div className='description min-h-14'>
            <CharTransition
              delay={500}
              duration={2000}
              list={TonesMandarin}
              preChar='　'
              fps={60}
              opacity={0.3}
            >
              請在題目句子中，點擊紅色空格，選擇「好」字注音的正確聲調。
            </CharTransition>
          </div>
          <Content ref={boxRef} transition={transition} />
          <div className='mt-10 flex w-full flex-col items-center justify-center gap-4 md:mt-20'>
            <StartButton transition={transition} />
            <SkipButton transition={transition} />
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default TonesIntro;
