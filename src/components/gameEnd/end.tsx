import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import Button from '../button';

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

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { delay: 500, duration: 500 });
    }
  }, [transition]);
  return (
    <div className='w-48' style={style}>
      <Button
        onClick={() => {
          console.log(score);
        }}
      >
        <Button.large>
          <div className='btn-end' />
        </Button.large>
      </Button>
    </div>
  );
});

const End = memo(({ transition }: { transition: boolean }) => {
  useEffect(() => {}, []);
  return (
    <>
      <Heading transition={transition} />
      <Btn transition={transition} />
    </>
  );
});
export default End;
