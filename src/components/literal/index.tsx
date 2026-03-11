import { IReactProps } from '@/settings/type';
import Click from 'lesca-click';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { isEqual } from 'lodash';
import './index.less';
import { TonesContext } from '@/pages/game/tones/config';

type LiteralProps = {
  text: string;
  answer: { index: number; tone: number }[];
  onComplete: () => void;
};

type LetterProps = IReactProps & {
  tone: number;
  idx: number;
  onChange?: (idx: number, value: number) => void;
};

const Letter = memo(({ children, tone, idx, onChange }: LetterProps) => {
  const id = useId();
  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setIndex((S) => (S < 0 ? 0 : (S + 1) % 5));
    });
    return () => {
      Click.remove(`#${id}`);
    };
  }, [id]);

  useEffect(() => {
    onChange?.(idx, index);
  }, [index]);

  return (
    <div>
      <div className='letter'>{children}</div>
      {tone >= 0 && <div id={id} className={twMerge('tone', index >= 0 && `tone-${index}`)}></div>}
    </div>
  );
});

const Literal = memo(({ text, answer, onComplete }: LiteralProps) => {
  const [state] = useContext(TonesContext);
  const [currentAnswer, setCurrentAnswer] = useState(
    [...new Array(answer.length).keys()].map((idx) => ({
      idx,
      index: answer[idx].index,
      tone: -1,
    })),
  );

  const onChange = (idx: number, value: number) => {
    setCurrentAnswer((S) => S.map((a) => (a.index === idx ? { ...a, tone: value } : a)));
  };

  useEffect(() => {
    const removeIdxAnswer = currentAnswer.map((a) => ({ index: a.index, tone: a.tone }));
    if (isEqual(answer, removeIdxAnswer)) {
      onComplete();
    }
  }, [answer, currentAnswer]);

  return (
    <div className='Literal'>
      {`${state.index + 1}.`}
      {text.split('').map((char, idx) => (
        <Letter
          key={idx}
          idx={idx}
          tone={answer.find((a) => a.index === idx)?.tone ?? -1}
          onChange={onChange}
        >
          {char}
        </Letter>
      ))}
    </div>
  );
});
export default Literal;
