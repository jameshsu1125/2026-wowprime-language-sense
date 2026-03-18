import { IReactProps } from '@/settings/type';
import { memo, useContext, useLayoutEffect, useRef, useState } from 'react';
import './index.less';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType } from '@/pages/home/config';

const Contain = memo(({ children, imageURL }: IReactProps & { imageURL: string }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  const [state] = useContext(HomeContext);

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

    image.onload = () => {
      resize();
      window.addEventListener('resize', resize);
    };
    image.src = imageURL;

    return () => window.removeEventListener('resize', resize);
  }, []);
  return (
    <div className='Contain' ref={frameRef}>
      <div
        className={twMerge('frame', state.page === HomePageType.Unset && 'opacity-0')}
        style={{
          width: `${frame.width}px`,
          height: `${frame.height}px`,
          backgroundImage: `url(${imageURL})`,
        }}
      >
        {children}
      </div>
    </div>
  );
});
export default Contain;
