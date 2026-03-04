import { memo, useMemo, useState } from 'react';
import { GameContext, GameState } from './config';
import Question1 from './question-1';

import './index.less';
import Question2 from './question-2';

const Game = memo(() => {
  const value = useState(GameState);

  const page = useMemo(() => {
    switch (value[0].step) {
      case 'question-1':
        return <Question1 />;

      case 'question-2':
        return <Question2 />;

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
