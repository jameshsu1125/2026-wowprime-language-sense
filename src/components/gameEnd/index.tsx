import { ResetContext } from '@/pages/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { GameEndContext, GameEndState, GameEndStepType } from './config';
import './index.less';
import EndLanding from './landing';
import EndResult from './result';
import Ranking from './ranking';

const BG = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, backgroundColor: '#000000' });

  useEffect(() => {
    setStyle({ opacity: 0.8, backgroundColor: '#000000' }, 200);
  }, []);
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
    switch (value[0].step) {
      case GameEndStepType.landing:
        return <EndLanding />;

      case GameEndStepType.result:
        return <EndResult />;

      default:
        return null;
    }
  }, [value[0].step]);

  return (
    <GameEndContext.Provider value={value}>
      <div className='GameEnd'>
        {!openRanking && <BG />}
        <div className='ctx'>{page}</div>
        {openRanking && <Ranking />}
      </div>
    </GameEndContext.Provider>
  );
});
export default GameEnd;
