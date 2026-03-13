import useTween from 'lesca-use-tween';
import { memo, useEffect, useMemo, useState } from 'react';
import { GameEndContext, GameEndState, GameEndStepType } from './config';
import './index.less';
import EndLanding from './landing';
import EndResult from './result';

const BG = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  useEffect(() => {
    setStyle({ opacity: 0.8 }, 200);
  }, []);
  return <div className='bg' style={style} />;
});

const GameEnd = memo(() => {
  const value = useState(GameEndState);

  const page = useMemo(() => {
    switch (value[0].step) {
      default:
      case GameEndStepType.landing:
        return <EndLanding />;

      case GameEndStepType.result:
        return <EndResult />;
    }
  }, [value[0].step]);

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
