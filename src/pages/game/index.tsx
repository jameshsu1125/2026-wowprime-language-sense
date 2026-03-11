import { memo, useMemo, useState } from 'react';
import { GameContext, GameState, GameStepType } from './config';
import './index.less';
import Tones from './tones';
import Listening from './listening';

const Game = memo(() => {
  const value = useState(GameState);

  const page = useMemo(() => {
    switch (value[0].step) {
      case GameStepType.Tones:
        return <Tones />;

      case GameStepType.Listening:
        return <Listening />;

      default:
        return null;
    }
  }, [value[0].step]);

  return (
    <div className='Game'>
      <GameContext.Provider value={value}>{page}</GameContext.Provider>
    </div>
  );
});
export default Game;
