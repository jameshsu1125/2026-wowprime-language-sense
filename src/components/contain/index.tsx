import { CONTAIN_RATIO } from '@/settings/config';
import { ActionType, IReactProps, TransitionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import { HomeContext, HomePageType } from '@/pages/home/config';
import { Context } from '@/settings/constant';
import MoreInfo from './moreInfo';

type ContainProps = IReactProps & {
  imageURL: string;
  hidden?: boolean;
  IsHiddenDialogImage?: boolean;
  isMoreInfo?: boolean;
};

const Contain = memo(
  ({
    children,
    imageURL,
    hidden,
    IsHiddenDialogImage = false,
    isMoreInfo = false,
  }: ContainProps) => {
    const [context] = useContext(Context);
    const { openRanking, openAnnouncement, openMyAward } = context[ActionType.Playing]!;
    const [state] = useContext(HomeContext);
    const pageRef = useRef<HomePageType>(state.page);

    const frameRef = useRef<HTMLDivElement>(null);
    const [frame, setFrame] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);

    const [transition, setTransition] = useState(TransitionType.Unset);
    const [style, setStyle] = useTween({ y: window.innerHeight, scale: 1 });

    useEffect(() => {
      pageRef.current = state.page;
    }, [state.page]);

    useEffect(() => {
      if (transition === TransitionType.FadeIn) {
        if (state.page === HomePageType.Examiner || state.page === HomePageType.Login) {
          if (openRanking || openAnnouncement || openMyAward) {
            setStyle({ y: 0, scale: 1 }, { duration: 500 });
          } else {
            setStyle({ y: -60, scale: 0.92 }, { duration: 500 });
          }
        } else setStyle({ y: 0, scale: 1 }, { duration: 500 });
      }
    }, [transition, state, openRanking, openAnnouncement, openMyAward]);

    useLayoutEffect(() => {
      const image = new Image();
      const resize = () => {
        const getSize = () => {
          if (frameRef.current) {
            const { height: frameHeight, width: frameWidth } =
              frameRef.current.getBoundingClientRect();
            if (frameHeight !== 0) {
              const { width, height } = image;
              const currentFrameHeight = frameHeight;
              const ratio = height / width;
              const frameRatio = currentFrameHeight / frameWidth;
              if (pageRef.current) {
                if (pageRef.current === HomePageType.Login) {
                  requestAnimationFrame(() => getSize());
                  return;
                }
              }
              if (ratio > frameRatio) {
                setFrame({ width: frameHeight / ratio, height: frameHeight });
                setScale(frameHeight / ratio / CONTAIN_RATIO.width);
              } else {
                setFrame({ width: frameWidth, height: frameWidth * ratio });
                setScale((frameWidth * ratio) / CONTAIN_RATIO.height);
              }
            } else requestAnimationFrame(() => getSize());
          } else requestAnimationFrame(() => getSize());
        };
        requestAnimationFrame(() => getSize());
      };

      image.onload = () => {
        resize();
        window.addEventListener('resize', resize);
      };
      image.src = imageURL;

      return () => window.removeEventListener('resize', resize);
    }, []);

    return (
      <div className='Contain' ref={frameRef}>
        {isMoreInfo && <MoreInfo scale={scale} />}
        <OnloadProvider onload={() => setTransition(TransitionType.FadeIn)}>
          <div
            className={twMerge('frame', hidden && 'opacity-0')}
            style={{
              ...style,
              width: `${frame.width}px`,
              height: `${frame.height}px`,
            }}
          >
            <div
              className='absolute top-1/2 left-1/2 h-197.5 w-120 bg-contain bg-center bg-no-repeat'
              style={{
                backgroundImage: IsHiddenDialogImage ? undefined : `url(${imageURL})`,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }}
            >
              {children}
            </div>
          </div>
        </OnloadProvider>
      </div>
    );
  },
);
export default Contain;
