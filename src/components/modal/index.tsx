import { memo, useEffect } from 'react';
import './index.less';

const Modal = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Modal'>
      <div className='dialog'>
        <div className='relative min-h-44 min-w-80 p-4'>
          <div className='bg-primary h-full w-full'>asd</div>
        </div>
      </div>
    </div>
  );
});
export default Modal;
