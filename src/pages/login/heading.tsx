import { IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useEffect } from 'react';

const Heading = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { duration: 400 });
    }
  }, [transition]);
  return <div className='heading pb-2' style={style} />;
});
export default Heading;

export const Notice = memo(
  ({ children, transition, delay }: IReactProps & { transition: boolean; delay: number }) => {
    const [style, setStyle] = useTween({ opacity: 0, y: 50 });
    useEffect(() => {
      if (transition) {
        setStyle({ opacity: 1, y: 0 }, { duration: 400, delay });
      }
    }, [transition]);
    return <p style={style}>{children}</p>;
  },
);
