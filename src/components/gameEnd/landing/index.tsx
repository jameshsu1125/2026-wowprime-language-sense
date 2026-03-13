import useDown from '@/hooks/useDown';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import Button from '../../button';
import OnloadProvider from 'lesca-react-onload';
import './index.less';

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
  const [context] = useContext(Context);
  const { score = 0 } = context[ActionType.Playing]!;
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  const [downRes, sendScore] = useDown();

  useEffect(() => {
    if (downRes) {
      if (downRes.status === 'success') {
        console.log(downRes);
      } else {
        alert(downRes.message);
      }
    }
  }, [downRes]);

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { delay: 500, duration: 500 });
    }
  }, [transition]);
  return (
    <div className='w-48' style={style}>
      <Button
        onClick={() => {
          sendScore({ score });
        }}
      >
        <Button.large>
          <div className='btn-end' />
        </Button.large>
      </Button>
    </div>
  );
});

const EndLanding = memo(() => {
  const [transition, setTransition] = useState(false);
  return (
    <OnloadProvider onload={() => setTransition(true)}>
      <div className='EndLanding'>
        <Heading transition={transition} />
        <Btn transition={transition} />
      </div>
    </OnloadProvider>
  );
});
export default EndLanding;
