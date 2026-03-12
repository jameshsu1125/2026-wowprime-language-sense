import { memo, useContext } from 'react';
import { TaikoContext } from './config';
import { twMerge } from 'tailwind-merge';

const Heart = memo(() => {
  const [state] = useContext(TaikoContext);
  return (
    <div className='life'>
      {[...new Array(3).keys()].map((idx) => {
        return (
          <div key={idx}>
            <div>
              <div>
                <div className={twMerge('heart', idx < state.heart ? '' : 'off')} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
export default Heart;
