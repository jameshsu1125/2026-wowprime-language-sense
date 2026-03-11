import { forwardRef, useImperativeHandle } from 'react';
import './index.less';

type TRadioProps = {
  text: string;
  options: { label: string; isAnswer: boolean }[];
  index: number;
};

const Radio = forwardRef(({ text, options, index }: TRadioProps, ref) => {
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
