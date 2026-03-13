import { memo, useContext, useEffect } from 'react';
import Chord from './chord';
import './game.less';
import Heart from './heart';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';

const TaikoGame = memo(() => {
  const [, setContext] = useContext(Context);
  useEffect(() => {
    setContext({ type: ActionType.Playing, state: { enabled: true } });
  }, []);
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
