import { IReactProps } from '@/settings/type';
import { memo } from 'react';

const Skip = memo(({ children }: IReactProps) => <div className='btn-skip'>{children}</div>);
export default Skip;
