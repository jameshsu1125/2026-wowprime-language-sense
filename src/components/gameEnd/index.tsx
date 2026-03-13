import useTween from 'lesca-use-tween';
import { memo, useEffect, useState } from 'react';
import { GameEndContext, GameEndState } from './config';
import './index.less';
import EndLanding from './landing';

const BG = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  useEffect(() => {
    setStyle({ opacity: 0.8 }, 200);
  }, []);
  return <div className='bg' style={style} />;
});

const GameEnd = memo(() => {
  const value = useState(GameEndState);

  return (
    <GameEndContext.Provider value={value}>
      <div className='GameEnd'>
        <BG />
        <div className='ctx'>
          <EndLanding />
        </div>
      </div>
    </GameEndContext.Provider>
  );
});
export default GameEnd;
