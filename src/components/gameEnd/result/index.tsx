import OnloadProvider from 'lesca-react-onload';
import { memo, useLayoutEffect, useRef, useState } from 'react';
import frameURL from './img/frame.svg';
import './index.less';
import Page from './page';

const EndResult = memo(() => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  const [transition, setTransition] = useState(false);

  useLayoutEffect(() => {
    const image = new Image();
    const resize = () => {
      const getSize = () => {
        if (frameRef.current) {
          const { height: frameHeight, width: frameWidth } =
            frameRef.current.getBoundingClientRect();
          if (frameHeight !== 0) {
            const currentFrameHeight = frameHeight - 32;
            const { width, height } = image;
            const ratio = height / width;
            const frameRatio = currentFrameHeight / frameWidth;
            if (ratio > frameRatio) {
              const currentFrameWidth = currentFrameHeight / ratio;
              setFrameWidth(currentFrameWidth);
            } else {
              setFrameWidth(frameWidth);
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
    image.src = frameURL;

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className='EndResult' ref={frameRef}>
      <div className='frame' style={{ width: `${frameWidth}px` }}>
        <OnloadProvider onload={() => setTransition(true)}>
          <div>
            <Page transition={transition} />
          </div>
        </OnloadProvider>
      </div>
    </div>
  );
});
export default EndResult;
