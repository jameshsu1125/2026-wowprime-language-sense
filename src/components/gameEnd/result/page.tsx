import { IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { GameEndContext, GameEndFinalType } from '../config';
import Card from './card/card';
import Final from './final';
import Frag from './frag';
import './index.less';

const Dialog = memo(
  ({ children, transition, onEnd }: IReactProps & { transition: boolean; onEnd: () => void }) => {
    const [style, setStyle] = useTween({ opacity: 0, y: window.innerHeight });

    useEffect(() => {
      if (transition) {
        setStyle({ opacity: 1, y: 0 }, { duration: 600, onEnd });
      }
    }, [transition]);
    return <div style={style}>{children}</div>;
  },
);

const FrameBottom = memo(() => {
  const [state] = useContext(GameEndContext);
  const [style, setStyle] = useTween({ bottom: '18.1%' });

  useEffect(() => {
    if (state.final === GameEndFinalType.award) {
      setStyle({ bottom: '0%' }, 400);
    }
  }, [state.final]);

  return <div className='frame-bottom' style={style} />;
});

const Page = memo(({ transition }: { transition: boolean }) => {
  const [state] = useContext(GameEndContext);
  const [transitionEnd, setTransitionEnd] = useState(false);

  const page = useMemo(() => {
    switch (state.final) {
      case GameEndFinalType.card:
        return <Card transition={transitionEnd} />;
      case GameEndFinalType.award:
        return <Final />;

      default:
        return null;
    }
  }, [state.final, transitionEnd]);

  return (
    <Dialog transition={transition} onEnd={() => setTransitionEnd(true)}>
      <FrameBottom />
      {page}
      <Frag />
    </Dialog>
  );
});
export default Page;
