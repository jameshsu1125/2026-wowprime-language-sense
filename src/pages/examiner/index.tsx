import Button from '@/components/button';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { HomeContext, HomePageType } from '../home/config';
import './index.less';
import videoURL from './vid/video-cover.mp4';

const NextButton = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, x: -50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, x: 0 }, { duration: 500, delay: 500, easing: Bezier.outBack });
    }
  }, [transition]);

  const [, setState] = useContext(HomeContext);
  return (
    <div className='w-8/12' style={style}>
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
  );
});

const Frame = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500, easing: Bezier.outBack });
    }
  }, [transition]);

  return (
    <div className='frame' style={style}>
      <div>
        <div>
          <div className='subtitle' />
          <div className='flex w-full flex-1 justify-end'>
            <NextButton transition={transition} />
          </div>
        </div>
      </div>
    </div>
  );
});

const Examiner = memo(() => {
  const [, setContext] = useContext(Context);
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
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
    <OnloadProvider
      onload={() => {
        requestAnimationFrame(() => {
          setTransition(true);
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        });
      }}
    >
      <div className='Examiner'>
        <div>
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
          <Frame transition={transition} />
          <div className='font-preloader' />
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Examiner;
