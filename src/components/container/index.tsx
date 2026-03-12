import { HomeContext, HomeStepType } from '@/pages/home/config';
import { ActionType, IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { twMerge } from 'tailwind-merge';
import Menu from '../menu';
import dialog from './img/dialog.svg';
import './index.less';
import Extra from '../extra';
import { Context } from '@/settings/constant';
import MenuList from '../menu/list';

const Dialog = memo(({ children }: IReactProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [style, setStyle] = useTween({ y: window.innerHeight });
  const [state] = useContext(HomeContext);

  useEffect(() => {
    if (state.step === HomeStepType.loaded) setStyle({ y: 0 }, 500);
  }, [state.step]);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resize = () => {
      const getSize = () => {
        if (imageRef.current) {
          const { height, width } = imageRef.current.getBoundingClientRect();
          if (height !== 0) {
            setImageSize({ width, height });
          } else requestAnimationFrame(() => getSize());
        } else requestAnimationFrame(() => getSize());
      };
      setImageSize({ width: 0, height: 0 });
      requestAnimationFrame(() => getSize());
    };

    const image = new Image();
    image.onload = () => {
      resize();
      window.addEventListener('resize', resize);
    };
    image.src = dialog;
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      className='container-dialog relative z-10 flex items-center justify-center pt-5 pb-12'
      style={
        imageSize.width === 0 ? { width: '100%' } : { ...style, width: `${imageSize.width + 37}px` }
      }
    >
      <img ref={imageRef} src={dialog} />
      <div
        className='absolute top-1/2 h-full'
        style={{
          marginTop: `-${imageSize.height / 2 + 40}px`,
          width: `${imageSize.width + 37}px`,
          display: imageSize.width === 0 ? 'none' : 'block',
        }}
      >
        {children}
      </div>
    </div>
  );
});

const Container = memo(({ children, className }: { className?: string } & IReactProps) => {
  const [context] = useContext(Context);
  const menuState = context[ActionType.Menu]!;

  return (
    <Div100vh className={twMerge('Container w-full min-w-140', className)}>
      <div className='absolute flex h-full w-full flex-col'>
        <div className='bg-primary h-[38vw] w-full md:h-72' />
        <div className='container-texture flex w-full flex-1 flex-col bg-white'>
          <div className='body' />
          <div className='footer'>
            <div />
          </div>
        </div>
      </div>
      <div className='relative flex h-full w-full justify-center'>
        <div className='flex w-full max-w-3xl flex-col items-center justify-start p-[3%] md:p-[0%]'>
          <div className='flex w-full flex-row items-center justify-between pt-0 md:pt-[3%]'>
            <div className='container-logo' />
            <div className='container-options'>
              <Menu />
            </div>
          </div>
          <div className='container-extra relative z-20'>
            <Extra />
            {menuState?.enabled && <MenuList />}
          </div>
          <div className='relative flex h-full w-fit flex-1 justify-center overflow-hidden'>
            <Dialog>{children}</Dialog>
          </div>
        </div>
      </div>
    </Div100vh>
  );
});
export default Container;
