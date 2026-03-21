import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import './index.less';

type TRadioProps = {
  text: string;
  options: { label: string; isAnswer: boolean }[];
  index: number;
};

const Radio = forwardRef(({ text, options, index }: TRadioProps, ref) => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;

  const selectedRef = useRef<string>(options[0].label);

  useImperativeHandle(ref, () => ({
    check() {
      const [currentAnswer] = options
        .map((option, idx) => ({ ...option, idx }))
        .filter((option) => option.isAnswer);
      const currentIndex = currentAnswer?.idx ?? 0;
      document.querySelectorAll('.radio-group input').forEach((input, idx) => {
        if (idx === currentIndex) {
          input.classList.add('correct');
        }
        input.setAttribute('disabled', 'true');
      });
      if (currentAnswer?.label === selectedRef.current) sounds.tracks?.play('correct');
      else sounds.tracks?.play('incorrect');
    },
  }));
  return (
    <div className='Radio'>
      <span>
        {`${index}.`}
        {text}
      </span>
      <div>
        <div className='radio-group'>
          {options.map((option, idx) => (
            <div key={option.label}>
              <input
                type='radio'
                id={`option${idx}`}
                name='radio-group'
                defaultChecked={idx === 0}
                onChange={() => {
                  selectedRef.current = option.label;
                }}
              />
              <label htmlFor={`option${idx}`}>
                {String.fromCharCode(65 + idx)}.{option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
export default Radio;
