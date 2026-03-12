import useTween from 'lesca-use-tween';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './telegraphing.less';

interface TextProps {
  type: 'miss' | 'score';
  index: number;
  onEnd: (idx: number) => void;
  score?: number;
}

const Text = memo<TextProps>(({ type, onEnd, index, score }) => {
  const [style, setStyle] = useTween({ opacity: 1, y: 0 });
  useEffect(() => {
    setStyle({ opacity: 0, y: -50 }, { duration: 800, onEnd: () => onEnd(index) });
  }, []);

  return (
    <div
      style={style}
      className={twMerge(
        'absolute top-0 left-0 font-black',
        type === 'miss' ? 'text-xl text-black' : 'text-primary text-3xl',
      )}
    >
      {type === 'miss' ? 'Miss' : `+${score}`}
    </div>
  );
});

const Telegraphing = forwardRef((_, ref) => {
  useEffect(() => {}, []);

  const [data, setData] = useState<{ index: number; type: 'miss' | 'score'; score?: number }[]>([]);
  const indexRef = useRef(0);

  useImperativeHandle(ref, () => ({
    miss: () => {
      setData((data) => [...data, { index: (indexRef.current += 1), type: 'miss' }]);
    },
    score: (score: number) => {
      setData((data) => [...data, { index: (indexRef.current += 1), type: 'score', score }]);
    },
  }));

  const onEnd = (idx: number) => {
    setData((data) => data.filter((d) => d.index !== idx));
  };

  return (
    <div className='Telegraphing'>
      {data.map((item) => (
        <Text
          key={item.index}
          index={item.index}
          type={item.type}
          onEnd={onEnd}
          score={item.score}
        />
      ))}
    </div>
  );
});
export default Telegraphing;
