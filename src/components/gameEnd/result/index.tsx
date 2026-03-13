import { memo, useLayoutEffect, useRef, useState } from 'react';
import frameURL from './img/frame.svg';
import './index.less';

const EndResult = memo(() => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState(0);

  useLayoutEffect(() => {
    const image = new Image();

    const resize = () => {
      const getSize = () => {
        if (frameRef.current) {
          const { height: frameHeight } = frameRef.current.getBoundingClientRect();
          if (frameHeight !== 0) {
            const { width, height } = image;
            const ratio = height / width;
            const currentFrameWidth = frameHeight / ratio;
            setFrameWidth(currentFrameWidth);
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
    <div className='EndResult'>
      <div ref={frameRef} className='frame' style={{ width: `${frameWidth}px` }}>
        <div className='flag'>
          <div>
            <div>
              <span>分數揭曉</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default EndResult;
