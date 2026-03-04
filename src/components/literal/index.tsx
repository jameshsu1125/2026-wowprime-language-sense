import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import './index.less';

type LiteralProps = {
  text: string;
  answer: { index: number; tone: number }[];
  index?: number;
};

const Letter = memo(({ children, tone }: IReactProps & { tone?: number }) => {
  return (
    <div>
      <div className='letter'>{children}</div>
      {tone !== undefined && (
        <div className='tone'>
          {tone === 0
            ? '˙'
            : tone === 1
              ? 'ˉ'
              : tone === 2
                ? 'ˊ'
                : tone === 3
                  ? 'ˇ'
                  : tone === 4
                    ? 'ˋ'
                    : ''}
        </div>
      )}
    </div>
  );
});

const Literal = memo(({ text, answer, index }: LiteralProps) => (
  <div className='Literal'>
    {`${index ? `${index}. ` : ''}`}
    {text.split('').map((char, idx) => (
      <Letter key={idx} tone={answer.find((a) => a.index === idx)?.tone}>
        {char}
      </Letter>
    ))}
  </div>
));
export default Literal;
