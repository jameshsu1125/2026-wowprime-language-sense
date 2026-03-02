import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import Div100vh from 'react-div-100vh';
import { twMerge } from 'tailwind-merge';
import './index.less';

const Container = memo(({ children, className }: { className?: string } & IReactProps) => {
  return (
    <Div100vh className={twMerge('Container w-full', className)}>
      <div className='absolute flex h-full w-full flex-col'>
        <div className='bg-primary h-44 w-full' />
        <div className='flex w-full flex-1 flex-col bg-white'>
          <div className='body' />
          <div className='footer' />
        </div>
      </div>
      <div className='relative flex h-full w-full justify-center'>
        <div className='w-full max-w-3xl'>{children}</div>
      </div>
    </Div100vh>
  );
});
export default Container;
