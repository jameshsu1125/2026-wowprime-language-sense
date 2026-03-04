import { memo, useEffect } from 'react';
import './index.less';

type TRadioProps = {
  text: string;
  options: string[];
  index: number;
};

const Radio = memo(({ text, options, index }: TRadioProps) => {
  useEffect(() => {}, []);
  return (
    <div className='Radio'>
      <span>
        {`${index}.`}
        {text}
      </span>
      <div>
        <div className='radio-group'>
          {options.map((option, idx) => (
            <div key={option}>
              <input
                type='radio'
                id={`option${idx}`}
                name='radio-group'
                defaultChecked={idx === 0}
              />
              <label htmlFor={`option${idx}`}>
                {String.fromCharCode(65 + idx)}.{option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
export default Radio;
