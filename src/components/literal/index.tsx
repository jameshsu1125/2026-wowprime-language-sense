import { TonesContext } from '@/pages/game/tones/config';
import { IReactProps } from '@/settings/type';
import { isEqual } from 'lodash';
import {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

type LiteralProps = {
  text: string;
  answer: { index: number; tone: number }[];
  onComplete: () => void;
};

type LetterProps = IReactProps & {
  tone: number;
  idx: number;
  onChange?: (idx: number, value: number) => void;
  shouldCheck: boolean;
};

const Letter = memo(({ children, tone, idx, onChange, shouldCheck }: LetterProps) => {
  const id = useId();
  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    onChange?.(idx, index);
  }, [index]);

  const incorrect = useMemo(() => {
    if (shouldCheck) {
      if (tone === -1) return false;
      return tone !== index;
    }
    return false;
  }, [shouldCheck]);

  return (
    <div>
      <div className='letter'>{children}</div>
      {tone >= 0 && (
        <div
          id={id}
          className={twMerge('tone', index >= 0 && `tone-${index}`, incorrect && 'tone-incorrect')}
        >
          <div className='absolute top-0 right-0 bottom-0 left-0'>
            <select
              className='h-full w-full opacity-0'
              onChange={(e) => {
                setIndex(Number(e.target.value));
              }}
              disabled={shouldCheck}
            >
              {['請選擇', '-(一聲)', 'ˊ(二聲)', 'ˇ(三聲)', 'ˋ(四聲)', '˙(輕聲)'].map((txt, idx) => (
                <option key={txt} value={idx} disabled={txt === '請選擇'}>
                  {txt}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
});

const Literal = forwardRef(({ text, answer, onComplete }: LiteralProps, ref) => {
  const [state] = useContext(TonesContext);
  const [shouldCheck, setShouldCheck] = useState(false);

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

  useImperativeHandle(ref, () => ({
    check() {
      setShouldCheck(true);
    },
  }));

  return (
    <div className='Literal'>
      {`${state.index + 1}.`}
      {text.split('').map((char, idx) => (
        <Letter
          key={idx}
          idx={idx}
          tone={answer.find((a) => a.index === idx)?.tone ?? -1}
          onChange={onChange}
          shouldCheck={shouldCheck}
        >
          {char}
        </Letter>
      ))}
    </div>
  );
});
export default Literal;
