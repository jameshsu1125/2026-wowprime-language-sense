import { memo, useEffect } from 'react';

const Frag = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='flag'>
      <div>
        <div>
          <span>分數揭曉</span>
        </div>
      </div>
    </div>
  );
});
export default Frag;
