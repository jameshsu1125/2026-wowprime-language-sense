import { memo, useContext, useEffect } from 'react';
import { GameEndContext, GameEndFinalType } from '../config';
import useTween from 'lesca-use-tween';

const Frag = memo(() => {
  const [state] = useContext(GameEndContext);
  const [style, setStyle] = useTween({ opacity: 0, y: -50 });

  useEffect(() => {
    if (state.final === GameEndFinalType.award) {
      setStyle({ opacity: 1, y: 0 }, 400);
    }
  }, [state.final]);

  return (
    <div className='flag' style={style}>
      <div>
        <div>
          <span>領取獎勵</span>
        </div>
      </div>
    </div>
  );
});
export default Frag;
