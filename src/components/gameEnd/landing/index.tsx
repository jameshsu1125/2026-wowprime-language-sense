import useDown from '@/hooks/useDown';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { GameEndContext, GameEndStayDuration, GameEndStepType } from '../config';
import './index.less';

const Heading = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 3 });

  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;
  const { score = 0, openRanking = false } = context[ActionType.Playing]!;
  const [downRes, sendScore] = useDown();
  const [, setState] = useContext(GameEndContext);

  useEffect(() => {
    if (downRes) {
      if (downRes.status === 'success') {
        setState((S) => ({ ...S, result: downRes.data, step: GameEndStepType.result }));
      } else alert(downRes.message);
    }
  }, [downRes]);

  useEffect(() => {
    if (transition) {
      setStyle(
        { opacity: 1, scale: 1 },
        {
          delay: 200,
          duration: 300,
          onStart: () => {
            if (!openRanking) sounds.tracks?.play('success');
          },
          onEnd: () => {
            setStyle(
              { scale: 1 },
              {
                duration: GameEndStayDuration,
                onEnd: () => {
                  sendScore({ score });
                },
              },
            );
          },
        },
      );
    }
  }, [transition]);

  return <div className='heading' style={style} />;
});

const EndLanding = memo(() => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;
  const [transition, setTransition] = useState(false);

  return (
    <OnloadProvider
      onload={() => {
        setTransition(true);
        sounds.tracks?.stop('bgm');
      }}
    >
      <div className='EndLanding'>
        <Heading transition={transition} />
      </div>
    </OnloadProvider>
  );
});
export default EndLanding;
