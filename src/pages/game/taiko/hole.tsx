import { IReactProps } from '@/settings/type';
import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { forwardRef, JSX, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import Effect from './effect';
import './index.less';

const HoleClick = forwardRef(({ id, children }: IReactProps & { id: string }, ref) => {
  const [style, setStyle] = useTween({ opacity: 1, scale: 1 });
  useImperativeHandle(ref, () => ({
    click: (isMiss: boolean) => {
      setStyle(
        { opacity: isMiss ? 0 : 1, scale: isMiss ? 0 : 0.8 },
        {
          duration: 200,
          onEnd: () => {
            setStyle({ opacity: 1, scale: 1 }, { duration: 50 });
          },
        },
      );
    },
  }));
  return (
    <div id={id} className='hole'>
      <div className='dot' style={style} />
      {children}
    </div>
  );
});

type HoleProps = {
  onClick: (direct: 'left' | 'middle' | 'right') => void;
  direct: 'left' | 'middle' | 'right';
};

const Hole = forwardRef(({ onClick, direct }: HoleProps, ref) => {
  const holeRef = useRef<{ click: (e: boolean) => void }>(null);
  const id = useId();
  const [clickIndex, setClickIndex] = useState(0);
  const [effects, setEffects] = useState<{ element: JSX.Element; index: number }[]>([]);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setClickIndex((index) => index + 1);
      onClick(direct);
    });
    return () => {
      Click.remove(`#${id}`);
    };
  }, [id]);

  const onEnd = (idx: number) => {
    setEffects((effects) => {
      return effects.filter((effect) => {
        return effect.index !== idx;
      });
    });
  };

  useEffect(() => {
    if (clickIndex > 0) {
      const element = [
        {
          element: (
            <Effect
              key={`effect-${clickIndex}-${Math.random()}`}
              onEnd={onEnd}
              clickIndex={clickIndex}
              type='circle'
            />
          ),
          index: clickIndex,
        },
      ];
      // holeRef.current?.click(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEffects((effects) => [...effects, ...element]);
    }
  }, [clickIndex]);

  useImperativeHandle(ref, () => ({
    get: () => {
      const element = {
        element: (
          <Effect
            key={`effect-${clickIndex}-${Math.random()}`}
            onEnd={onEnd}
            clickIndex={clickIndex + 9999}
            type='grow'
          />
        ),
        index: clickIndex + 9999,
      };
      setEffects((effects) => [...effects, element]);
      holeRef.current?.click(true);
    },
  }));

  return (
    <HoleClick ref={holeRef} id={id}>
      {effects.map((effect) => effect.element)}
    </HoleClick>
  );
});

export default Hole;
