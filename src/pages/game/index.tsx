import { memo, useMemo, useState } from 'react';
import { GameContext, GameState } from './config';
import './index.less';
import Question1 from './question-1';
import Question2 from './question-2';
import Question3 from './question-3';
import Taiko from './taiko';

const Game = memo(() => {
  const value = useState(GameState);

  const page = useMemo(() => {
    switch (value[0].step) {
      case 'question-1':
        return <Question1 />;

      case 'question-2':
        return <Question2 />;

      case 'question-3':
        return <Question3 />;

      case 'taiko':
        return <Taiko />;

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
