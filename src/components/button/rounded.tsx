import { memo, useEffect } from 'react';
import { IReactProps } from '@/settings/type';

const Rounded = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return <div className='btn-rounded'>{children}</div>;
});
export default Rounded;
