import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import Div100vh from 'react-div-100vh';
import { twMerge } from 'tailwind-merge';
import './index.less';

const Container = memo(({ children, className }: { className?: string } & IReactProps) => {
  return (
    <Div100vh className={twMerge('Container w-full', className)}>
      <div className='absolute flex h-full w-full flex-col'>
        <div className='bg-primary xs:h-32 h-24 w-full sm:h-44 md:h-60' />
        <div className='texture flex w-full flex-1 flex-col bg-white'>
          <div className='body' />
          <div className='footer' />
        </div>
      </div>
      <div className='relative flex h-full w-full justify-center'>
        <div className='flex w-full max-w-3xl flex-col items-center justify-start p-2 md:p-4'>
          <div className='flex w-full flex-row items-center justify-start'>
            <div className='logo' />
            <div className='options'>{/** options */}</div>
          </div>
          <div className='w-full'>{children}</div>
        </div>
      </div>
    </Div100vh>
  );
});
export default Container;
