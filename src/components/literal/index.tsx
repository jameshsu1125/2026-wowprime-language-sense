import { IReactProps } from '@/settings/type';
import Click from 'lesca-click';
import { memo, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

type LiteralProps = {
  text: string;
  answer: { index: number; tone: number }[];
  index?: number;
  onComplete: () => void;
};

const Letter = memo(({ children, tone }: IReactProps & { tone?: number }) => {
  const id = useId();
  const [index, setIndex] = useState<number | ''>('');

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setIndex((S) => (S === '' ? 0 : (S + 1) % 4));
    });
    return () => {
      Click.remove(`#${id}`);
    };
  }, [id]);

  return (
    <div>
      <div className='letter'>{children}</div>
      {tone !== undefined && (
        <div id={id} className={twMerge('tone', index !== '' && `tone-${index}`)}></div>
      )}
    </div>
  );
});

const Literal = memo(({ text, answer, index, onComplete }: LiteralProps) => {
  const [currentAnswer, setCurrentAnswer] = useState(
    [...new Array(answer.length).keys()].map((idx) => ({
      idx,
      index: answer[idx].index,
      tone: '',
    })),
  );

  const onChange = (idx, value) => {
    setCurrentAnswer;
  };

  return (
    <div className='Literal'>
      {`${index ? `${index}. ` : ''}`}
      {text.split('').map((char, idx) => (
        <Letter key={idx} tone={answer.find((a) => a.index === idx)?.tone} onChange={onChange}>
          {char}
        </Letter>
      ))}
    </div>
  );
});
export default Literal;
