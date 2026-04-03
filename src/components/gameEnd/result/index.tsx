import { memo, useRef } from 'react';
import './index.less';
import Page from './page';

const EndResult = memo(() => {
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div className='EndResult' ref={frameRef}>
      <div className='frame'>
        <div>
          <Page />
        </div>
      </div>
    </div>
  );
});
export default EndResult;
