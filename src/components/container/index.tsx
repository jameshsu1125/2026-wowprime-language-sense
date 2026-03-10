import { IReactProps } from '@/settings/type';
import { memo, useEffect, useRef, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { twMerge } from 'tailwind-merge';
import dialog from './img/dialog.svg';
import './index.less';

const Container = memo(({ children, className }: { className?: string } & IReactProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSize, setImageSize] = useState(0);
  useEffect(() => {
    const resize = () => {
      requestAnimationFrame(() => {
        if (imageRef.current) {
          const { height } = imageRef.current.getBoundingClientRect();
          setImageSize(height);
        }
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return (
    <Div100vh className={twMerge('Container w-full', className)}>
      <div className='absolute flex h-full w-full flex-col'>
        <div className='bg-primary h-[38vw] w-full md:h-72' />
        <div className='container-texture flex w-full flex-1 flex-col bg-white'>
          <div className='body' />
          <div className='footer' />
        </div>
      </div>
      <div className='relative flex h-full w-full justify-center'>
        <div className='flex w-full max-w-3xl flex-col items-center justify-start p-[3%] md:p-[0%]'>
          <div className='flex w-full flex-row items-center justify-start pt-0 md:pt-[3%]'>
            <div className='container-logo' />
            <div className='container-options'>{/** options */}</div>
          </div>
          <div className='container-extra'>{/* extra */}</div>
          <div className='flex h-full w-full flex-1 justify-center overflow-hidden'>
            <div className='container-dialog relative flex items-center justify-center px-5 pt-5 pb-10'>
              <img ref={imageRef} src={dialog} />
              <div
                className='absolute top-1/2 h-full w-full'
                style={{ marginTop: `-${imageSize / 2 + 40}px` }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div100vh>
  );
});
export default Container;
