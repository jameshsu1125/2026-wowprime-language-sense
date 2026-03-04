import { memo, useEffect } from 'react';
import './index.less';

const Examiner = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Examiner'>
      <div className='video'>
        <div>
          <div>
            <div className='cover' />
          </div>
        </div>
      </div>
      <div className='frame'>
        <div>
          <div>
            <div className='subtitle' />
            <div className='play-button' />
          </div>
        </div>
      </div>
    </div>
  );
});
export default Examiner;
