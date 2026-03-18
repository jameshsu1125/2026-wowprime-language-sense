import { HomeContext, HomePageType, HomeStepType } from '@/pages/home/config';
import { ActionType, IReactProps } from '@/settings/type';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { twMerge } from 'tailwind-merge';
import Menu from '../menu';
import dialog from './img/dialog.svg';
import './index.less';
import Extra from '../extra';
import { Context } from '@/settings/constant';
import MenuList from '../menu/list';
import GameEnd from '../gameEnd';
import UserAgent, { UserAgentType } from 'lesca-user-agent';

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
      if (UserAgent.get() === UserAgentType.Mobile) return;
      window.addEventListener('resize', resize);
    };
    image.src = dialog;
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      className='container-dialog relative z-10 flex items-center justify-center pt-12 pb-12'
      style={
        imageSize.width === 0 ? { width: '100%' } : { ...style, width: `${imageSize.width + 37}px` }
      }
    >
      <img
        ref={imageRef}
        src={dialog}
        className={twMerge(state.page === HomePageType.Unset && 'opacity-0')}
      />
      <div
        className='absolute top-1/2 h-full'
        style={{
          marginTop: `-${imageSize.height / 2 + 40}px`,
          width: `${imageSize.width + 37}px`,
          height: `${imageSize.height + 37}px`,
          display: imageSize.width === 0 ? 'none' : 'block',
        }}
      >
        {children}
      </div>
    </div>
  );
});

const Background = memo(() => {
  const [{ level }] = useContext(HomeContext);

  const [, setStyle] = useTween({ top: 0 });
  const [color, setColor] = useState('#fffff');

  useEffect(() => {
    if (level !== 0) {
      setStyle(
        { top: 10 },
        {
          easing: Bezier.linear,
          duration: 500,
          onUpdate: () => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            setColor(`#${randomColor}`);
          },
          onEnd: () => {
            setColor('#ffffff');
          },
        },
      );
    }
  }, [level]);

  return (
    <div
      className='container-texture flex w-full flex-1 flex-col'
      style={{ backgroundColor: color }}
    >
      <div className='body' />
      <div className='footer'>
        <div className='relative flex w-3xl items-end justify-center'>
          <div className='footer-logo' />
        </div>
      </div>
    </div>
  );
});

const Container = memo(({ children, className }: { className?: string } & IReactProps) => {
  const [context] = useContext(Context);
  const menuState = context[ActionType.Menu]!;
  const {
    isEnd = false,
    openRanking = false,
    openAnnouncement = false,
  } = context[ActionType.Playing]!;

  return (
    <Div100vh className={twMerge('Container w-full min-w-140', className)}>
      <div className='absolute flex h-full w-full min-w-140 flex-col'>
        <div className='bg-primary h-[38vw] w-full md:h-72' />
        <Background />
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
          </div>
          <div className='relative flex h-full w-fit flex-1 justify-center overflow-hidden'>
            <Dialog>{children}</Dialog>
          </div>
        </div>
      </div>
      {(isEnd || openRanking || menuState.enabled || openAnnouncement) && (
        <div className='pointer-events-none absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center'>
          <div className='flex w-full max-w-3xl flex-col items-center justify-start p-[3%] md:p-[0%]'>
            <div className='flex w-full flex-row items-center justify-between pt-0 md:pt-[3%]'>
              <div className='container-logo invisible' />
            </div>
            <div className='container-extra pointer-events-auto relative z-40'>
              <div className='p-7'>{menuState?.enabled && <MenuList />}</div>
            </div>
          </div>
          <div className='pointer-events-auto relative z-30 h-full min-w-screen flex-1'>
            <GameEnd />
          </div>
          <div className='h-12 w-full md:h-10' />
        </div>
      )}
    </Div100vh>
  );
});
export default Container;
