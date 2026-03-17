import { ResetContext } from '@/pages/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { GameEndContext, GameEndState, GameEndStepType } from './config';
import './index.less';
import EndLanding from './landing';
import Ranking from './ranking';
import EndResult from './result';

const BG = memo(() => {
  const [context] = useContext(Context);
  const { openRanking } = context[ActionType.Playing]!;
  const [style, setStyle] = useTween({ opacity: 0, backgroundColor: '#000000' });

  useEffect(() => {
    if (openRanking) {
      setStyle({ opacity: 1, backgroundColor: '#ffffff' }, 200);
    } else setStyle({ opacity: 0.8, backgroundColor: '#000000' }, 200);
  }, [openRanking]);
  return <div className='bg' style={style} />;
});

const GameEnd = memo(() => {
  const [context] = useContext(Context);
  const { openRanking } = context[ActionType.Playing]!;

  const value = useState(GameEndState);
  const [reset] = useContext(ResetContext);

  useEffect(() => {
    if (reset.index) value[1](GameEndState);
  }, [reset.index]);

  const page = useMemo(() => {
    if (openRanking) {
      return <Ranking />;
    }

    switch (value[0].step) {
      default:
      case GameEndStepType.landing:
        return <EndLanding />;

      case GameEndStepType.result:
        return <EndResult />;
    }
  }, [value[0].step, openRanking]);

  return (
    <GameEndContext.Provider value={value}>
      <div className='GameEnd'>
        <BG />
        <div className='ctx'>{page}</div>
      </div>
    </GameEndContext.Provider>
  );
});
export default GameEnd;
