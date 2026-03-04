import { IReactProps } from '@/settings/type';
import { memo } from 'react';

const Large = memo(({ children }: IReactProps) => (
  <div className='btn-large pointer-events-none'>
    <div>{children}</div>
  </div>
));
export default Large;
