import { memo, useEffect } from 'react';
import Chord from './chord';
import './game.less';
import Heart from './heart';

const TaikoGame = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='TaikoGame'>
      <div>
        <Chord />
        <Heart />
      </div>
    </div>
  );
});
export default TaikoGame;
