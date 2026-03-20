import { HomeContext, HomePageType } from '@/pages/home/config';
import { IReactProps, TransitionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

const Contain = memo(({ children, imageURL }: IReactProps & { imageURL: string }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  const [state] = useContext(HomeContext);

  const [transition, setTransition] = useState(TransitionType.Unset);
  const [style, setStyle] = useTween({ y: window.innerHeight });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) setStyle({ y: 0 }, { duration: 500 });
  }, [transition]);

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
            if (ratio > frameRatio) {
              setFrame({ width: frameHeight / ratio, height: frameHeight });
            } else {
              setFrame({ width: frameWidth, height: frameWidth * ratio });
            }
          } else requestAnimationFrame(() => getSize());
        } else requestAnimationFrame(() => getSize());
      };
      requestAnimationFrame(() => getSize());
    };

    const resizeOnMobile = () => {
      if (frameRef.current) {
        const { height: frameHeight, width: frameWidth } = frameRef.current.getBoundingClientRect();
        if (frameWidth > 577) {
          if (frameHeight !== 0) {
            const { width, height } = image;
            const currentFrameHeight = frameHeight;
            const ratio = height / width;
            const frameRatio = currentFrameHeight / frameWidth;
            if (ratio > frameRatio) {
              setFrame({ width: frameHeight / ratio, height: frameHeight });
            } else {
              setFrame({ width: frameWidth, height: frameWidth * ratio });
            }
          } else requestAnimationFrame(() => resizeOnMobile());
        }
      } else requestAnimationFrame(() => resizeOnMobile());
    };

    image.onload = () => {
      resize();
      window.addEventListener('resize', resizeOnMobile);
    };
    image.src = imageURL;

    return () => window.removeEventListener('resize', resizeOnMobile);
  }, []);
  return (
    <div className='Contain' ref={frameRef}>
      <OnloadProvider onload={() => setTransition(TransitionType.FadeIn)}>
        <div
          className={twMerge('frame', state.page === HomePageType.Unset && 'opacity-0')}
          style={{
            ...style,
            width: `${frame.width}px`,
            height: `${frame.height}px`,
            backgroundImage: `url(${imageURL})`,
          }}
        >
          {children}
        </div>
      </OnloadProvider>
    </div>
  );
});
export default Contain;
