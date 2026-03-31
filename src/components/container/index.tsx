import { ResetContext } from '@/pages/config';
import { HomeContext, HomePageType } from '@/pages/home/config';
import { MINI_HEIGHT } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { twMerge } from 'tailwind-merge';
import Contain from '../contain';
import Extra from '../extra';
import GameEnd from '../gameEnd';
import Menu from '../menu';
import MenuList from '../menu/list';
import imageURL from './img/dialog.svg';
import './index.less';

const Background = memo(() => {
  const [{ level }] = useContext(HomeContext);
  const levelRef = useRef(level);

  const [, setStyle] = useTween({ top: 0 });
  const [color, setColor] = useState('#fffff');

  useEffect(() => {
    if (level !== 0 && level > levelRef.current) {
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
    levelRef.current = level;
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
  const [, setReset] = useContext(ResetContext);
  const [state] = useContext(HomeContext);
  const ref = useRef<HTMLDivElement>(null);
  const [context] = useContext(Context);
  const menuState = context[ActionType.Menu]!;
  const {
    isEnd = false,
    openRanking = false,
    openAnnouncement = false,
    openMyAward = false,
  } = context[ActionType.Playing]!;

  useEffect(() => {
    Click.add('#logo', () => setReset((S) => ({ ...S, index: S.index + 1, navto: 'home' })));
    const resize = () => {
      if (ref.current) {
        const { height } = ref.current.getBoundingClientRect();
        const currentHeight = window.innerWidth <= 576 ? MINI_HEIGHT.mobile : MINI_HEIGHT.desktop;
        if (height <= currentHeight) Click.setPreventDefault(false);
        else Click.setPreventDefault(true);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Div100vh className={twMerge('Container', className)}>
      <div ref={ref} className='absolute flex h-full w-full flex-col'>
        <div className='bg-primary h-[38vw] w-full md:h-72' />
        <Background />
      </div>
      <div className='pointer-events-none absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center'>
        <div className='flex w-full max-w-xl flex-col items-center justify-start p-[3%] md:p-[0%]'>
          <div className='flex w-full flex-row items-center justify-between pt-0 md:pt-[3%]'>
            <div id='logo' className='container-logo pointer-events-auto cursor-pointer' />
            <div className='container-options pointer-events-auto'>
              <Menu />
            </div>
          </div>
          <div className='container-extra pointer-events-none relative z-40 h-15'>
            <Extra />
          </div>
        </div>
        <div className='container-dialog pointer-events-auto relative w-full'>
          <Contain imageURL={imageURL} hidden={state.page === HomePageType.Unset} isMoreInfo={true}>
            {children}
          </Contain>
        </div>
        <div className='h-12 w-full' />
      </div>
      {(isEnd || openRanking || menuState.enabled || openAnnouncement || openMyAward) && (
        <div className='pointer-events-none absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center'>
          <div className='flex w-full max-w-xl flex-col items-center justify-start'>
            <div className='flex w-full flex-row items-center justify-between pt-0 md:pt-[3%]'>
              <div className='container-logo invisible' />
            </div>
            <div className='container-extra pointer-events-auto relative z-40 h-0'>
              {menuState?.enabled && <MenuList />}
            </div>
          </div>
          <div className='container-dialog2 pointer-events-auto relative z-30 w-full'>
            <GameEnd />
          </div>
          <div className='h-12 w-full md:h-10' />
        </div>
      )}
    </Div100vh>
  );
});
export default Container;
