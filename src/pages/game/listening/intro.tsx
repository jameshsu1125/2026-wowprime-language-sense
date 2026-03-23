import Button from '@/components/button';
import Heading from '@/components/heading';
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
import { TonesMandarin } from '../tones/config';
import { ListeningContext, ListeningStepType } from './config';
import './intro.less';

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

  return <div className='content' style={style} />;
});

const StartButton = memo(({ transition }: { transition: boolean }) => {
  const [, setState] = useContext(ListeningContext);

  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 1800 });
  }, [transition]);

  return (
    <div className='w-1/2' style={style}>
      <Button
        onClick={() => {
          setState((S) => ({ ...S, step: ListeningStepType.question }));
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
        setState((S) => ({ ...S, step: GameStepType.Taiko }));
      }}
    >
      <Button.Skip>略過此關</Button.Skip>
    </Button>
  );
});

const ListeningIntro = memo(() => {
  const [transition, setTransition] = useState(false);
  const boxRef = useRef<{ getBox: () => HTMLDivElement | null }>(null);

  return (
    <OnloadProvider
      onload={() => {
        setTransition(true);
      }}
    >
      <div className='ListeningIntro'>
        <div className='flex w-full flex-col items-center justify-center gap-10'>
          <Headline transition={transition} />
          <div className='description min-h-14 text-center'>
            <CharTransition
              delay={500}
              duration={727}
              list={TonesMandarin}
              preChar='　'
              fps={60}
              opacity={0.3}
            >
              本試題為語音題，
            </CharTransition>
            <br />
            <CharTransition
              delay={500 + 727}
              duration={1273}
              list={TonesMandarin}
              preChar='　'
              fps={60}
              opacity={0.3}
            >
              請開啟手機聲音聆聽題目作答。
            </CharTransition>
          </div>
          <Content ref={boxRef} transition={transition} />
          <div className='flex w-full flex-col items-center justify-center gap-4'>
            <StartButton transition={transition} />
            <SkipButton transition={transition} />
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default ListeningIntro;
