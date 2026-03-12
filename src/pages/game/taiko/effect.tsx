import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useEffect } from 'react';

type EffectProps = {
  onEnd: (idx: number) => void;
  clickIndex: number;
  type: string;
};

const Effect = memo(({ onEnd, clickIndex, type }: EffectProps) => {
  const [style, setStyle] = useTween({ scale: 0, opacity: 1 });
  useEffect(() => {
    setStyle(
      { opacity: 0, scale: type === 'circle' ? 3 : 3.5 },
      {
        duration: 600,
        onEnd: () => onEnd(clickIndex),
        easing: type === 'circle' ? Bezier.outQuart : Bezier.outBack,
      },
    );
  }, []);
  return <div style={style} className={type} />;
});

export default Effect;
