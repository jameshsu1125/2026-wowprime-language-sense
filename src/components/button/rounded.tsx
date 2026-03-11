import { IReactProps } from '@/settings/type';
import { memo } from 'react';

const Rounded = memo(({ children }: IReactProps) => <div className='btn-rounded'>{children}</div>);
export default Rounded;
