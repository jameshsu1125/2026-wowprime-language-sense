import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { GameContext, GameState, GameStepType } from './config';
import './index.less';
import Tones from './tones';
import Listening from './listening';
import Taiko from './taiko';
import { ResetContext } from '../config';

const Game = memo(() => {
  const value = useState(GameState);
  const [reset] = useContext(ResetContext);

  useEffect(() => {
    if (reset.index) {
      value[1](GameState);
    }
  }, [reset.index]);

  const page = useMemo(() => {
    switch (value[0].step) {
      default:
      case GameStepType.Tones:
        return <Tones />;

      case GameStepType.Listening:
        return <Listening />;

      case GameStepType.Taiko:
        return <Taiko />;
    }
  }, [value[0].step]);

  return (
    <div className='Game'>
      <GameContext.Provider value={value}>{page}</GameContext.Provider>
    </div>
  );
});
export default Game;
