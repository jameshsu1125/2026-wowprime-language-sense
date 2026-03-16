import { memo, useContext } from 'react';
import { GameEndContext, GameEndFinalType } from '../config';

const Frag = memo(() => {
  const [state] = useContext(GameEndContext);
  return (
    <div className='flag'>
      <div>
        <div>
          <span>{state.final === GameEndFinalType.card ? '分數揭曉' : '領取獎勵'}</span>
        </div>
      </div>
    </div>
  );
});
export default Frag;
