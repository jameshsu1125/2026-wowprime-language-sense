import Button from '@/components/button';
import Heading from '@/components/heading';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import CharTransition from 'lesca-react-char-transition';
import OnloadProvider from 'lesca-react-onload';
import useTween, { Bezier } from 'lesca-use-tween';
import {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TonesMandarin } from '../tones/config';
import { TaikoContext, TaikoStepType } from './config';
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

  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 2300 });
  }, [transition]);

  return (
    <div className='relative w-8/12' style={style}>
      <div className='content' />
    </div>
  );
});

const StartButton = memo(({ transition }: { transition: boolean }) => {
  const [, setState] = useContext(TaikoContext);
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 3000 });
  }, [transition]);

  return (
    <div className='w-1/2' style={style}>
      <Button
        onClick={() => {
          setState((S) => ({ ...S, step: TaikoStepType.game }));
        }}
      >
        <Button.large>
          <div className='btn-start' />
        </Button.large>
      </Button>
    </div>
  );
});

const Postscript = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  useEffect(() => {
    if (transition)
      setStyle({ opacity: 1, scale: 1 }, { duration: 250, delay: 3500, easing: Bezier.outBack });
  }, [transition]);
  return (
    <span className='text-base md:text-base' style={style}>
      ★三次Miss即結束測驗，請把握機會!★
    </span>
  );
});

const TaikoIntro = memo(() => {
  const [context, setContext] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;

  const [transition, setTransition] = useState(false);
  const boxRef = useRef<{ getBox: () => HTMLDivElement | null }>(null);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        sounds.tracks?.preload('onGame', () => {
          setTransition(true);
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        });
      }}
    >
      <div className='TaikoIntro'>
        <div className='flex w-full flex-col items-center justify-center gap-10'>
          <Headline transition={transition} />
          <div className='description min-h-14 text-center'>
            {transition && (
              <>
                <CharTransition
                  delay={500}
                  duration={727}
                  list={TonesMandarin}
                  preChar='　'
                  fps={60}
                  opacity={0.3}
                >
                  請開啟手機聲音
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
                  依照節奏提示，點擊畫面中的
                </CharTransition>
              </>
            )}
          </div>
          <Content ref={boxRef} transition={transition} />
          <div className='flex w-full flex-col items-center justify-center gap-4'>
            <Postscript transition={transition} />
            <StartButton transition={transition} />
          </div>
        </div>
        <div className='icon-preloader'>
          <div />
          <div />
          <div />
        </div>
      </div>
    </OnloadProvider>
  );
});
export default TaikoIntro;
