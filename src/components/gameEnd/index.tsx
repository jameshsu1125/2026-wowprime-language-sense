import OnloadProvider from 'lesca-react-onload';
import { memo, useEffect, useState } from 'react';
import Button from '../button';
import './index.less';
import useTween from 'lesca-use-tween';

const BG = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0 });
  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 0.8 }, 200);
    }
  }, [transition]);
  return <div className='bg' style={style} />;
});

const Heading = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { delay: 200, duration: 500 });
    }
  }, [transition]);

  return <div className='heading' style={style} />;
});

const Btn = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { delay: 500, duration: 500 });
    }
  }, [transition]);
  return (
    <div className='w-48' style={style}>
      <Button>
        <Button.large>
          <div className='btn-end' />
        </Button.large>
      </Button>
    </div>
  );
});

const GameEnd = memo(() => {
  const [transition, setTransition] = useState(false);

  return (
    <OnloadProvider onload={() => setTransition(true)}>
      <div className='GameEnd'>
        <BG transition={transition} />
        <div className='ctx'>
          <Heading transition={transition} />
          <Btn transition={transition} />
        </div>
      </div>
    </OnloadProvider>
  );
});
export default GameEnd;
