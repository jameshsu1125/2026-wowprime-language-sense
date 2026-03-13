import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useEffect, useState } from 'react';
import End from './end';
import './index.less';

const BG = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0 });
  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 0.8 }, 200);
    }
  }, [transition]);
  return <div className='bg' style={style} />;
});

const GameEnd = memo(() => {
  const [transition, setTransition] = useState(false);

  return (
    <OnloadProvider onload={() => setTransition(true)}>
      <div className='GameEnd'>
        <BG transition={transition} />
        <div className='ctx'>
          <End transition={transition} />
        </div>
      </div>
    </OnloadProvider>
  );
});
export default GameEnd;
