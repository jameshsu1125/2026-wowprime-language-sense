import Button from '@/components/button';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { HomeContext, HomePageType } from '../home/config';
import videoURL from './vid/video-cover.mp4';
import './index.less';

const Examiner = memo(() => {
  const ref = useRef<HTMLVideoElement>(null);
  const [, setState] = useContext(HomeContext);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    const videoElement = ref.current;
    if (videoElement) {
      videoElement.onplay = () => {
        setIsPlay(true);
      };
      videoElement.onpause = () => {
        setIsPlay(false);
      };
      videoElement.onended = () => {
        setIsPlay(false);
        if (videoElement) videoElement.currentTime = 0;
      };
    }
    return () => {
      if (videoElement) videoElement.pause();
    };
  }, []);

  return (
    <div className='Examiner'>
      <div className='video'>
        <div>
          <div>
            <div className='cover'>
              <div className='video-player'>
                <video ref={ref} className='h-full w-full' playsInline>
                  <source src={videoURL} type='video/mp4' />
                </video>
              </div>
              {!isPlay && (
                <button
                  className='play-button'
                  onClick={() => {
                    if (ref.current) {
                      ref.current.play();
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='frame'>
        <div>
          <div>
            <div className='subtitle' />
            <div className='flex w-full flex-1 justify-end'>
              <div className='w-8/12'>
                <Button
                  onClick={() => {
                    setState((S) => ({ ...S, page: HomePageType.Login }));
                  }}
                >
                  <Button.rounded>
                    <div className='btn-next'>
                      <div />
                    </div>
                  </Button.rounded>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Examiner;
