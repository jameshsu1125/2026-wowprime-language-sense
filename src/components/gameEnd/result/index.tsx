import OnloadProvider from 'lesca-react-onload';
import { memo, useRef, useState } from 'react';
import './index.less';
import Page from './page';

const EndResult = memo(() => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [transition, setTransition] = useState(false);

  return (
    <div className='EndResult' ref={frameRef}>
      <div className='frame'>
        <OnloadProvider onload={() => setTransition(true)}>
          <div>
            <Page transition={transition} />
          </div>
        </OnloadProvider>
      </div>
    </div>
  );
});
export default EndResult;
