import useStatus from '@/hooks/useStatus';
import { HomeContext, HomePageType } from '@/pages/home/config';
import { IReactProps, TransitionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GameEndContext, GameEndFinalType } from '../config';
import Card from './card/card';
import Final from './final';
import Frag from './frag';
import './index.less';

type IPageProps = IReactProps & {
  transition: TransitionType;
  onEnd: () => void;
};
const Dialog = memo(({ children, transition, onEnd }: IPageProps) => {
  const [style, setStyle] = useTween({ opacity: 0, y: window.innerHeight });

  useEffect(() => {
    if (transition == TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, onEnd });
    }
  }, [transition]);
  return <div style={style}>{children}</div>;
});

const FrameBottom = memo(() => {
  const [state] = useContext(GameEndContext);
  const [style, setStyle] = useTween({ bottom: '18.1%' });

  useEffect(() => {
    if (state.final === GameEndFinalType.award) setStyle({ bottom: '0%' }, 400);
  }, [state.final]);

  return <div className='frame-bottom' style={style} />;
});

const Page = memo(() => {
  const [state] = useContext(GameEndContext);
  const [transitionEnd, setTransitionEnd] = useState(false);
  const [transition, setTransition] = useState(TransitionType.Unset);
  const [, setHomeState] = useContext(HomeContext);
  const [statusRes] = useStatus();

  const onCardLoadEnd = useCallback(() => {
    setTransition(TransitionType.FadeIn);
  }, []);

  const page = useMemo(() => {
    switch (state.final) {
      case GameEndFinalType.card:
        return (
          <Card
            transition={transitionEnd}
            user={statusRes?.user}
            coupon={statusRes?.coupon}
            onCardLoadEnd={onCardLoadEnd}
          />
        );

      case GameEndFinalType.award:
        return <Final user={statusRes?.user} />;

      default:
        return null;
    }
  }, [state.final, transitionEnd, statusRes]);

  if (statusRes?.status !== 'success') return null;

  return (
    <Dialog
      transition={transition}
      onEnd={() => {
        setTransitionEnd(true);
        setHomeState((S) => ({ ...S, page: HomePageType.Unset }));
      }}
    >
      <FrameBottom />
      {page}
      <Frag />
    </Dialog>
  );
});
export default Page;
