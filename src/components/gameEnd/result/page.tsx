import { IReactProps } from '@/settings/type';
import { memo, useEffect, useState } from 'react';
import Frag from './frag';
import './index.less';
import useTween from 'lesca-use-tween';
import Card from './card';

const Dialog = memo(
  ({ children, transition, onEnd }: IReactProps & { transition: boolean; onEnd: () => void }) => {
    const [style, setStyle] = useTween({ opacity: 0, y: window.innerHeight });

    useEffect(() => {
      if (transition) {
        setStyle({ opacity: 1, y: 0 }, { duration: 600, onEnd });
      }
    }, [transition]);
    return <div style={style}>{children}</div>;
  },
);

const Page = memo(({ transition }: { transition: boolean }) => {
  const [transitionEnd, setTransitionEnd] = useState(false);
  return (
    <Dialog transition={transition} onEnd={() => setTransitionEnd(true)}>
      <div className='frame-bottom' />
      <Card transition={transitionEnd} />
      <Frag />
    </Dialog>
  );
});
export default Page;
