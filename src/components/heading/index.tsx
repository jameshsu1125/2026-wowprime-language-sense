import { IReactProps } from '@/settings/type';
import { memo, useEffect } from 'react';
import './index.less';

const Heading = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return (
    <div className='Heading'>
      <div>
        <div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
});
export default Heading;
